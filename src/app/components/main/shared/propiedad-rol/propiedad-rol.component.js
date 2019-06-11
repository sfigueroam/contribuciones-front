"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PropiedadRolComponent = /** @class */ (function () {
    function PropiedadRolComponent() {
        this.change = new core_1.EventEmitter();
        this.icon = '';
        this.seleccion = true;
    }
    PropiedadRolComponent.prototype.ngOnInit = function () {
        if (this.defaulSeleccion === false) {
            this.seleccion = false;
        }
        this.updateIconSeleccion();
        this.iconInit();
    };
    PropiedadRolComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.change.emit();
        }, 100);
    };
    PropiedadRolComponent.prototype.iconInit = function () {
        switch (this.rol.idDestPropiedad) {
            case 'A': // AGRICOLA
            case 'B': // AGRICOLA POR ASIMILACION
                this.icon = 'spa';
                break;
            case 'E': // EDUCACION Y CULTURA
                this.icon = 'school';
                break;
            case 'F': // FORESTAL
                this.icon = 'terrain';
                break;
            case 'G': // HOTEL, MOTEL
                this.icon = 'hotel';
                break;
            case 'I': // INDUSTRIA
            case 'M': // MINERIA
                this.icon = 'local_shipping';
                break;
            case 'H': // HABITACIONAL
                this.icon = 'business';
                break;
            case 'O': // OFICINA
                this.icon = 'work';
                break;
            case 'L': // BODEGA
                this.icon = 'meeting_room';
                break;
            case 'Q': // CULTO
                this.icon = '';
                break;
            case 'S': // SALUD
                this.icon = 'local_hospital';
                break;
            case 'Z': // ESTACIONAMIENTO
                this.icon = 'directions_car';
                break;
            default:
                this.icon = 'layers';
                break;
        }
    };
    PropiedadRolComponent.prototype.updateSeleccion = function (checked) {
        this.seleccion = checked;
        this.updateIconSeleccion();
    };
    PropiedadRolComponent.prototype.updateIconSeleccion = function () {
        if (this.seleccion) {
            this.selectedIcon = 'checked';
        }
        else {
            this.selectedIcon = 'unchecked';
        }
    };
    PropiedadRolComponent.prototype.selectRol = function () {
        this.seleccion = !this.seleccion;
        this.updateIconSeleccion();
        this.change.emit();
    };
    __decorate([
        core_1.Input()
    ], PropiedadRolComponent.prototype, "rol");
    __decorate([
        core_1.Input('default-seleccion')
    ], PropiedadRolComponent.prototype, "defaulSeleccion");
    __decorate([
        core_1.Output()
    ], PropiedadRolComponent.prototype, "change");
    PropiedadRolComponent = __decorate([
        core_1.Component({
            selector: '[app-propiedad-rol]',
            templateUrl: './propiedad-rol.component.html',
            styleUrls: ['./propiedad-rol.component.scss']
        })
    ], PropiedadRolComponent);
    return PropiedadRolComponent;
}());
exports.PropiedadRolComponent = PropiedadRolComponent;
