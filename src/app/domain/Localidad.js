"use strict";
exports.__esModule = true;
var Localidad = /** @class */ (function () {
    function Localidad(init) {
        Object.assign(this, init);
        // @ts-ignore
        if (init.id_sii) {
            // @ts-ignore
            this.idSii = init.id_sii;
        }
    }
    return Localidad;
}());
exports.Localidad = Localidad;
