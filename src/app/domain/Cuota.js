"use strict";
exports.__esModule = true;
var CuotaDetalle_1 = require("./CuotaDetalle");
var rxjs_1 = require("rxjs");
var Cuota = /** @class */ (function () {
    function Cuota(init) {
        this.intencionPago = true;
        this.changeSubject = new rxjs_1.Subject();
        this.changeStream = this.changeSubject.asObservable();
        this.clasificacion = init.clasificacion;
        this.fechaVencimiento = this.formatDate(init.fechaVencimiento);
        this.fechaVencimientoOriginal = init.fechaVencimiento;
        this.folio = init.folio;
        this.numeroCuota = init.numeroCuota;
        this.tipoDeuda = init.tipoDeuda;
        this.expired = this.isExpired();
        this.liqTotal = new CuotaDetalle_1.CuotaDetalle(init);
    }
    Cuota.prototype.changeIntencionPago = function (value) {
        if (value === void 0) { value = !this.intencionPago; }
        this.intencionPago = value;
        this.changeSubject.next();
    };
    Cuota.prototype.formatDate = function (fecha) {
        var fec = fecha.split('-');
        return new Date(fec[2], fec[1] - 1, fec[0], 0, 0, 0);
    };
    Cuota.prototype.isExpired = function () {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return (date.getTime() - this.fechaVencimiento.getTime() > 0);
    };
    Cuota.prototype.getYear = function () {
        this.fechaVencimiento.getFullYear();
    };
    return Cuota;
}());
exports.Cuota = Cuota;
