"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Propiedad_1 = require("../domain/Propiedad");
var environment_1 = require("../../environments/environment");
var Rol_1 = require("../domain/Rol");
var ContribucionesSugeridasService = /** @class */ (function () {
    function ContribucionesSugeridasService(requestService) {
        this.requestService = requestService;
    }
    ContribucionesSugeridasService.prototype.getRolesNoAsociados = function (rut, force) {
        var _this = this;
        if (rut == null) {
            this.rolesNoAsociados = [];
        }
        if (this.rolesNoAsociados && !force) {
            return new Promise(function (resolve) {
                resolve(_this.rolesNoAsociados);
            });
        }
        return new Promise(function (resolve, reject) {
            var obtenerBienRaizNoAsociado = Object.assign({}, environment_1.environment.servicios.obtenerBienRaizNoAsociado);
            obtenerBienRaizNoAsociado.url = obtenerBienRaizNoAsociado.url + '/' + rut;
            _this.requestService.request(obtenerBienRaizNoAsociado).then(function (data) {
                var propiedadSugeridasMap = new Map();
                for (var _i = 0, _a = data.curout; _i < _a.length; _i++) {
                    var bienRaiz = _a[_i];
                    var idPropiedad = _this.getBienRaizId(bienRaiz);
                    var propiedad = propiedadSugeridasMap.get(idPropiedad);
                    if (!propiedad) {
                        propiedad = new Propiedad_1.Propiedad();
                        propiedad.direccion = bienRaiz.direccion;
                        propiedadSugeridasMap.set(idPropiedad, propiedad);
                    }
                    var rol = new Rol_1.Rol(bienRaiz);
                    propiedad.addRol(rol);
                }
                _this.rolesNoAsociados = Array.from(propiedadSugeridasMap.values());
                resolve(_this.rolesNoAsociados);
            }, function (err) { return reject(err); });
        });
    };
    ContribucionesSugeridasService.prototype.getBienRaizId = function (bienRaiz) {
        return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
    };
    ContribucionesSugeridasService.prototype.asociarRoles = function (rut, roles) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promesas = [];
            for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                var rol = roles_1[_i];
                var body = {
                    'rutin': String(rut),
                    'rolin': rol.toString()
                };
                promesas.push(_this.requestService.request(environment_1.environment.servicios.asociarBienRaiz, body));
            }
            Promise.all(promesas).then(function () {
                resolve();
            }, function () {
                reject();
            });
        });
    };
    ContribucionesSugeridasService.prototype.clearPropiedades = function () {
        this.rolesNoAsociados = undefined;
    };
    ContribucionesSugeridasService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContribucionesSugeridasService);
    return ContribucionesSugeridasService;
}());
exports.ContribucionesSugeridasService = ContribucionesSugeridasService;
