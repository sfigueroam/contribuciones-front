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
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
exports.CANT_PROPIEDADES_SELEC = new core_1.InjectionToken('cant_propiedades_selec');
var RecordarComponent = /** @class */ (function () {
    function RecordarComponent(dialog, router, cantPropiedades) {
        var _this = this;
        this.dialog = dialog;
        this.router = router;
        this.cantPropiedades = cantPropiedades;
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationStart; }), operators_1.tap(function () { return _this.dialog.hide(); })).subscribe();
    }
    RecordarComponent.prototype.ngOnInit = function () {
    };
    RecordarComponent.prototype.volver = function () {
        this.dialog.hide();
    };
    RecordarComponent.prototype.agregar = function () {
        this.dialog.hide('agregar');
    };
    RecordarComponent = __decorate([
        core_1.Component({
            selector: 'app-recordar',
            templateUrl: './recordar.component.html',
            styleUrls: ['./recordar.component.scss']
        }),
        __param(2, core_1.Inject(exports.CANT_PROPIEDADES_SELEC))
    ], RecordarComponent);
    return RecordarComponent;
}());
exports.RecordarComponent = RecordarComponent;
