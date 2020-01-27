"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DeviceDetectService = /** @class */ (function () {
    function DeviceDetectService() {
    }
    DeviceDetectService.prototype.setDevice = function (device) {
        this.device = device.device;
    };
    DeviceDetectService.prototype.isDeviceDesktop = function () {
        return this.device.desktop;
    };
    DeviceDetectService.prototype.isDeviceMobile = function () {
        return this.device.mobile;
    };
    DeviceDetectService.prototype.isDeviceSmartTv = function () {
        return this.device.smartTv;
    };
    DeviceDetectService.prototype.isDeviceTablet = function () {
        return this.device.tablet;
    };
    DeviceDetectService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DeviceDetectService);
    return DeviceDetectService;
}());
exports.DeviceDetectService = DeviceDetectService;
