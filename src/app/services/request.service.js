"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var RequestService = /** @class */ (function () {
    function RequestService(http, jwtCognito) {
        this.http = http;
        this.jwtCognito = jwtCognito;
    }
    RequestService.prototype.lambda = function (servicio, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.request(servicio.method, servicio.url + servicio.path, {
                body: body,
                responseType: 'json'
            }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log('Error', err);
                reject();
            });
        });
    };
    RequestService.prototype.request = function (servicio, body) {
        var _this = this;
        var headers = {};
        if (this.jwtCognito.jwt !== undefined) {
            headers = new http_1.HttpHeaders({
                Authorization: this.jwtCognito.jwt
            });
        }
        return new Promise(function (resolve, reject) {
            _this.http.request(servicio.method, servicio.url, {
                body: body,
                responseType: 'json',
                headers: headers
            }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log('Error', err);
                reject();
            });
        });
    };
    RequestService.prototype.requestElastic = function (servicio) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.request(servicio.method, servicio.url, {
                body: servicio.body,
                responseType: 'json'
            }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log('Error', err);
                reject();
            });
        });
    };
    RequestService.prototype.validaRecaptcha = function (servicio) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.request(servicio.method, servicio.url, {
                body: servicio.body,
                responseType: 'json'
            }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log('Error', err);
                reject(err.error);
            });
        });
    };
    RequestService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RequestService);
    return RequestService;
}());
exports.RequestService = RequestService;
