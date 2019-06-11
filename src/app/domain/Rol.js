"use strict";
exports.__esModule = true;
var TipoCuota_1 = require("./TipoCuota");
var rxjs_1 = require("rxjs");
var ResumenCuotas_1 = require("./ResumenCuotas");
var leading_zero_pipe_1 = require("../pipes/leading-zero.pipe");
var Rol = /** @class */ (function () {
    function Rol(init) {
        this.isComplete = false;
        this.completeSubject = new rxjs_1.Subject();
        this.completeStream = this.completeSubject.asObservable();
        this.changeSubject = new rxjs_1.Subject();
        this.changeStream = this.changeSubject.asObservable();
        this.isProcess = false;
        this.expired = false;
        this.pagoTotal = true;
        Object.assign(this, init);
        if (!this.cuotas) {
            this.cuotas = [];
        }
        this.calcularSufijoDireccion();
        this.calcularRol();
    }
    Rol.prototype.calcularRol = function () {
        if (this.rol === undefined) {
            var rolIdConst = new leading_zero_pipe_1.LeadingZeroPipe().transform(this.rolId, 5);
            var subRolIdConst = new leading_zero_pipe_1.LeadingZeroPipe().transform(this.subrolId, 3);
            var rol = this.rolComunaSiiCod + '' + rolIdConst + '' + subRolIdConst;
            this.rol = +rol;
        }
    };
    Rol.prototype.calcularSufijoDireccion = function () {
        if (this.direccion) {
            var regexp = this.direccion.match(/\D*[0-9]+(.*)/i);
            if (regexp) {
                this.sufijoDireccion = regexp.length > 1 ? regexp[1].trim() : '';
            }
            else {
                this.sufijoDireccion = '';
            }
        }
        else {
            console.log(this);
        }
    };
    Rol.prototype.complete = function () {
        var _this = this;
        this.isComplete = true;
        this.calcularTotal();
        this.completeSubject.complete();
        for (var _i = 0, _a = this.cuotas; _i < _a.length; _i++) {
            var cuota = _a[_i];
            cuota.changeStream.subscribe(function () {
                _this.calcularTotal();
                _this.changeSubject.next();
            });
        }
    };
    Rol.prototype.resumen = function () {
        var result = new ResumenCuotas_1.ResumenCuotas();
        for (var _i = 0, _a = this.cuotas; _i < _a.length; _i++) {
            var cuota = _a[_i];
            result.total++;
            if (cuota.intencionPago) {
                result.seleccionadas++;
            }
            if (cuota.expired) {
                result.vencidas++;
                if (cuota.intencionPago) {
                    result.vencidasSeleccionadas++;
                }
            }
        }
        return result;
    };
    Rol.prototype.icon = function () {
        switch (this.idDestPropiedad) {
            case 'A': // AGRICOLA
            case 'B': // AGRICOLA POR ASIMILACION
                return 'spa';
            case 'E': // EDUCACION Y CULTURA
                return 'school';
            case 'F': // FORESTAL
                return 'terrain';
            case 'G': // HOTEL, MOTEL
                return 'hotel';
            case 'I': // INDUSTRIA
            case 'M': // MINERIA
                return 'local_shipping';
            case 'H': // HABITACIONAL
                return 'business';
            case 'O': // OFICINA
                return 'work';
            case 'L': // BODEGA
                return 'meeting_room';
            case 'Q': // CULTO
                return '';
            case 'S': // SALUD
                return 'local_hospital';
            case 'Z': // ESTACIONAMIENTO
                return 'directions_car';
            default:
                return 'layers';
        }
    };
    Rol.prototype.all = function (checked) {
        for (var _i = 0, _a = this.cuotas; _i < _a.length; _i++) {
            var cuota = _a[_i];
            if (cuota.intencionPago !== checked) {
                return false;
            }
        }
        return true;
    };
    // Revisa si todas las cuotas de un ano estan seleccionadas
    Rol.prototype.allChecked = function () {
        return this.all(true);
    };
    // Revisa si todas las cuotas de un ano estan des seleccionadas
    Rol.prototype.noneChecked = function () {
        return this.all(false);
    };
    Rol.prototype.seleccionar = function (tipo) {
        for (var _i = 0, _a = this.cuotas; _i < _a.length; _i++) {
            var cuota = _a[_i];
            if (tipo === TipoCuota_1.TipoCuota.TODAS) {
                cuota.intencionPago = true;
            }
            else if (tipo === TipoCuota_1.TipoCuota.NINGUNA) {
                cuota.intencionPago = false;
            }
            else if (tipo === TipoCuota_1.TipoCuota.VENCIDAS) {
                cuota.intencionPago = cuota.expired;
            }
            else if (tipo === TipoCuota_1.TipoCuota.NO_VENCIDAS) {
                cuota.intencionPago = !cuota.expired;
            }
        }
        this.calcularTotal();
        this.changeSubject.next();
    };
    Rol.prototype.cuotasSeleccionadas = function () {
        var cuotas = [];
        for (var _i = 0, _a = this.cuotas; _i < _a.length; _i++) {
            var cuota = _a[_i];
            if (cuota.intencionPago) {
                cuotas.push(cuota);
                /*
                console.log('cuota.numeroCuota', cuota.numeroCuota);
                console.log('this.condonacion', this.condonacion);
                console.log('cuota.liqTotal.saldoTotal', cuota.liqTotal.saldoTotal);
                console.log('cuota.liqParcial', cuota.liqParcial);
                console.log('cuota.liqParcial.saldoTotal', cuota.liqParcial.saldoTotal);*/
            }
        }
        return cuotas;
    };
    Rol.prototype.calcularTotal = function () {
        var pagoParcial = 0;
        var pagoTotal = 0;
        var condonacion = 0;
        var totalExpirados = 0;
        var totalExpiradosIntencionPago = 0;
        var total = true;
        this.expired = false;
        for (var _i = 0, _a = this.cuotas; _i < _a.length; _i++) {
            var cuota = _a[_i];
            if (cuota.expired) {
                this.expired = true;
            }
            if (cuota.intencionPago) {
                pagoTotal += cuota.liqTotal.saldoTotal;
            }
            //Valida que la el campo monto condonación exista en liqTotal
            if (cuota.liqTotal.montoCondonacion !== undefined) {
                condonacion += cuota.liqTotal.montoCondonacion;
            }
            if (cuota.expired) {
                totalExpirados++;
            }
            if (cuota.expired && cuota.intencionPago) {
                totalExpiradosIntencionPago++;
            }
            if (cuota.intencionPago && cuota.liqParcial) {
                pagoParcial += cuota.liqParcial.saldoTotal;
            }
            else {
                total = false;
            }
        }
        total = total || (totalExpirados === totalExpiradosIntencionPago);
        if (total) {
            this.total = pagoTotal;
            this.condonacion = condonacion;
        }
        else {
            this.total = pagoParcial;
            this.condonacion = 0;
        }
        this.pagoTotal = total;
    };
    Rol.prototype.getCuotasDeseleccionadas = function () {
        var cuotasRequest = [];
        for (var _i = 0, _a = this.cuotas; _i < _a.length; _i++) {
            var cuota = _a[_i];
            cuotasRequest.push({
                numeroFolio: cuota.folio,
                fechaVencimiento: cuota.fechaVencimientoOriginal,
                intencionPago: false
            });
        }
        return cuotasRequest;
    };
    return Rol;
}());
exports.Rol = Rol;
