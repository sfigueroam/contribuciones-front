"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../../../../environments/environment");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var modal_error_multicid_component_1 = require("../modal-error-multicid/modal-error-multicid.component");
exports.LIST_PROPIEDADES = new core_1.InjectionToken('lista_propiedades');
exports.MULTI_AR_CODIGOS = new core_1.InjectionToken('multiAR_Resumen');
exports.CODIGO_LIST_PROPIEDADES = new core_1.InjectionToken('codigo_lista_propiedades');
exports.TOTAL_PROPIEDADES = new core_1.InjectionToken('total_propiedades');
exports.CONDONACION_PROPIEDADES = new core_1.InjectionToken('condonacion_propiedades');
exports.EXISTE_VENCIDAS = new core_1.InjectionToken('existe_vencidas');
var ResumenComponent = /** @class */ (function () {
    function ResumenComponent(dialog, router, contribuciones, userdataservice, dialogService, propiedades, multiARString, codigos, total, condonacion, existeVencidas) {
        var _this = this;
        this.dialog = dialog;
        this.router = router;
        this.contribuciones = contribuciones;
        this.userdataservice = userdataservice;
        this.dialogService = dialogService;
        this.errorMultiAR = false;
        this.propiedades = propiedades;
        this.codigos = codigos;
        this.total = total;
        this.condonacion = condonacion;
        this.existeVencidas = existeVencidas;
        this.multiARString = multiARString;
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationStart; }), operators_1.tap(function () { return _this.dialog.hide(); })).subscribe();
    }
    ResumenComponent.prototype.ngOnInit = function () {
        this.canal = this.userdataservice.canal;
        this.urlPagoTgr = environment_1.environment.pago.url;
        this.multiARString = this.userdataservice.multiAR_Cid;
        console.log("multiARString", this.multiARString);
        this.obtieneCidUnico();
    };
    ResumenComponent.prototype.volver = function () {
        this.dialog.hide();
    };
    ResumenComponent.prototype.obtieneCidUnico = function () {
        var _this = this;
        this.contribuciones.postMultiaR(this.multiARString).subscribe(function (data) {
            // console.log("data", data);
            _this.cidUnico = 'on, ' + data.codigoBarra + ', ';
            // console.log("this.cidUnico resumen", this.cidUnico);
        }, function (error) {
            // console.log("error", error);
            _this.errorMultiAR = true;
            _this.modalErrorMulticid();
        });
    };
    ;
    ResumenComponent.prototype.modalErrorMulticid = function () {
        var pDialog = this.dialogService.showCustomDialog({
            component: modal_error_multicid_component_1.ModalErrorMulticidComponent,
            clickOutsideToClose: true,
            isModal: true
        });
    };
    ResumenComponent = __decorate([
        core_1.Component({
            selector: 'app-resumen',
            templateUrl: './resumen.component.html',
            styleUrls: ['./resumen.component.scss']
        }),
        __param(5, core_1.Inject(exports.LIST_PROPIEDADES)),
        __param(6, core_1.Inject(exports.MULTI_AR_CODIGOS)),
        __param(7, core_1.Inject(exports.CODIGO_LIST_PROPIEDADES)),
        __param(8, core_1.Inject(exports.TOTAL_PROPIEDADES)),
        __param(9, core_1.Inject(exports.CONDONACION_PROPIEDADES)),
        __param(10, core_1.Inject(exports.EXISTE_VENCIDAS))
    ], ResumenComponent);
    return ResumenComponent;
}());
exports.ResumenComponent = ResumenComponent;
