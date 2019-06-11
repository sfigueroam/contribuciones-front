"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Localidad_1 = require("../domain/Localidad");
var environment_1 = require("../../environments/environment");
var Propiedad_1 = require("../domain/Propiedad");
var Rol_1 = require("../domain/Rol");
var leading_zero_pipe_1 = require("../pipes/leading-zero.pipe");
var TipoPropiedad_1 = require("../domain/TipoPropiedad");
var Direccion_1 = require("../domain/Direccion");
var contribuciones_service_1 = require("./contribuciones.service");
var TipoRecaptcha_enum_1 = require("../enum/TipoRecaptcha.enum");
var ContribucionesBuscarRolService = /** @class */ (function () {
    function ContribucionesBuscarRolService(requestService) {
        this.requestService = requestService;
    }
    ContribucionesBuscarRolService.prototype.getTiposPropiedades = function () {
        var _this = this;
        if (this.tiposPropiedades !== undefined) {
            return new Promise(function (resolve, reject) {
                resolve(_this.tiposPropiedades);
            });
        }
        return new Promise(function (resolve, reject) {
            _this.requestService.requestElastic(environment_1.environment.elastic.tiposPropiedades).then(function (data) {
                _this.tiposPropiedades = [];
                for (var _i = 0, _a = data.hits.hits; _i < _a.length; _i++) {
                    var local = _a[_i];
                    var tipoPropiedad = new TipoPropiedad_1.TipoPropiedad(local._source);
                    _this.tiposPropiedades.push(tipoPropiedad);
                }
                _this.tiposPropiedades.sort((function (a, b) {
                    var ac = a.descripcion.toLowerCase();
                    var bc = b.descripcion.toLowerCase();
                    return ac > bc ? 1 : (ac < bc ? -1 : 0);
                }));
                resolve(_this.tiposPropiedades);
            }, function () {
                reject();
            });
        });
    };
    ContribucionesBuscarRolService.prototype.getComunas = function () {
        var _this = this;
        if (this.localidad !== undefined) {
            return new Promise(function (resolve, reject) {
                resolve(_this.localidad);
            });
        }
        return new Promise(function (resolve, reject) {
            _this.requestService.requestElastic(environment_1.environment.elastic.localidad).then(function (data) {
                _this.localidad = [];
                for (var _i = 0, _a = data.hits.hits; _i < _a.length; _i++) {
                    var local = _a[_i];
                    var localid = new Localidad_1.Localidad(local._source);
                    _this.localidad.push(localid);
                }
                _this.localidad.sort((function (a, b) {
                    var ac = a.comuna.toLowerCase();
                    var bc = b.comuna.toLowerCase();
                    return ac > bc ? 1 : (ac < bc ? -1 : 0);
                }));
                resolve(_this.localidad);
            }, function () {
                reject();
            });
        });
    };
    ContribucionesBuscarRolService.prototype.searchRolesForIds = function (idComuna, idRol, idSubRol, tokenCaptcha, tipo) {
        var _this = this;
        var leadingZeroPipe = new leading_zero_pipe_1.LeadingZeroPipe();
        return new Promise(function (resolve, reject) {
            var body = {
                'rol': leadingZeroPipe.transform(idRol.toString(), 5),
                'subrol': leadingZeroPipe.transform(idSubRol.toString(), 3),
                'idcomuna': idComuna.toString(),
                'token': tokenCaptcha
            };
            var buscarBienRaiz = Object.assign({}, environment_1.environment.servicios.buscarBienRaiz);
            if (tipo === TipoRecaptcha_enum_1.TipoRecaptcha.V3) {
                buscarBienRaiz.url = buscarBienRaiz.recaptcha.v3;
            }
            else {
                buscarBienRaiz.url = buscarBienRaiz.recaptcha.v2;
            }
            _this.requestService.request(buscarBienRaiz, body).then(function (data) {
                if (data.curout.length === 0) {
                    resolve(null);
                }
                else {
                    var bienRaiz = data.curout[0];
                    var propiedad = new Propiedad_1.Propiedad();
                    propiedad.direccion = bienRaiz.direccion;
                    propiedad.idDireccion = idComuna + '-' + idRol;
                    var rol = new Rol_1.Rol(bienRaiz);
                    rol.subrolId = idSubRol;
                    rol.rolId = idRol;
                    rol.rolComunaSiiCod = idComuna;
                    propiedad.addRol(rol);
                    resolve(propiedad);
                }
            }, function () {
                reject();
            });
        });
    };
    ContribucionesBuscarRolService.prototype.direccionToPropiedad = function (direcciones, page) {
        var propiedades;
        var leadingZeroPipe = new leading_zero_pipe_1.LeadingZeroPipe();
        var propiedadMap = new Map();
        if (direcciones) {
            var paginacion = environment_1.environment.paginacion;
            var end = 0;
            var start = ((paginacion * page) - paginacion);
            if (direcciones.length > (paginacion * page)) {
                end = ((paginacion * page) - 1);
            }
            else {
                end = (direcciones.length - 1);
            }
            //for (const dire of direcciones) {
            for (var i = start; i <= end; i++) {
                var dire = direcciones[i];
                var idPropiedad = dire.idComunaSii + '-' + dire.rol;
                var propiedad = propiedadMap.get(idPropiedad);
                if (!propiedad) {
                    propiedad = new Propiedad_1.Propiedad();
                    propiedad.direccion = dire.direccionOriginal;
                    propiedad.idDireccion = idPropiedad;
                    propiedadMap.set(idPropiedad, propiedad);
                }
                var rol = new Rol_1.Rol({
                    rolComunaSiiCod: dire.idComunaSii,
                    rolId: dire.rol,
                    subrolId: dire.subrol,
                    direccion: dire.direccionOriginal,
                    idComuna: dire.idComuna,
                    comuna: dire.descripcionComuna,
                    destPropiedad: dire.descripcionPropiedad,
                    idDestPropiedad: dire.idDestPropiedad
                });
                var rolFull = leadingZeroPipe.transform(rol.rolComunaSiiCod, 3) + '' +
                    leadingZeroPipe.transform(rol.rolId, 5) + '' +
                    leadingZeroPipe.transform(rol.subrolId, 3);
                rol.rol = +rolFull;
                propiedad.addRol(rol);
            }
            propiedades = Array.from(propiedadMap.values());
        }
        return propiedades;
    };
    ContribucionesBuscarRolService.prototype.searchDireccion = function (idComuna, tipoPropiedad, search, size, isValidaRecaptcha, tokenCaptcha, tipo) {
        var _this = this;
        var body = {
            search: search,
            tipoPropiedad: tipoPropiedad,
            token: undefined
        };
        var propiedades = {
            url: environment_1.environment.elastic.propiedades.url,
            method: environment_1.environment.elastic.propiedades.method,
            body: body
        };
        if (isValidaRecaptcha) {
            if (tipo === TipoRecaptcha_enum_1.TipoRecaptcha.V3) {
                propiedades.url = environment_1.environment.elastic.propiedades.recaptcha.v3;
            }
            else if (tipo === TipoRecaptcha_enum_1.TipoRecaptcha.V2) {
                propiedades.url = environment_1.environment.elastic.propiedades.recaptcha.v2;
            }
            body.token = tokenCaptcha;
        }
        var direcciones = [];
        return new Promise(function (resolve, reject) {
            _this.requestService.requestElastic(propiedades).then(function (data) {
                if (data.hits.hits.length === 0) {
                    resolve(null);
                }
                else {
                    for (var _i = 0, _a = data.hits.hits; _i < _a.length; _i++) {
                        var direc = _a[_i];
                        var direccion2 = new Direccion_1.Direccion(direc._source);
                        direcciones.push(direccion2);
                    }
                    resolve(direcciones);
                }
            }, function () {
                reject();
            });
        });
    };
    ContribucionesBuscarRolService.prototype.asociarRoles = function (rut, correo, roles) {
        var promesas = [];
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var rol = roles_1[_i];
            if (rut) {
                var body = {
                    'rutin': String(rut),
                    'rolin': String(rol)
                };
                promesas.push(this.requestService.request(environment_1.environment.servicios.asociarBienRaiz, body));
            }
            else if (correo) {
                promesas.push(this.asociar(correo, rol.toString()));
            }
        }
        return Promise.all(promesas);
    };
    ContribucionesBuscarRolService.prototype.asociar = function (correo, rol) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                rolin: rol
            };
            var rec = Object.assign({}, environment_1.environment.lambda.asociar);
            rec.path = rec.path.replace('{idUsuario}', correo);
            _this.requestService.lambda(rec, body).then(function (response) { return resolve(new contribuciones_service_1.ResponseResultado(response)); }, function (err) { return reject(err); });
        });
    };
    ContribucionesBuscarRolService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContribucionesBuscarRolService);
    return ContribucionesBuscarRolService;
}());
exports.ContribucionesBuscarRolService = ContribucionesBuscarRolService;
