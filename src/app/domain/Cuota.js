"use strict";
exports.__esModule = true;
var CuotaDetalle_1 = require("./CuotaDetalle");
var rxjs_1 = require("rxjs");
var Cuota = /** @class */ (function () {
    function Cuota(init) {
        this.intencionPago = true;
        this.cuoton4 = false;
        this.cuoton3 = false;
        this.cuoton2 = false;
        this.cuoton1 = false;
        this.changeSubject = new rxjs_1.Subject();
        this.changeStream = this.changeSubject.asObservable();
        this.clasificacion = "S";
        this.fechaVencimientoOriginal = init.fechaVcto;
        this.year = this.fechaVencimientoOriginal.substring(0, 4);
        this.month = this.fechaVencimientoOriginal.substring(5, 7);
        this.day = this.fechaVencimientoOriginal.substring(8, 10);
        this.fechaVctoStr = this.day + "-" + this.month + "-" + this.year;
        this.fechaVcto = this.formatDate(this.fechaVctoStr);
        this.formFolio = init.formFolio;
        this.numeroCuota = init.numeroCuota;
        this.clienteTipo = init.clienteTipo;
        this.expired = this.isExpired();
        this.liqTotal = new CuotaDetalle_1.CuotaDetalle(init);
        this.esCuoton = init.esCuoton;
        this.nroCuotaTotal = init.nroCuota;
        this.nroCuota = this.nroCuotaTotal.substring(0, 1);
        if (this.esCuoton == 'S' && this.nroCuota == '4') {
            this.cuoton4 = true;
        }
        if (this.esCuoton == 'S' && this.nroCuota == '3') {
            this.cuoton3 = true;
        }
        if (this.esCuoton == 'S' && this.nroCuota == '2') {
            this.cuoton2 = true;
        }
        if (this.esCuoton == 'S' && this.nroCuota == '1') {
            this.cuoton1 = true;
        }
    }
    Cuota.prototype.changeIntencionPago = function (value) {
        if (value === void 0) { value = !this.intencionPago; }
        this.intencionPago = value;
        this.changeSubject.next();
    };
    Cuota.prototype.intencionPagoCuoton = function (value) {
        if (value === void 0) { value = !this.intencionPago; }
        if (this.esCuoton == 'S') {
            this.intencionPago = value;
            this.changeSubject.next();
        }
    };
    Cuota.prototype.formatDate = function (fecha) {
        var fec = fecha.split('-');
        return new Date(fec[2], fec[1] - 1, fec[0], 0, 0, 0);
    };
    Cuota.prototype.isExpired = function () {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return (date.getTime() - this.fechaVcto.getTime() > 0);
    };
    Cuota.prototype.getYear = function () {
        this.fechaVcto.getFullYear();
    };
    return Cuota;
}());
exports.Cuota = Cuota;
