"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var ModalErrorMulticidComponent = /** @class */ (function () {
    function ModalErrorMulticidComponent(dialog, router) {
        var _this = this;
        this.dialog = dialog;
        this.router = router;
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationStart; }), operators_1.tap(function () { return _this.dialog.hide(); })).subscribe();
    }
    ModalErrorMulticidComponent.prototype.ngOnInit = function () {
    };
    ModalErrorMulticidComponent.prototype.volver = function () {
        this.dialog.hide();
    };
    ModalErrorMulticidComponent = __decorate([
        core_1.Component({
            selector: 'app-modal-error-multicid',
            templateUrl: './modal-error-multicid.component.html',
            styleUrls: ['./modal-error-multicid.component.css']
        })
    ], ModalErrorMulticidComponent);
    return ModalErrorMulticidComponent;
}());
exports.ModalErrorMulticidComponent = ModalErrorMulticidComponent;
