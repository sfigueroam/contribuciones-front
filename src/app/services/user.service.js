"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var pit_utils_1 = require("../pit-utils");
var environment_1 = require("../../environments/environment");
var UserService = /** @class */ (function () {
    function UserService(contributions, sugeridas, buscarRoles) {
        this.contributions = contributions;
        this.sugeridas = sugeridas;
        this.buscarRoles = buscarRoles;
        this.solicitarEmail = true;
        this.isFirst = true;
    }
    UserService.prototype.redirectMiCuenta = function () {
        window.location.href = environment_1.environment.cuentaUrl;
    };
    UserService.prototype.isLogged = function () {
        return this.rut !== undefined;
    };
    UserService.prototype.setRut = function (rut) {
        this.rut = +rut;
        this.dv = pit_utils_1.PitUtils.dv(this.rut);
        this.solicitarEmail = false;
    };
    UserService.prototype.getBienesRaices = function () {
        if (this.rut) {
            return this.contributions.getBienesRaices(this.rut);
        }
        else if (this.email) {
            return this.contributions.getBienesRaicesByEmail(this.email);
        }
        else {
            return this.contributions.getBienesRaicesSinlogin();
        }
    };
    UserService.prototype.eliminarPropiedad = function (idDireccion) {
        if (this.rut || this.email) {
            return this.contributions.eliminarPropiedad(this.rut, this.email, idDireccion);
        }
        else {
            return this.contributions.eliminarPropiedadSinlogin(idDireccion);
        }
    };
    UserService.prototype.eliminarRol = function (rolComunaSiiCod, rolId, subrolId) {
        if (this.rut || this.email) {
            return this.contributions.eliminarRol(this.rut, this.email, rolComunaSiiCod, rolId, subrolId);
        }
        else {
            return this.contributions.eliminarRolSinLogin(rolComunaSiiCod, rolId, subrolId);
        }
    };
    UserService.prototype.asociarRoles = function (roles) {
        return this.buscarRoles.asociarRoles(this.rut, this.email, roles);
    };
    UserService.prototype.getRolesNoAsociados = function () {
        return this.sugeridas.getRolesNoAsociados(this.rut);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
