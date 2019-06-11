"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var State;
(function (State) {
    State[State["init"] = 0] = "init";
    State[State["verification"] = 1] = "verification";
})(State = exports.State || (exports.State = {}));
var AsociarCorreoComponent = /** @class */ (function () {
    function AsociarCorreoComponent(dialog, service, mdlSnackbarService, user, router) {
        this.dialog = dialog;
        this.service = service;
        this.mdlSnackbarService = mdlSnackbarService;
        this.user = user;
        this.router = router;
        this.estados = State;
        this.estado = State.init;
        this.email = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email
        ]);
        this.formEmail = new forms_1.FormGroup({
            email: this.email
        });
        this.code = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(4)
        ]);
        this.formCode = new forms_1.FormGroup({
            code: this.code
        });
    }
    AsociarCorreoComponent.prototype.ngOnInit = function () {
    };
    AsociarCorreoComponent.prototype.asociarCorreo = function () {
        var _this = this;
        this.correo = this.email.value.toLowerCase();
        this.service.enviarMailCodigoVerificacion(this.correo).then(function (resultado) {
            if (resultado.ok()) {
                _this.estado = State.verification;
            }
            else {
                _this.mdlSnackbarService.showToast(resultado.descripcion);
            }
        }, function (err) {
            console.log(err);
            _this.mdlSnackbarService.showToast('Ocurrió un error al enviar el correo de validación');
        });
    };
    AsociarCorreoComponent.prototype.ingresarCodigo = function () {
        var _this = this;
        this.codigo = this.code.value;
        this.service.validarCodigo(this.correo, this.codigo).then(function (resultado) {
            if (resultado.ok()) {
                _this.user.email = _this.correo;
                _this.service.propiedades = undefined;
                _this.router.navigate(['main/contribuciones/seleccionar-cuotas'], {
                    queryParams: { 'refresh': true },
                    skipLocationChange: true
                });
                _this.close();
            }
            else {
                _this.mdlSnackbarService.showToast(resultado.descripcion);
            }
        }, function (err) {
            console.log(err);
            _this.mdlSnackbarService.showToast('Ocurrió un error al validar el código');
        });
    };
    AsociarCorreoComponent.prototype.otroCorreo = function () {
        this.estado = State.init;
    };
    AsociarCorreoComponent.prototype.close = function () {
        this.user.solicitarEmail = false;
        this.dialog.hide();
    };
    AsociarCorreoComponent = __decorate([
        core_1.Component({
            selector: 'app-asociar-correo',
            templateUrl: './asociar-correo.component.html',
            styleUrls: ['./asociar-correo.component.scss']
        })
    ], AsociarCorreoComponent);
    return AsociarCorreoComponent;
}());
exports.AsociarCorreoComponent = AsociarCorreoComponent;
