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
var Rol_1 = require("../domain/Rol");
var UtilService = /** @class */ (function () {
    function UtilService() {
    }
    UtilService.prototype.procesarPropiedades = function (bienesRaices) {
        var roles = [];
        var propiedadMap = new Map();
        for (var _i = 0, bienesRaices_1 = bienesRaices; _i < bienesRaices_1.length; _i++) {
            var bienRaiz = bienesRaices_1[_i];
            var idPropiedad = this.getBienRaizId(bienRaiz);
            var propiedad = propiedadMap.get(idPropiedad);
            if (!propiedad) {
                propiedad = new Propiedad_1.Propiedad();
                propiedad.direccion = bienRaiz.direccion;
                propiedad.idDireccion = idPropiedad;
                propiedadMap.set(idPropiedad, propiedad);
            }
            var rol = new Rol_1.Rol(bienRaiz);
            propiedad.addRol(rol);
            roles.push(rol);
        }
        return Array.from(propiedadMap.values());
    };
    UtilService.prototype.getBienRaizId = function (bienRaiz) {
        return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
    };
    UtilService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
