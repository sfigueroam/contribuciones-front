"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var TipoCuota_1 = require("../../../../domain/TipoCuota");
var ResumenCuotas_1 = require("../../../../domain/ResumenCuotas");
var environment_1 = require("../../../../../environments/environment");
var ayuda_condonacion_component_1 = require("./modal/ayuda-condonacion/ayuda-condonacion.component");
var modal_cuota_anual_component_1 = require("./modal/modal-cuota-anual/modal-cuota-anual.component");
var resumen_component_1 = require("./modal/resumen/resumen.component");
var CheckboxIcon_1 = require("../../../../domain/CheckboxIcon");
var direccion_cuotas_component_1 = require("./direccion-cuotas/direccion-cuotas.component");
var ng2_tooltip_directive_1 = require("ng2-tooltip-directive");
var SeleccionCuotasComponent = /** @class */ (function () {
    function SeleccionCuotasComponent(router, route, user, contribuciones, sugeridas, mdlSnackbarService, deviceDetectService, dialogService, cookieService, userdataservice) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.user = user;
        this.contribuciones = contribuciones;
        this.sugeridas = sugeridas;
        this.mdlSnackbarService = mdlSnackbarService;
        this.deviceDetectService = deviceDetectService;
        this.dialogService = dialogService;
        this.cookieService = cookieService;
        this.userdataservice = userdataservice;
        this.propiedades = [];
        this.cuota = [];
        this.tipo = TipoCuota_1.TipoCuota;
        this.seleccionada = this.tipo.TODAS;
        this.selectTipo = this.tipo.TODAS;
        this.rolesSugeridos = 0;
        this.ocultarAlertaSugeridas = false;
        this.existeVencidas = false;
        this.existeSoloVencidas = false;
        this.showVencidasPorRoles = false;
        this.obteniendoDatos = false;
        // JMS: Modal ayuda info de cuota anual
        this.modalCuotaAnualVar = false;
        this.route.queryParams.subscribe(function (val) {
            if (val.refresh !== undefined && val.refresh === 'true' && _this.complete !== undefined) {
                if (_this.user.email !== undefined) {
                    _this.ngOnInit();
                }
            }
        });
    }
    SeleccionCuotasComponent.prototype.ngAfterViewInit = function () {
    };
    SeleccionCuotasComponent.prototype.openHelp = function () {
        var _this = this;
        if (this.user.isFirst && environment_1.environment.viewTooltip) {
            setTimeout(function () {
                if (_this.propiedades.length > 0) {
                    _this.showHelp();
                }
            }, 300);
        }
    };
    SeleccionCuotasComponent.prototype.ngOnInit = function () {
        // JMS: abre modal de cuota anual
        var _this = this;
        this.canal = '';
        this.reg = '';
        this.providerConex = this.cookieService.get("providerCookie");
        if (this.providerConex == "") {
            console.log(this.reg);
            this.reg = 'SC';
        }
        if (this.providerConex == "ClaveTesoreria") {
            console.log(this.reg);
            this.reg = 'CT';
        }
        if (this.providerConex == "ClaveUnica") {
            console.log(this.reg);
            this.reg = 'CU';
        }
        if (this.deviceDetectService.device.mobile) {
            console.log("mobile");
            this.canal = '30M' + this.reg;
        }
        if (this.deviceDetectService.device.tablet) {
            console.log("tablet");
            this.canal = '30T' + this.reg;
        }
        if (this.deviceDetectService.device.smartTv) {
            console.log("smarttv");
            this.canal = '30S' + this.reg;
        }
        if (this.deviceDetectService.device.desktop) {
            console.log("desktop");
            this.canal = '30D' + this.reg;
        }
        console.log(this.canal);
        console.log(this.providerConex);
        this.userdataservice.canal = this.canal;
        console.log('ngOnInit', this.complete);
        this.complete = false;
        this.seleccionada = TipoCuota_1.TipoCuota.TODAS;
        this.urlPagoTgr = environment_1.environment.pago.url;
        if (this.user.email) {
            this.obteniendoDatos = true;
        }
        this.user.getRolesNoAsociados().then(function (props) {
            _this.rolesSugeridos = 0;
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var p = props_1[_i];
                _this.rolesSugeridos += p.roles.length;
            }
        }, function (err) {
            console.log(err);
            _this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles sugeridos', environment_1.environment.snackbarTime);
        });
        this.user.getBienesRaices().then(function (propiedades) {
            _this.propiedades = propiedades;
            console.log("propiedades", propiedades);
            _this.openHelp();
            _this.contribuciones.cargaRoles().then(function () {
                // console.log(propiedades);
                _this.complete = true;
                _this.abrirPrimerRol();
                _this.calcularTotal();
                _this.obteniendoDatos = false;
                for (var _i = 0, _a = _this.propiedades; _i < _a.length; _i++) {
                    var p = _a[_i];
                    p.changeStream.subscribe(function () {
                        _this.calcularTotal();
                    });
                }
            }, function (err) {
                _this.obteniendoDatos = false;
                console.log(err);
                _this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles', environment_1.environment.snackbarTime);
            });
        }, function (err) {
            console.log(err);
            _this.obteniendoDatos = false;
            _this.mdlSnackbarService.showToast('Ocurrió un error al cargar las propiedades', environment_1.environment.snackbarTime);
        });
    };
    // JMS: se llama desde rol-cuotas
    SeleccionCuotasComponent.prototype.calcularTotal = function () {
        var multiARObj = { listaCid: [{ idMoneda: 0, codigoBarra: '', montoTotal: 0 }], usuario: '', montoTotalPagar: '' };
        var multiARString;
        var total = 0;
        var totalCuoton = 0;
        var condonacion = 0;
        var esCuotonBool = false;
        // JMS: cambio en posicion del calculo del total
        // for (const p of this.propiedades) {
        //   total += p.total;
        //   console.log("total en funcion", total);
        //   condonacion += p.condonacion;
        // }
        // this.total = total;
        // this.condonacion = condonacion;
        // this.recalcularTipo();
        // let codigos = 'on, ';
        for (var _i = 0, _a = this.propiedades; _i < _a.length; _i++) {
            var p = _a[_i];
            for (var _b = 0, _c = p.roles; _b < _c.length; _b++) {
                var r = _c[_b];
                for (var _d = 0, _e = r.cuotas; _d < _e.length; _d++) {
                    var c = _e[_d];
                    // if (c.cuoton4){
                    //   this.modalCuotaAnualVar = true;
                    // }
                    if (c.intencionPago) {
                        if (r.condonacion > 0) {
                            // codigos += c.liqTotal.codigoBarraTotal + ', ';
                            multiARObj.listaCid.push({ idMoneda: 0, codigoBarra: c.liqTotal.codigoBarraTotal, montoTotal: c.liqTotal.montoTotalTotal });
                            total += c.liqTotal.montoTotalTotal;
                            condonacion += c.liqTotal.condonaTotal;
                        }
                        else {
                            // codigos += c.liqTotal.codigoBarraParcial + ', ';
                            multiARObj.listaCid.push({ idMoneda: 0, codigoBarra: c.liqTotal.codigoBarraParcial, montoTotal: c.liqTotal.montoTotalParcial });
                            total += c.liqTotal.montoTotalParcial;
                            condonacion += c.liqTotal.condonaParcial;
                        }
                    }
                }
            }
        }
        // JMS: cambio en posicion del calculo del total
        // for (const p of this.propiedades) {
        //   total += p.total;
        //   console.log("total en funcion", total);
        //   condonacion += p.condonacion;
        // }
        this.total = total;
        this.condonacion = condonacion;
        this.recalcularTipo();
        multiARObj.listaCid.splice(0, 1);
        multiARObj.usuario = this.canal;
        multiARObj.montoTotalPagar = total.toString();
        multiARString = JSON.stringify(multiARObj);
        // console.log(multiARString);
        this.userdataservice.multiAR_Cid = multiARString;
        // if (this.modalCuotaAnualVar){
        //   this.abreModalCuotaAnual();
        // }
    };
    SeleccionCuotasComponent.prototype.gotoSugeridas = function () {
        this.router.navigate(['/main/contribuciones/agregar/sugeridas']);
    };
    SeleccionCuotasComponent.prototype.onChange = function () {
        this.recalcularTipo();
    };
    SeleccionCuotasComponent.prototype.seleccionar = function (tipo) {
        for (var _i = 0, _a = this.propiedades; _i < _a.length; _i++) {
            var propiedad = _a[_i];
            propiedad.seleccionar(tipo);
        }
        this.recalcularTipo();
    };
    SeleccionCuotasComponent.prototype.recalcularTipo = function () {
        var resultados = new ResumenCuotas_1.ResumenCuotas();
        for (var _i = 0, _a = this.propiedades; _i < _a.length; _i++) {
            var propiedad = _a[_i];
            var resumen = propiedad.resumen();
            resultados.total += resumen.total;
            resultados.seleccionadas += resumen.seleccionadas;
            resultados.vencidas += resumen.vencidas;
            resultados.vencidasSeleccionadas += resumen.vencidasSeleccionadas;
            resultados.vencidasRoles += resumen.vencidasRoles;
            resultados.vencidasSeleccionadasRoles += resumen.vencidasSeleccionadasRoles;
        }
        this.seleccionada = resultados.tipo();
        this.cantidadSeleccionadas = resultados.seleccionadas;
        this.existeVencidas = resultados.vencidas > 0;
        this.existeSoloVencidas = resultados.vencidas === resultados.total;
        this.showVencidasPorRoles = +resultados.vencidasRoles > +resultados.vencidasSeleccionadasRoles;
        this.result = resultados;
        this.updateIconSeleccion(resultados);
    };
    SeleccionCuotasComponent.prototype.dialogAyudaCondonacion = function () {
        var pDialog = this.dialogService.showCustomDialog({
            component: ayuda_condonacion_component_1.AyudaCondonacionComponent,
            clickOutsideToClose: true,
            isModal: true
        });
    };
    //Todo pendiente termianar
    SeleccionCuotasComponent.prototype.updateIconSeleccion = function (result) {
        if (result.tipo() === undefined) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.INDETERMINATE;
        }
        else if (result.tipo() === TipoCuota_1.TipoCuota.TODAS) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.SELECTED;
        }
        else {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.UNSELECTED;
        }
    };
    SeleccionCuotasComponent.prototype.openDialogResumen = function () {
        var pDialog = this.dialogService.showCustomDialog({
            component: resumen_component_1.ResumenComponent,
            clickOutsideToClose: true,
            providers: [
                { provide: resumen_component_1.LIST_PROPIEDADES, useValue: this.propiedades },
                { provide: resumen_component_1.MULTI_AR_CODIGOS, useValue: this.multiARString2 },
                { provide: resumen_component_1.CODIGO_LIST_PROPIEDADES, useValue: this.listaContribuciones },
                { provide: resumen_component_1.TOTAL_PROPIEDADES, useValue: this.total },
                { provide: resumen_component_1.CONDONACION_PROPIEDADES, useValue: this.condonacion },
                { provide: resumen_component_1.EXISTE_VENCIDAS, useValue: this.existeVencidas }
            ],
            classes: 'dialogo-resumen-deudas',
            isModal: true
        });
    };
    SeleccionCuotasComponent.prototype.seleccionarTodas = function () {
        if (this.selectedIcon === CheckboxIcon_1.CheckboxIcon.INDETERMINATE || this.selectedIcon === CheckboxIcon_1.CheckboxIcon.UNSELECTED) {
            this.seleccionar(TipoCuota_1.TipoCuota.TODAS);
        }
        else {
            this.seleccionar(TipoCuota_1.TipoCuota.NINGUNA);
        }
    };
    SeleccionCuotasComponent.prototype.seleccionarTodasVencidas = function () {
        if (this.selectedIcon === CheckboxIcon_1.CheckboxIcon.INDETERMINATE || this.selectedIcon === CheckboxIcon_1.CheckboxIcon.UNSELECTED) {
            this.seleccionar(TipoCuota_1.TipoCuota.TODAS);
        }
        else {
            this.seleccionar(TipoCuota_1.TipoCuota.NO_VENCIDAS);
        }
    };
    SeleccionCuotasComponent.prototype.abrirPrimerRol = function () {
        var direccionCuotasList = this.direccionCuotasComponentList.toArray();
        if (direccionCuotasList !== undefined && direccionCuotasList.length > 0) {
            direccionCuotasList[0].abrirPrimerRol();
            this.abreModalCuotaAnual();
        }
    };
    SeleccionCuotasComponent.prototype.abreModalCuotaAnual = function () {
        for (var _i = 0, _a = this.propiedades; _i < _a.length; _i++) {
            var propiedad = _a[_i];
            for (var _b = 0, _c = propiedad.roles; _b < _c.length; _b++) {
                var rol = _c[_b];
                for (var _d = 0, _e = rol.cuotas; _d < _e.length; _d++) {
                    var cuota = _e[_d];
                    if (cuota.cuoton4) {
                        this.modalCuotaAnualVar = true;
                        console.log("variable de modal", this.modalCuotaAnualVar);
                    }
                }
            }
        }
        if (this.modalCuotaAnualVar) {
            var pDialog = this.dialogService.showCustomDialog({
                component: modal_cuota_anual_component_1.ModalCuotaAnualComponent,
                clickOutsideToClose: true,
                isModal: true
            });
        }
    };
    SeleccionCuotasComponent.prototype.showHelp = function () {
        var _this = this;
        var direccionCuotasList = this.direccionCuotasComponentList.toArray();
        if (direccionCuotasList !== undefined && direccionCuotasList.length > 0) {
            console.log('direccionCuotasList[0].showHelp();');
            direccionCuotasList[0].showHelp();
        }
        this.someTooltip = this.tooltipDirective.find(function (elem) { return elem.id === 'helpTooltip-buttonAdd'; });
        this.someTooltip.show();
        this.user.isFirst = false;
        setTimeout(function () {
            _this.someTooltip.hide();
        }, environment_1.environment.tooltipTime);
    };
    __decorate([
        core_1.ViewChildren(direccion_cuotas_component_1.DireccionCuotasComponent)
    ], SeleccionCuotasComponent.prototype, "direccionCuotasComponentList");
    __decorate([
        core_1.ViewChildren(ng2_tooltip_directive_1.TooltipDirective)
    ], SeleccionCuotasComponent.prototype, "tooltipDirective");
    SeleccionCuotasComponent = __decorate([
        core_1.Component({
            selector: 'app-seleccion-cuotas',
            templateUrl: './seleccion-cuotas.component.html',
            styleUrls: ['./seleccion-cuotas.component.scss']
        })
    ], SeleccionCuotasComponent);
    return SeleccionCuotasComponent;
}());
exports.SeleccionCuotasComponent = SeleccionCuotasComponent;
