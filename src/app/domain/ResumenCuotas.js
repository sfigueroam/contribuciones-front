"use strict";
exports.__esModule = true;
var TipoCuota_1 = require("./TipoCuota");
var ResumenCuotas = /** @class */ (function () {
    function ResumenCuotas() {
        this.total = 0;
        this.seleccionadas = 0;
        this.vencidas = 0;
        this.vencidasSeleccionadas = 0;
        this.vencidasRoles = 0;
        this.vencidasSeleccionadasRoles = 0;
    }
    ResumenCuotas.prototype.tipo = function () {
        if (this.total === this.seleccionadas) {
            return TipoCuota_1.TipoCuota.TODAS;
        }
        else if (this.seleccionadas === 0) {
            return TipoCuota_1.TipoCuota.NINGUNA;
        }
        else if (this.vencidas === this.vencidasSeleccionadas && this.vencidas === this.seleccionadas) {
            return TipoCuota_1.TipoCuota.VENCIDAS;
        }
        else if (this.vencidasSeleccionadasRoles === 0 && this.seleccionadas === (this.total - this.vencidas)) {
            return TipoCuota_1.TipoCuota.NO_VENCIDAS;
        }
        return undefined;
    };
    return ResumenCuotas;
}());
exports.ResumenCuotas = ResumenCuotas;
