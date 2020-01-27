"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Cuota_1 = require("../domain/Cuota");
var environment_1 = require("../../environments/environment");
var CuotaDetalle_1 = require("../domain/CuotaDetalle");
var ContribucionesService = /** @class */ (function () {
    function ContribucionesService(requestService, util, http, userdataservice) {
        this.requestService = requestService;
        this.util = util;
        this.http = http;
        this.userdataservice = userdataservice;
    }
    ContribucionesService.prototype.clearPropiedades = function () {
        this.propiedades = [];
    };
    ContribucionesService.prototype.getCountPropiedad = function () {
        var cantidad = 0;
        if (this.propiedades === undefined || this.propiedades == null) {
            return 0;
        }
        for (var _i = 0, _a = this.propiedades; _i < _a.length; _i++) {
            var prop = _a[_i];
            cantidad = cantidad + prop.countRol();
        }
        return cantidad;
    };
    ContribucionesService.prototype.addPropiedad = function (response) {
        if (this.propiedades === undefined || this.propiedades == null) {
            this.propiedades = [];
        }
        var estado = false;
        for (var _i = 0, _a = this.propiedades; _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop.idDireccion === response.idDireccion) {
                estado = true;
                for (var _b = 0, _c = response.roles; _b < _c.length; _b++) {
                    var rol = _c[_b];
                    if (!prop.existRol(rol.rol)) {
                        prop.addRol(rol);
                    }
                }
            }
        }
        if (!estado) {
            this.propiedades.push(response);
        }
    };
    ContribucionesService.prototype.updateBienesRaices = function (rut) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getBienRaiz(rut).then(function (data) {
                _this.propiedades = _this.util.procesarPropiedades(data.curout);
                resolve(_this.propiedades);
            })["catch"](function (err) {
                console.error(err);
                reject(err);
            });
        });
    };
    ContribucionesService.prototype.getBienesRaices = function (rut) {
        var _this = this;
        if (this.propiedades) {
            return new Promise(function (resolve) {
                resolve(_this.propiedades);
            });
        }
        else {
            return this.updateBienesRaices(rut);
        }
    };
    ContribucionesService.prototype.getBienesRaicesByEmail = function (email) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.propiedades) {
                resolve(_this.propiedades);
            }
            else {
                _this.rolesRecuperar(email).then(function (propiedades) {
                    _this.propiedades = propiedades;
                    resolve(_this.propiedades);
                });
            }
        });
    };
    ContribucionesService.prototype.getBienesRaicesSinlogin = function () {
        var _this = this;
        if (this.propiedades === undefined) {
            this.clearPropiedades();
        }
        return new Promise(function (resolve) {
            resolve(_this.propiedades);
        });
    };
    // JMS: copia de cargar roles
    ContribucionesService.prototype.cargaRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, propiedad, _b, _c, rol;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _i = 0, _a = this.propiedades;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        propiedad = _a[_i];
                        _b = 0, _c = propiedad.roles;
                        _d.label = 2;
                    case 2:
                        if (!(_b < _c.length)) return [3 /*break*/, 6];
                        rol = _c[_b];
                        if (!!rol.isProcess) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cargaRol(rol)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        rol.complete();
                        _d.label = 5;
                    case 5:
                        _b++;
                        return [3 /*break*/, 2];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // JMS: Copia de servicio que obtiene la cuota uno a uno
    ContribucionesService.prototype.cargaRol = function (rol) {
        var _this = this;
        if (rol.cuotas.length > 0) {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
        else {
            return new Promise(function (resolve, reject) { return _this.obtieneDeuda(rol.rol, []).then(function (data) {
                rol.noLiquidable = data.outNoLiq;
                var mapCuotas = new Map();
                for (var _i = 0, _a = data.listaDeudas; _i < _a.length; _i++) {
                    var deuda = _a[_i];
                    var cuota = new Cuota_1.Cuota(deuda);
                    mapCuotas.set(cuota.numeroCuota, cuota);
                    rol.cuotas.push(cuota);
                    cuota = mapCuotas.get(deuda.numeroCuota);
                    cuota.liqTotal = new CuotaDetalle_1.CuotaDetalle(deuda);
                }
                rol.isProcess = true;
                resolve();
            }, function (err) { return reject(err); }); });
        }
    };
    ContribucionesService.prototype.getBienRaiz = function (rut) {
        var obtenerBienRaizAsociado = Object.assign({}, environment_1.environment.servicios.obtenerBienRaizAsociado);
        obtenerBienRaizAsociado.url = obtenerBienRaizAsociado.url + '/' + rut;
        return this.requestService.request(obtenerBienRaizAsociado);
    };
    // JMS: copia de captura de rol nuevo servico
    ContribucionesService.prototype.obtieneDeuda = function (rol, cuotas) {
        var body = {
            'idRol': rol,
            'listaDeudas': Array.from(cuotas.values())
        };
        var url = Object.assign({}, environment_1.environment.servicios.urlApiObtieneDeuda);
        url.url = url.url + '/' + body.idRol;
        return this.requestService.request2(url, body);
    };
    // JMS: servicio para acceder a lambda de multi AR
    ContribucionesService.prototype.postMultiaR = function (multiAR) {
        var url = environment_1.environment.servicios.urlMultiAR;
        console.log("url", url);
        return this.http.post(url, multiAR);
    };
    ContribucionesService.prototype.eliminarPropiedad = function (rut, correo, idDireccion) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var index = _this.propiedades.findIndex(function (p) { return p.idDireccion === idDireccion; });
            var propiedad = _this.propiedades[index];
            _this.propiedades.splice(index, 1);
            var promises = [];
            for (var _i = 0, _a = propiedad.roles; _i < _a.length; _i++) {
                var rol = _a[_i];
                promises.push(_this.desasociarRol(rut, correo, rol));
            }
            Promise.all(promises).then(function (value) {
                propiedad.changeSubject.next();
                propiedad.changeSubject.complete();
                resolve(value);
            }, function (err) { return reject(err); });
        });
    };
    ContribucionesService.prototype.eliminarPropiedadSinlogin = function (idDireccion) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var index = _this.propiedades.findIndex(function (p) { return p.idDireccion === idDireccion; });
            var propiedad = _this.propiedades[index];
            _this.propiedades.splice(index, 1);
            if (propiedad !== undefined) {
                propiedad.changeSubject.next();
                propiedad.changeSubject.complete();
            }
            resolve();
        });
    };
    ContribucionesService.prototype.eliminarRol = function (rut, email, rolComunaSiiCod, rolId, subrolId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rol;
            for (var _i = 0, _a = _this.propiedades; _i < _a.length; _i++) {
                var propiedad = _a[_i];
                var index = propiedad.roles.findIndex(function (r) { return r.rolComunaSiiCod === rolComunaSiiCod &&
                    r.rolId === rolId && r.subrolId === subrolId; });
                if (index >= 0) {
                    rol = propiedad.roles[index];
                    propiedad.roles.splice(index, 1);
                    if (propiedad.roles.length === 0) {
                        _this.desasociarRol(rut, email, rol).then(function (value) { return resolve(value); }, function (err) { return reject(err); });
                        return _this.eliminarPropiedad(rut, email, propiedad.idDireccion);
                    }
                    else {
                        rol.changeSubject.next();
                        rol.changeSubject.complete();
                    }
                }
            }
            if (!rol) {
                reject('No se encontró el rol (' + rolComunaSiiCod + ', ' + rolId + ', ' + subrolId);
            }
        });
    };
    ContribucionesService.prototype.eliminarRolSinLogin = function (rolComunaSiiCod, rolId, subrolId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rol;
            for (var _i = 0, _a = _this.propiedades; _i < _a.length; _i++) {
                var propiedad = _a[_i];
                var index = propiedad.roles.findIndex(function (r) { return r.rolComunaSiiCod === rolComunaSiiCod &&
                    r.rolId === rolId && r.subrolId === subrolId; });
                if (index >= 0) {
                    rol = propiedad.roles[index];
                    propiedad.roles.splice(index, 1);
                    if (propiedad.roles.length === 0) {
                        return _this.eliminarPropiedadSinlogin(propiedad.idDireccion);
                    }
                    else {
                        rol.changeSubject.next();
                        rol.changeSubject.complete();
                    }
                }
            }
            resolve();
            if (!rol) {
                reject('No se encontró el rol (' + rolComunaSiiCod + ', ' + rolId + ', ' + subrolId);
            }
        });
    };
    ContribucionesService.prototype.desasociarRol = function (rut, correo, rol) {
        if (rut) {
            var body = {
                'rutin': String(rut),
                'rolin': rol.rol.toString()
            };
            return this.requestService.request(environment_1.environment.servicios.desasociarBienRaiz, body);
        }
        else if (correo) {
            return this.desasociar(correo, rol.rol.toString());
        }
    };
    ContribucionesService.prototype.enviarMailCodigoVerificacion = function (correo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                correo: correo
            };
            _this.requestService.lambda(environment_1.environment.lambda.enviarMailCodigoVerificacion, body).then(function (response) { return resolve(new ResponseResultado(response)); }, function (err) { return reject(err); });
        });
    };
    ContribucionesService.prototype.validarCodigo = function (correo, codigo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                correo: correo,
                codigo: codigo
            };
            _this.requestService.lambda(environment_1.environment.lambda.validarCodigo, body).then(function (response) { return resolve(new ResponseResultado(response)); }, function (err) { return reject(err); });
        });
    };
    ContribucionesService.prototype.rolesRecuperar = function (correo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rec = Object.assign({}, environment_1.environment.lambda.recuperar);
            rec.path = rec.path.replace('{idUsuario}', correo);
            _this.requestService.lambda(rec, {}).then(function (response) {
                resolve(_this.util.procesarPropiedades(response.curout));
            }, function (err) { return reject(err); });
        });
    };
    ContribucionesService.prototype.desasociar = function (correo, rol) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {};
            var rec = Object.assign({}, environment_1.environment.lambda.desasociar);
            rec.path = rec.path.replace('{idUsuario}', correo);
            rec.path = rec.path.replace('{rol}', rol);
            _this.requestService.lambda(rec, body).then(function (response) { return resolve(new ResponseResultado(response)); }, function (err) { return reject(err); });
        });
    };
    ContribucionesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContribucionesService);
    return ContribucionesService;
}());
exports.ContribucionesService = ContribucionesService;
var ResponseResultado = /** @class */ (function () {
    function ResponseResultado(init) {
        Object.assign(this, init);
    }
    ResponseResultado.prototype.ok = function () {
        return this.resultado === '1';
    };
    return ResponseResultado;
}());
exports.ResponseResultado = ResponseResultado;
