"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var propiedad_rol_component_1 = require("../propiedad-rol/propiedad-rol.component");
var CheckboxIcon_1 = require("../../../../domain/CheckboxIcon");
var PropiedadComponent = /** @class */ (function () {
    function PropiedadComponent() {
        this.change = new core_1.EventEmitter();
    }
    PropiedadComponent.prototype.ngOnInit = function () {
        console.log('propiedades, ngOnInit');
        this.seleccion = true;
        if (this.defaulSeleccion === false) {
            this.seleccion = false;
        }
        this.updateIconSeleccion();
    };
    PropiedadComponent.prototype.updatePropiedades = function () {
        this.evalSelectRoles();
        this.change.emit();
    };
    PropiedadComponent.prototype.selectAllRol = function (execute) {
        if (execute) {
            this.seleccion = !this.seleccion;
            this.updateIconSeleccion();
            this.updateRoles();
            this.change.emit();
        }
    };
    PropiedadComponent.prototype.updateRoles = function () {
        var sugeridosRolList = this.propiedadRolComponentList.toArray();
        for (var _i = 0, sugeridosRolList_1 = sugeridosRolList; _i < sugeridosRolList_1.length; _i++) {
            var sugeridosRol = sugeridosRolList_1[_i];
            sugeridosRol.updateSeleccion(this.seleccion);
        }
        this.getCantidadRolesSeleccionadas();
    };
    PropiedadComponent.prototype.getCantidadRolesSeleccionadas = function () {
        this.cantidadRolesSeleccionadas = 0;
        var sugeridosRolList = this.propiedadRolComponentList.toArray();
        for (var _i = 0, sugeridosRolList_2 = sugeridosRolList; _i < sugeridosRolList_2.length; _i++) {
            var sugeridosRol = sugeridosRolList_2[_i];
            if (sugeridosRol.seleccion) {
                this.cantidadRolesSeleccionadas++;
            }
        }
        return this.cantidadRolesSeleccionadas;
    };
    PropiedadComponent.prototype.getRolesSeleccionadas = function () {
        var roles = [];
        var sugeridosRolList = this.propiedadRolComponentList.toArray();
        for (var _i = 0, sugeridosRolList_3 = sugeridosRolList; _i < sugeridosRolList_3.length; _i++) {
            var sugeridosRol = sugeridosRolList_3[_i];
            if (sugeridosRol.seleccion) {
                roles.push(sugeridosRol.rol.rol);
            }
        }
        return roles;
    };
    PropiedadComponent.prototype.updateIconSeleccion = function () {
        if (this.seleccion === undefined) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.INDETERMINATE;
        }
        else if (this.seleccion) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.SELECTED;
        }
        else {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.UNSELECTED;
        }
    };
    PropiedadComponent.prototype.evalSelectRoles = function () {
        var cantidad = 0;
        var sugeridosRolList = this.propiedadRolComponentList.toArray();
        for (var _i = 0, sugeridosRolList_4 = sugeridosRolList; _i < sugeridosRolList_4.length; _i++) {
            var sugeridosRol = sugeridosRolList_4[_i];
            if (sugeridosRol.seleccion) {
                cantidad++;
            }
        }
        if (cantidad === sugeridosRolList.length) {
            this.seleccion = true;
        }
        else if (cantidad === 0) {
            this.seleccion = false;
        }
        else {
            this.seleccion = undefined;
        }
        this.updateIconSeleccion();
    };
    PropiedadComponent.prototype.getRolesSeleccioados = function () {
        var roles = [];
        var rolesList = this.propiedadRolComponentList.toArray();
        for (var _i = 0, rolesList_1 = rolesList; _i < rolesList_1.length; _i++) {
            var rol = rolesList_1[_i];
            if (rol.seleccion) {
                roles.push(rol.rol);
            }
        }
        if (roles.length === 0) {
            return undefined;
        }
        return roles;
    };
    PropiedadComponent.prototype.getCantRoles = function () {
        var rolesList = this.propiedadRolComponentList.toArray();
        return rolesList.length;
    };
    PropiedadComponent.prototype.updateSeleccion = function (selec) {
        this.seleccion = selec;
        this.updateIconSeleccion();
        this.updateRoles();
    };
    __decorate([
        core_1.Input()
    ], PropiedadComponent.prototype, "propiedad");
    __decorate([
        core_1.Input('default-seleccion')
    ], PropiedadComponent.prototype, "defaulSeleccion");
    __decorate([
        core_1.Output()
    ], PropiedadComponent.prototype, "change");
    __decorate([
        core_1.ViewChildren(propiedad_rol_component_1.PropiedadRolComponent)
    ], PropiedadComponent.prototype, "propiedadRolComponentList");
    PropiedadComponent = __decorate([
        core_1.Component({
            selector: 'app-propiedad',
            templateUrl: './propiedad.component.html',
            styleUrls: ['./propiedad.component.scss']
        })
    ], PropiedadComponent);
    return PropiedadComponent;
}());
exports.PropiedadComponent = PropiedadComponent;
