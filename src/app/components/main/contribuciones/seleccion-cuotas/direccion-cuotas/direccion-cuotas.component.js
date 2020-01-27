"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../../../environments/environment");
var rol_cuotas_component_1 = require("../rol-cuotas/rol-cuotas.component");
var DireccionCuotasComponent = /** @class */ (function () {
    function DireccionCuotasComponent(user, dialogService, mdlSnackbarService) {
        this.user = user;
        this.dialogService = dialogService;
        this.mdlSnackbarService = mdlSnackbarService;
        this.change = new core_1.EventEmitter();
    }
    DireccionCuotasComponent.prototype.ngOnInit = function () {
        this.expanded = true;
        this.comuna = this.propiedad.roles[0].comuna;
    };
    DireccionCuotasComponent.prototype.onChange = function () {
        this.change.emit();
    };
    DireccionCuotasComponent.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    DireccionCuotasComponent.prototype["delete"] = function () {
        var _this = this;
        if (this.propiedad.isComplete) {
            this.dialogService.confirm('Eliminarás el ROL completo, ¿estás seguro/a?', 'CANCELAR', 'ELIMINAR').subscribe(function () {
                _this.user.eliminarPropiedad(_this.propiedad.idDireccion).then(function () { return _this.mdlSnackbarService.showToast('Dirección eliminada.', environment_1.environment.snackbarTime); }, function (err) {
                    console.log(err);
                    _this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección.', environment_1.environment.snackbarTime);
                });
            });
        }
        else {
            this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment_1.environment.snackbarTime);
        }
    };
    DireccionCuotasComponent.prototype.abrirPrimerRol = function () {
        var rolCuotasList = this.rolCuotasComponentList.toArray();
        if (rolCuotasList !== undefined && rolCuotasList.length > 0) {
            rolCuotasList[0].expanded = true;
        }
    };
    DireccionCuotasComponent.prototype.showHelp = function () {
        var rolCuotasList = this.rolCuotasComponentList.toArray();
        if (rolCuotasList !== undefined && rolCuotasList.length > 0) {
            rolCuotasList[0].showHelp();
        }
    };
    __decorate([
        core_1.ViewChildren(rol_cuotas_component_1.RolCuotasComponent)
    ], DireccionCuotasComponent.prototype, "rolCuotasComponentList");
    __decorate([
        core_1.Input()
    ], DireccionCuotasComponent.prototype, "propiedad");
    __decorate([
        core_1.Output()
    ], DireccionCuotasComponent.prototype, "change");
    DireccionCuotasComponent = __decorate([
        core_1.Component({
            selector: 'app-direccion-cuotas',
            templateUrl: './direccion-cuotas.component.html',
            styleUrls: ['./direccion-cuotas.component.scss']
        })
    ], DireccionCuotasComponent);
    return DireccionCuotasComponent;
}());
exports.DireccionCuotasComponent = DireccionCuotasComponent;
