"use strict";
exports.__esModule = true;
var leading_zero_pipe_1 = require("./pipes/leading-zero.pipe");
var PitUtils = /** @class */ (function () {
    function PitUtils() {
    }
    PitUtils.validarRutDv = function (rut, dv) {
        return PitUtils.dv(+rut) === dv;
    };
    PitUtils.dv = function (rut) {
        var M = 0, S = 1;
        for (; rut; rut = Math.floor(rut / 10)) {
            S = (S + rut % 10 * (9 - M++ % 6)) % 11;
        }
        return S ? String(S - 1) : 'k';
    };
    PitUtils.parseRutDv = function (texto) {
        var rut = texto;
        var dv;
        if (rut.indexOf('-') > 0) {
            var values = rut.split('-');
            rut = values[0];
            dv = values[1];
        }
        else {
            dv = rut.charAt(rut.length - 1);
            rut = rut.substring(0, rut.length - 1);
        }
        return {
            rut: rut.replace(/\./g, ''),
            dv: dv
        };
    };
    PitUtils.separaRol = function (valor) {
        var result = { comuna: undefined, rol: undefined, subrol: undefined };
        result.subrol = ('000' + (valor % 1000)).substr(-3);
        valor = Math.floor(valor / 1000);
        result.rol = ('00000' + (valor % 100000)).substr(-5);
        valor = Math.floor(valor / 100000);
        result.comuna = ('000' + (valor)).substr(-3);
        return result;
    };
    PitUtils.calcularRol = function (rolId, subrolId, rolComuna) {
        var rolIdConst = new leading_zero_pipe_1.LeadingZeroPipe().transform(rolId, 5);
        var subRolIdConst = new leading_zero_pipe_1.LeadingZeroPipe().transform(subrolId, 3);
        var rol = rolComuna + '' + rolIdConst + '' + subRolIdConst;
        return +rol;
    };
    return PitUtils;
}());
exports.PitUtils = PitUtils;
