"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var environment_1 = require("../../environments/environment");
var TipoRecaptcha_enum_1 = require("../enum/TipoRecaptcha.enum");
var core_1 = require("@angular/core");
var RecaptchaService = /** @class */ (function () {
    function RecaptchaService(requestService) {
        this.requestService = requestService;
    }
    RecaptchaService.prototype.validaRecaptcha = function (tokenCaptcha, tipo) {
        var body = {
            token: tokenCaptcha
        };
        var captcha;
        if (tipo === TipoRecaptcha_enum_1.TipoRecaptcha.V2) {
            captcha = environment_1.environment.recaptcha.v2;
        }
        else {
            captcha = environment_1.environment.recaptcha.v3;
        }
        var service = {
            url: captcha.url,
            body: body,
            method: captcha.method
        };
        return this.requestService.validaRecaptcha(service);
    };
    RecaptchaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RecaptchaService);
    return RecaptchaService;
}());
exports.RecaptchaService = RecaptchaService;
