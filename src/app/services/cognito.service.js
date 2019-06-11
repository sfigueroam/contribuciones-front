"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var angular_jwt_1 = require("@auth0/angular-jwt");
var q_1 = require("q");
var CognitoService = /** @class */ (function () {
    function CognitoService(cookie, user, jwtCognito) {
        this.cookie = cookie;
        this.user = user;
        this.jwtCognito = jwtCognito;
        this.helper = new angular_jwt_1.JwtHelperService();
        if (this.cookie.check(environment_1.environment.cognito.jwtCookieName)) {
            this.init(this.cookie.get(environment_1.environment.cognito.jwtCookieName));
            this.authenticate();
        }
    }
    CognitoService.prototype.loginUrl = function () {
        return environment_1.environment.cognito.authorizeURL
            + '?response_type=token&client_id='
            + environment_1.environment.cognito.clientId
            + '&redirect_uri='
            + environment_1.environment.cognito.redirectUri;
    };
    CognitoService.prototype.logoutUrl = function () {
        return environment_1.environment.cognito.logoutURL
            + '?client_id='
            + environment_1.environment.cognito.clientId
            + '&logout_uri='
            + environment_1.environment.cognito.logoutUri;
    };
    CognitoService.prototype.username = function () {
        if (this.identity.hasOwnProperty('custom:clave-unica:run')) {
            var temp = JSON.parse(this.identity['custom:clave-unica:run']);
            if (temp.tipo === 'RUN') {
                return temp.numero;
            }
        }
        if (this.identity.hasOwnProperty('cognito:username')) {
            return this.identity['cognito:username'].split('-')[0];
        }
        return null;
    };
    CognitoService.prototype.createCookie = function () {
        if (environment_1.environment.cognito.allowCookies) {
            this.cookie.set(environment_1.environment.cognito.jwtCookieName, this.jwt);
        }
    };
    CognitoService.prototype.createExpirationCookie = function () {
        var now = new Date();
        var exp = now.getTime() + (this.identity['exp'] - this.identity['iat']) * 1000;
        this.exp = new Date(exp);
        console.log('Fecha en la que expirará el JWT', this.exp);
        if (environment_1.environment.cognito.allowCookies) {
            this.cookie.set(environment_1.environment.cognito.expCookieName, String(exp));
        }
    };
    CognitoService.prototype.removeCookies = function () {
        if (environment_1.environment.cognito.allowCookies) {
            this.cookie["delete"](environment_1.environment.cognito.jwtCookieName);
            this.cookie["delete"](environment_1.environment.cognito.expCookieName);
        }
    };
    CognitoService.prototype.authenticate = function () {
        this.user.setRut(this.username());
        this.expiredSessionMonitor();
    };
    CognitoService.prototype.init = function (jwt) {
        this.jwt = jwt;
        this.identity = this.helper.decodeToken(this.jwt);
        this.jwtCognito.jwt = this.jwt;
    };
    CognitoService.prototype.login = function (fragment) {
        var _this = this;
        return new Promise(function (resolve) {
            var values = {};
            fragment.split('&').forEach(function (value) {
                var strings = value.split('=');
                values[strings[0]] = strings[1];
            });
            _this.init(values['id_token']);
            _this.createCookie();
            _this.createExpirationCookie();
            _this.authenticate();
            resolve(_this.identity);
        });
    };
    CognitoService.prototype.getExpirationDate = function () {
        if (environment_1.environment.cognito.allowCookies && this.cookie.check(environment_1.environment.cognito.expCookieName)) {
            return new Date(+this.cookie.get(environment_1.environment.cognito.expCookieName));
        }
        else {
            return this.exp;
        }
    };
    CognitoService.prototype.redirectLogin = function () {
        window.location.href = this.loginUrl();
    };
    CognitoService.prototype.logout = function () {
        this.removeCookies();
        window.location.href = this.logoutUrl();
    };
    CognitoService.prototype.expiredSessionMonitor = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var exp, now, sleepTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        exp = this.getExpirationDate();
                        now = new Date();
                        if (exp <= now) {
                            console.log('Sesion expired... login out');
                            this.logout();
                            return [3 /*break*/, 2];
                        }
                        sleepTime = exp.getTime() - now.getTime();
                        console.log('Checking sesion in ' + sleepTime / 1000 + ' seconds');
                        return [4 /*yield*/, q_1.delay(Math.max(sleepTime, 30000))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2:
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    CognitoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CognitoService);
    return CognitoService;
}());
exports.CognitoService = CognitoService;
