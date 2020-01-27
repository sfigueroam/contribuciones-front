"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var TipoCuota_1 = require("../../../../../domain/TipoCuota");
var CheckboxIcon_1 = require("../../../../../domain/CheckboxIcon");
var environment_1 = require("../../../../../../environments/environment");
var ng2_tooltip_directive_1 = require("ng2-tooltip-directive");
// import LIST_PROPIEDADES = new InjectionToken<number>('lista_propiedades');
var RolCuotasComponent = /** @class */ (function () {
    function RolCuotasComponent(user, dialogService, mdlSnackbarService, userdataservice, seleccioncuotas) {
        this.user = user;
        this.dialogService = dialogService;
        this.mdlSnackbarService = mdlSnackbarService;
        this.userdataservice = userdataservice;
        this.seleccioncuotas = seleccioncuotas;
        this.cuotas1 = [];
        this.propiedades = [];
        this.change = new core_1.EventEmitter();
        // JMS: es cuoton
        this.cuotaAnualCheck = true;
        // JMS: variable para activar el bloque azul de la cuota anual
        this.bloqueAzul = false;
        this.montoCuoton = 0;
        this.icons = CheckboxIcon_1.CheckboxIcon;
        this.noLiquidablebool = false;
        // this.propiedades = propiedades;
    }
    RolCuotasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.expanded = false;
        this.icon = this.rol.icon();
        this.selectedIcon = CheckboxIcon_1.CheckboxIcon.SELECTED;
        this.rol.completeStream.subscribe(function () { return null; }, function (err) { return console.log(err); }, function () {
            _this.rol.changeStream.subscribe(function () { return _this.reloadChecked(); });
            _this.noLiquidable = _this.rol.noLiquidable;
            if (_this.noLiquidable == "true") {
                _this.noLiquidablebool = true;
            }
            else {
                _this.noLiquidablebool = false;
            }
        });
    };
    RolCuotasComponent.prototype.showHelp = function () {
        var _this = this;
        this.someTooltip = this.tooltipDirective.find(function (elem) { return elem.id === 'helpTooltip' + _this.rol.rol; });
        this.someTooltip.show();
        setTimeout(function () {
            _this.someTooltip.hide();
        }, environment_1.environment.tooltipTime);
    };
    RolCuotasComponent.prototype.ngAfterViewInit = function () {
    };
    RolCuotasComponent.prototype.toggle = function () {
        //javier
        if (this.someTooltip !== undefined) {
            this.someTooltip.hide();
        }
        if (this.rol.isComplete) {
            this.expanded = !this.expanded;
        }
        else {
            this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment_1.environment.snackbarTime);
        }
    };
    RolCuotasComponent.prototype.reloadChecked = function () {
        if (this.rol.allChecked()) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.SELECTED;
            this.cuotaAnualCheck = true;
        }
        else if (this.rol.noneChecked()) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.UNSELECTED;
            this.cuotaAnualCheck = false;
        }
        else {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.INDETERMINATE;
        }
        this.change.emit();
        this.seleccioncuotas.recalcularTipo();
        console.log("calcula total");
        this.seleccioncuotas.calcularTotal();
    };
    RolCuotasComponent.prototype.selectAllNone = function () {
        if (this.selectedIcon === CheckboxIcon_1.CheckboxIcon.SELECTED) {
            this.rol.seleccionar(TipoCuota_1.TipoCuota.NINGUNA);
            this.cuotaAnualCheck = false;
        }
        else {
            this.rol.seleccionar(TipoCuota_1.TipoCuota.TODAS);
            this.cuotaAnualCheck = true;
        }
        this.seleccioncuotas.recalcularTipo();
        console.log("calcula total");
        this.seleccioncuotas.calcularTotal();
    };
    // JMS: calcula el total del cuoton
    RolCuotasComponent.prototype.calculaTotalCuoton = function (rol) {
        var totalCuoton = 0;
        for (var _i = 0, _a = rol.cuotas; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.esCuoton == 'S') {
                totalCuoton += c.liqTotal.montoTotalTotal;
            }
        }
        this.montoCuoton = totalCuoton;
        return (totalCuoton);
    };
    // cambioCheckbox(){
    //   this.cuotaAnualCheck = false;
    //   this.bloqueAzul = false;
    // }
    RolCuotasComponent.prototype.checkCuota = function (rol, cuota) {
        cuota.changeIntencionPago();
        if (cuota.esCuoton == 'S' && !cuota.intencionPago && this.cuotaAnualCheck) {
            this.checkCuoton(rol);
        }
    };
    RolCuotasComponent.prototype.checkCuoton = function (rol) {
        if (rol != undefined) {
            if (this.cuotaAnualCheck) {
                this.cuotaAnualCheck = false;
                this.bloqueAzul = false;
                for (var _i = 0, _a = rol.cuotas; _i < _a.length; _i++) {
                    var c = _a[_i];
                    if (c.esCuoton == 'S') {
                        c.intencionPago = false;
                    }
                }
            }
            else {
                this.cuotaAnualCheck = true;
                this.bloqueAzul = true;
                for (var _b = 0, _c = rol.cuotas; _b < _c.length; _b++) {
                    var c = _c[_b];
                    if (c.esCuoton == 'S') {
                        c.intencionPago = true;
                    }
                }
            }
        }
        this.seleccioncuotas.recalcularTipo();
        console.log("calcula total");
        this.seleccioncuotas.calcularTotal();
    };
    RolCuotasComponent.prototype["delete"] = function () {
        var _this = this;
        if (this.rol.isComplete) {
            this.dialogService.confirm('Eliminarás el ROL completo, ¿estás seguro/a?', 'CANCELAR', 'ELIMINAR').subscribe(function () {
                _this.user.eliminarRol(_this.rol.rolComunaSiiCod, _this.rol.rolId, _this.rol.subrolId).then(function () { return _this.mdlSnackbarService.showToast('Rol eliminado.', environment_1.environment.snackbarTime); }, function (err) {
                    console.log(err);
                    _this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección.', environment_1.environment.snackbarTime);
                });
            });
        }
        else {
            this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment_1.environment.snackbarTime);
        }
    };
    __decorate([
        core_1.Input()
    ], RolCuotasComponent.prototype, "rol");
    __decorate([
        core_1.Output()
    ], RolCuotasComponent.prototype, "change");
    __decorate([
        core_1.ViewChildren(ng2_tooltip_directive_1.TooltipDirective)
    ], RolCuotasComponent.prototype, "tooltipDirective");
    RolCuotasComponent = __decorate([
        core_1.Component({
            selector: 'app-rol-cuotas',
            templateUrl: './rol-cuotas.component.html',
            styleUrls: ['./rol-cuotas.component.scss']
        })
    ], RolCuotasComponent);
    return RolCuotasComponent;
}());
exports.RolCuotasComponent = RolCuotasComponent;
