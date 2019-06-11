"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var ngx_lightbox_1 = require("ngx-lightbox");
var AyudaDireccionComponent = /** @class */ (function () {
    function AyudaDireccionComponent(dialog, lightbox, lightboxEvent, lighboxConfig, router) {
        var _this = this;
        this.dialog = dialog;
        this.lightbox = lightbox;
        this.lightboxEvent = lightboxEvent;
        this.lighboxConfig = lighboxConfig;
        this.router = router;
        this.albums = [];
        for (var i = 1; i <= 2; i++) {
            var src = 'assets/ayuda/ayudarol' + i + '.png';
            var caption = '¿Cómo buscar por ROL? Boletín de Pago';
            var thumb = 'assets/ayuda/ayudarol-thumb' + i + '.png';
            var album = {
                src: src,
                caption: caption,
                thumb: thumb
            };
            this.albums.push(album);
        }
        this.lighboxConfig.fadeDuration = 1;
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationStart; }), operators_1.tap(function () { return _this.dialog.hide(); })).subscribe();
    }
    AyudaDireccionComponent.prototype.ngOnInit = function () {
    };
    AyudaDireccionComponent.prototype.open = function (index) {
        var _this = this;
        this.subscription = this.lightboxEvent.lightboxEvent$
            .subscribe(function (event) { return _this._onReceivedEvent(event); });
        this.lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
        // this.volver();
    };
    AyudaDireccionComponent.prototype._onReceivedEvent = function (event) {
        if (event.id === ngx_lightbox_1.LIGHTBOX_EVENT.CLOSE) {
            this.subscription.unsubscribe();
        }
    };
    AyudaDireccionComponent.prototype.volver = function () {
        this.dialog.hide();
    };
    AyudaDireccionComponent = __decorate([
        core_1.Component({
            selector: 'app-ayuda-direccion',
            templateUrl: './ayuda-direccion.component.html',
            styleUrls: ['./ayuda-direccion.component.scss']
        })
    ], AyudaDireccionComponent);
    return AyudaDireccionComponent;
}());
exports.AyudaDireccionComponent = AyudaDireccionComponent;
