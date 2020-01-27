"use strict";
exports.__esModule = true;
var ResumenCuotas_1 = require("./ResumenCuotas");
var rxjs_1 = require("rxjs");
var internal_compatibility_1 = require("rxjs/internal-compatibility");
// JMS: tratar de ocupar el calcular total de seleccion cuotas
var Propiedad = /** @class */ (function () {
    function Propiedad() {
        this.isComplete = false;
        this.changeSubject = new rxjs_1.Subject();
        this.changeStream = this.changeSubject.asObservable();
        this.expired = false;
        this.roles = [];
        this.idDireccion = '';
    }
    Propiedad.prototype.countRol = function () {
        if (this.roles !== undefined) {
            return this.roles.length;
        }
    };
    Propiedad.prototype.addRol = function (rol) {
        var _this = this;
        this.roles.push(rol);
        rol.completeStream.subscribe(function () { return null; }, function (err) { return console.log(err); }, function () {
            for (var _i = 0, _a = _this.roles; _i < _a.length; _i++) {
                var r = _a[_i];
                if (!r.isComplete) {
                    return;
                }
            }
            _this.isComplete = true;
            _this.calcularTotal();
            for (var _b = 0, _c = _this.roles; _b < _c.length; _b++) {
                var r = _c[_b];
                r.changeStream.subscribe(function () {
                    _this.calcularTotal();
                    _this.changeSubject.next();
                });
            }
        });
    };
    Propiedad.prototype.calcularTotal = function () {
        var total = 0;
        var condonacion = 0;
        this.expired = false;
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var r = _a[_i];
            total += r.total;
            condonacion += r.condonacion;
            if (r.expired) {
                this.expired = true;
            }
        }
        this.total = total;
        this.condonacion = condonacion;
    };
    Propiedad.prototype.resumen = function () {
        var result = new ResumenCuotas_1.ResumenCuotas();
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var rol = _a[_i];
            var resumenRol = rol.resumen();
            result.total += resumenRol.total;
            result.seleccionadas += resumenRol.seleccionadas;
            result.vencidas += resumenRol.vencidas;
            result.vencidasSeleccionadas += resumenRol.vencidasSeleccionadas;
            if (resumenRol.vencidas > 0) {
                result.vencidasRoles += 1;
                if (resumenRol.vencidasSeleccionadas > 0) {
                    result.vencidasSeleccionadasRoles += 1;
                }
            }
        }
        return result;
    };
    Propiedad.prototype.existRol = function (rol) {
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.rol === rol) {
                return true;
            }
        }
        return false;
    };
    Propiedad.prototype.seleccionar = function (tipo) {
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var rol = _a[_i];
            rol.seleccionar(tipo);
        }
    };
    Propiedad.prototype.splitName = function () {
        var slimName = '';
        var isNumber = false;
        for (var i = 0; i < this.direccion.length; i++) {
            var character = this.direccion.charAt(i);
            if (!internal_compatibility_1.isNumeric(character) || i < 5) {
                if (isNumber) {
                    return slimName;
                }
                slimName += character;
            }
            else {
                isNumber = true;
                slimName += character;
            }
        }
        return slimName;
    };
    return Propiedad;
}());
exports.Propiedad = Propiedad;
