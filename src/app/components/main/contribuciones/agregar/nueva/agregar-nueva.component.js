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
var Direccion_1 = require("../../../../../domain/Direccion");
var environment_1 = require("../../../../../../environments/environment");
var propiedad_component_1 = require("../../../shared/propiedad/propiedad.component");
var Rol_1 = require("../../../../../domain/Rol");
var asociar_correo_component_1 = require("../../../../dialogs/asociar-correo/asociar-correo.component");
var TgrReCaptcha_1 = require("../../../../../domain/TgrReCaptcha");
var TipoRecaptcha_enum_1 = require("../../../../../enum/TipoRecaptcha.enum");
var CheckboxIcon_1 = require("../../../../../domain/CheckboxIcon");
var dialog_agregar_propiedad_component_1 = require("./modal/dialog-agregar-propiedad/dialog-agregar-propiedad.component");
var ayuda_direccion_component_1 = require("./modal/ayuda-direccion/ayuda-direccion.component");
var ayuda_rol_component_1 = require("./modal/ayuda-rol/ayuda-rol.component");
var recordar_component_1 = require("./modal/recordar/recordar.component");
var pit_utils_1 = require("../../../../../pit-utils");
var AgregarNuevaComponent = /** @class */ (function () {
    function AgregarNuevaComponent(contribucionesBuscarRol, mdlSnackbarService, user, router, contribuciones, dialogService, reCaptchaV3Service, scriptService, deviceDetectService, recaptchaService) {
        this.contribucionesBuscarRol = contribucionesBuscarRol;
        this.mdlSnackbarService = mdlSnackbarService;
        this.user = user;
        this.router = router;
        this.contribuciones = contribuciones;
        this.dialogService = dialogService;
        this.reCaptchaV3Service = reCaptchaV3Service;
        this.scriptService = scriptService;
        this.deviceDetectService = deviceDetectService;
        this.recaptchaService = recaptchaService;
        this.wait = false;
        this.sinResultado = false;
        this.searchDireccion = false;
        this.switchActive = 'rol';
        this.busquedaEnEjecucion = false;
        this.inputDireccionesTmp = '';
        this.footerHidden = false;
        this.page = 1;
        this.recaptcha = null;
        this.totalRoles = 0;
        this.showButtonLimpiarBusqueda = false;
        this.recaptcha2 = new TgrReCaptcha_1.TgrReCaptcha();
        this.viewRecaptcha2 = false;
        this.recaptcha3 = new TgrReCaptcha_1.TgrReCaptcha();
        this.recaptcha2.siteKey = environment_1.environment.recaptcha.v2.key;
        this.recaptcha3.siteKey = environment_1.environment.recaptcha.v3.key;
        this.recaptcha3.action = 'buscar';
        this.comuna = new forms_1.FormControl('', forms_1.Validators.required);
        this.rol = new forms_1.FormControl('', forms_1.Validators.required);
        this.subRol = new forms_1.FormControl('', forms_1.Validators.required);
        this.formRol = new forms_1.FormGroup({
            comuna: this.comuna,
            rol: this.rol,
            subRol: this.subRol
        });
        this.cantidadSeleccionadas = 0;
        this.tipoPropiedad = new forms_1.FormControl('');
        var validatorsDireccion = forms_1.Validators.compose([
            forms_1.Validators.minLength(3),
            forms_1.Validators.required
        ]);
        this.direccion = new forms_1.FormControl('', validatorsDireccion);
        this.formDireccion = new forms_1.FormGroup({
            tipoPropiedad: this.tipoPropiedad,
            direccion: this.direccion
        });
        this.tipoPropiedad.setValue(-1);
        this.hidden = true;
        this.bottomToolbarHidden = !this.user.email && this.user.solicitarEmail;
        this.selectAll = false;
        this.paginacion = environment_1.environment.paginacion;
        this.updateIconSeleccion();
    }
    AgregarNuevaComponent.prototype.ocultarToolbar = function () {
        this.bottomToolbarHidden = true;
        this.ocultarFooter();
    };
    AgregarNuevaComponent.prototype.mostrarToolbar = function () {
        this.bottomToolbarHidden = false;
        this.mostrarFooter();
    };
    AgregarNuevaComponent.prototype.mostrarFooter = function () {
        this.footerHidden = false;
    };
    AgregarNuevaComponent.prototype.ocultarFooter = function () {
        if (!this.deviceDetectService.isDeviceDesktop()) {
            this.footerHidden = true;
        }
    };
    AgregarNuevaComponent.prototype.updateSeleccionadaTotal = function () {
        this.totalSeleccionadas();
        if (this.cantidadSeleccionadas === 0) {
            this.selectAll = false;
        }
        else if (this.totalRoles === this.cantidadSeleccionadas) {
            this.selectAll = true;
        }
        else if (this.totalRoles !== this.cantidadSeleccionadas) {
            this.selectAll = undefined;
        }
        this.updateIconSeleccion();
    };
    AgregarNuevaComponent.prototype.totalSeleccionadas = function () {
        this.cantidadSeleccionadas = 0;
        this.totalRoles = 0;
        var propiedadesComponent = this.propiedadComponentList.toArray();
        for (var _i = 0, propiedadesComponent_1 = propiedadesComponent; _i < propiedadesComponent_1.length; _i++) {
            var propedadComponent = propiedadesComponent_1[_i];
            this.cantidadSeleccionadas = this.cantidadSeleccionadas + propedadComponent.getCantidadRolesSeleccionadas();
            this.totalRoles = this.totalRoles + propedadComponent.getCantRoles();
        }
    };
    AgregarNuevaComponent.prototype.ngAfterViewInit = function () {
        /*  setTimeout(
            () => {
              this.dialogCorreo();
            },
            200);*/
    };
    AgregarNuevaComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Probando logeo
        this.logged = this.user.isLogged();
        this.dialogoRecuperarPropiedadesEmail = environment_1.environment.dialogoRecuperarPropiedadesEmail;
        this.contribucionesBuscarRol.getComunas().then(function (data) {
            _this.localidad = data;
        }, function () {
            _this.error('Ocurrió un error al obtener las comunas');
        });
        this.contribucionesBuscarRol.getTiposPropiedades().then(function (data) {
            _this.tipoPropiedadesfrecuentes = [];
            _this.tipoPropiedades = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var prop = data_1[_i];
                if (prop.id === 'H' || prop.id === 'L' || prop.id === 'Z') {
                    prop.order = environment_1.environment.frecuentesOrder[prop.id];
                    _this.tipoPropiedadesfrecuentes.push(prop);
                }
                else {
                    _this.tipoPropiedades.push(prop);
                }
            }
        }, function () {
            _this.error('Ocurrió un error al obtener los tipos de propiedades');
        });
        this.loadCantidadPropiedadesEnCarro();
        var domSelectComuna = this.selectComuna.selectInput.nativeElement;
        domSelectComuna.addEventListener('focus', function () { return _this.ocultarFooter(); });
        domSelectComuna.addEventListener('blur', function () { return _this.mostrarFooter(); });
        domSelectComuna.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        var domSelectTipo = this.selectTipo.selectInput.nativeElement;
        domSelectTipo.addEventListener('focus', function () { return _this.ocultarFooter(); });
        domSelectTipo.addEventListener('blur', function () { return _this.mostrarFooter(); });
    };
    AgregarNuevaComponent.prototype.loadCantidadPropiedadesEnCarro = function () {
        this.countPropiedades = this.contribuciones.getCountPropiedad();
    };
    AgregarNuevaComponent.prototype.buscarRolPost = function (tokenCaptcha, tipo) {
        var _this = this;
        this.onWait();
        this.contribucionesBuscarRol.searchRolesForIds(this.comuna.value, this.rol.value, this.subRol.value, tokenCaptcha, tipo).then(function (response) {
            if (response === null) {
                _this.sinResultado = true;
            }
            else {
                _this.agregarPropiedad(response);
                _this.onScroll();
            }
            _this.offWait();
        }, function () {
            if (tipo === TipoRecaptcha_enum_1.TipoRecaptcha.V3) {
                _this.executeCaptcha2();
            }
            else {
                _this.error('Ocurrió un error al buscar direcciones');
                _this.offWait();
            }
        });
    };
    AgregarNuevaComponent.prototype.buscarDireccionSugeridos = function () {
        var _this = this;
        if (this.direccion.value === '' || this.direccion.value === null) {
            this.sinResultado = true;
            return;
        }
        this.inputDireccionesTmp = this.direccion.value;
        var size = environment_1.environment.sizeResultSuggested;
        var tipoPropiedad = this.tipoPropiedad.value;
        if (tipoPropiedad === -1) {
            tipoPropiedad = '';
        }
        this.contribucionesBuscarRol.searchDireccion(undefined, tipoPropiedad, this.direccion.value, size, false, null, null).then(function (lista) {
            _this.direcciones = lista;
        }, function (err) {
            _this.error(err);
        });
    };
    AgregarNuevaComponent.prototype.onWait = function () {
        this.sinResultado = false;
        this.wait = true;
    };
    AgregarNuevaComponent.prototype.offWait = function () {
        this.wait = false;
    };
    AgregarNuevaComponent.prototype.changeSwith = function (active) {
        this.switchActive = active;
    };
    AgregarNuevaComponent.prototype.inputDirecciones = function (event) {
        var _this = this;
        var inp = String.fromCharCode(event.keyCode);
        if (this.direcciones == null) {
            this.inputDireccionesTmp = '';
        }
        if (this.direccion.value != null && this.direccion.value.length <= 2) {
            this.direcciones = null;
            this.inputDireccionesTmp = '';
        }
        else if (event.keyCode === 13) {
            this.searchDireccion = false;
        }
        else if (/[a-zA-Z0-9-_ ]/.test(inp) || event.keyCode === 8 || this.direccion.value !== this.inputDireccionesTmp) {
            this.searchDireccion = true;
            if (this.direccion.value != null && this.direccion.value.length > 2) {
                if (!this.busquedaEnEjecucion) {
                    this.busquedaEnEjecucion = true;
                    setTimeout(function () {
                        _this.buscarDireccionSugeridos();
                        _this.busquedaEnEjecucion = false;
                    }, 800);
                }
            }
        }
    };
    AgregarNuevaComponent.prototype.agregarPropiedad = function (response) {
        if (this.propiedades === undefined || this.propiedades == null) {
            this.propiedades = [];
        }
        var estado = false;
        for (var _i = 0, _a = this.propiedades; _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop.idDireccion === response.idDireccion) {
                estado = true;
                for (var _b = 0, _c = response.roles; _b < _c.length; _b++) {
                    var rol = _c[_b];
                    if (!prop.existRol(rol.rol)) {
                        prop.addRol(new Rol_1.Rol(rol));
                    }
                }
            }
        }
        if (!estado) {
            this.propiedades.push(response);
        }
    };
    AgregarNuevaComponent.prototype.error = function (msg) {
        this.mdlSnackbarService.showSnackbar({
            message: msg,
            timeout: environment_1.environment.snackbarTime,
            action: {
                handler: function () {
                },
                text: 'ok'
            }
        });
    };
    AgregarNuevaComponent.prototype.buscarDireccionPostRecaptcha = function (tokenCaptcha, tipo) {
        var _this = this;
        if (this.direccion.value === '' || this.direccion.value === null) {
            return;
        }
        this.onWait();
        this.searchDireccion = false;
        var size = environment_1.environment.sizeResultPage;
        var tipoPropiedad = this.tipoPropiedad.value;
        if (tipoPropiedad === -1) {
            tipoPropiedad = '';
        }
        this.contribucionesBuscarRol.searchDireccion(undefined, tipoPropiedad, this.direccion.value, size, true, tokenCaptcha, tipo).then(function (lista) {
            lista = _this.orderDirecciones(lista);
            _this.direcciones = lista;
            _this.page = 1;
            _this.agregarDireccionesAPropiedad();
            _this.offWait();
            _this.resetCaptcha2();
            _this.onScroll();
        }, function () {
            if (tipo === TipoRecaptcha_enum_1.TipoRecaptcha.V3) {
                _this.executeCaptcha2();
            }
            else {
                _this.resetCaptcha2();
                _this.error('Ocurrió un error al buscar direcciones');
                _this.offWait();
            }
        });
    };
    AgregarNuevaComponent.prototype.autoCompletarPropiedad = function () {
        this.buscarDireccionSugeridos();
    };
    AgregarNuevaComponent.prototype.agregarDireccionesAPropiedad = function () {
        var propiedads = this.contribucionesBuscarRol.direccionToPropiedad(this.direcciones, this.page);
        if (propiedads) {
            for (var _i = 0, propiedads_1 = propiedads; _i < propiedads_1.length; _i++) {
                var pro = propiedads_1[_i];
                this.agregarPropiedad(pro);
            }
        }
    };
    AgregarNuevaComponent.prototype.asociarPropiedades = function (isConfirmar) {
        var _this = this;
        if (isConfirmar === void 0) { isConfirmar = true; }
        this.hidden = false;
        if ((this.user.rut != null && this.user.rut !== undefined) || this.user.email) {
            var roles = [];
            var listaPropiedades_1 = [];
            var propiedadesComponent = this.propiedadComponentList.toArray();
            for (var _i = 0, propiedadesComponent_2 = propiedadesComponent; _i < propiedadesComponent_2.length; _i++) {
                var propiedadComponent = propiedadesComponent_2[_i];
                var rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
                if (rolesSeleccionados !== undefined) {
                    roles = roles.concat(rolesSeleccionados);
                    var propiedad = propiedadComponent.propiedad;
                    listaPropiedades_1.push(propiedad);
                }
            }
            if (roles.length > 0) {
                this.user.asociarRoles(roles.map(function (r) { return r.rol; })).then(function () {
                    for (var _i = 0, listaPropiedades_2 = listaPropiedades_1; _i < listaPropiedades_2.length; _i++) {
                        var propiedad = listaPropiedades_2[_i];
                        _this.contribuciones.addPropiedad(propiedad);
                    }
                    if (isConfirmar) {
                        _this.dialogConfirmarAgregarPropiedad();
                    }
                    else {
                        _this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
                    }
                }, function (err) {
                    _this.hidden = true;
                    console.error(err);
                    _this.error('Ocurrio un error al asociar los roles, intente más tarde');
                });
            }
            else {
                this.hidden = true;
            }
        }
        else {
            var propiedadesConRolesSeleccionados = this.getPropiedadesConRolesSeleccionados();
            for (var _a = 0, propiedadesConRolesSeleccionados_1 = propiedadesConRolesSeleccionados; _a < propiedadesConRolesSeleccionados_1.length; _a++) {
                var propiedad = propiedadesConRolesSeleccionados_1[_a];
                this.contribuciones.addPropiedad(propiedad);
            }
            if (isConfirmar) {
                this.dialogConfirmarAgregarPropiedad();
            }
            else {
                this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
            }
        }
    };
    AgregarNuevaComponent.prototype.getPropiedadesConRolesSeleccionados = function () {
        var listaPropiedades = [];
        var propiedadesComponent = this.propiedadComponentList.toArray();
        for (var _i = 0, propiedadesComponent_3 = propiedadesComponent; _i < propiedadesComponent_3.length; _i++) {
            var propiedadComponent = propiedadesComponent_3[_i];
            var rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
            if (rolesSeleccionados !== undefined) {
                var propiedad = propiedadComponent.propiedad;
                propiedad.roles = rolesSeleccionados;
                listaPropiedades.push(propiedad);
            }
        }
        return listaPropiedades;
    };
    AgregarNuevaComponent.prototype.volver = function () {
        var _this = this;
        if (this.cantidadSeleccionadas > 0) {
            var pDialog = this.dialogService.showCustomDialog({
                component: recordar_component_1.RecordarComponent,
                providers: [{ provide: recordar_component_1.CANT_PROPIEDADES_SELEC, useValue: this.cantidadSeleccionadas }],
                isModal: true
            });
            pDialog.subscribe(function (dialogReference) {
                dialogReference.onHide().subscribe(function (data) {
                    if (data !== undefined && data === 'agregar') {
                        _this.asociarPropiedades(false);
                    }
                });
            });
        }
        else {
            this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
        }
    };
    AgregarNuevaComponent.prototype.cargarDireccion = function (dire) {
        this.showButtonLimpiarBusqueda = true;
        var direcciones = [];
        direcciones.push(new Direccion_1.Direccion(dire));
        this.direcciones = direcciones;
        this.agregarDireccionesAPropiedad();
        this.onScroll();
    };
    AgregarNuevaComponent.prototype.handleSuccessCaptcha2 = function (token) {
        if (this.switchActive === 'direccion') {
            this.buscarDireccionPostRecaptcha(token, TipoRecaptcha_enum_1.TipoRecaptcha.V2);
        }
        else {
            this.buscarRolPost(token, TipoRecaptcha_enum_1.TipoRecaptcha.V2);
        }
        /*
    
        this.recaptchaService.validaRecaptcha(token, TipoRecaptcha.V2).then(value => {
          if (this.switchActive === 'direccion') {
            this.buscarDireccionPost();
          } else {
            this.buscarRolPost();
          }
    
        }).catch(reason => {
          this.error('Falló validación del ReCaptcha');
    
        });*/
    };
    AgregarNuevaComponent.prototype.executeCaptcha2 = function () {
        console.log('Ejecutando Recaptcha 2');
        this.offWait();
        this.captchaElem.execute();
    };
    AgregarNuevaComponent.prototype.resetCaptcha2 = function () {
        this.captchaElem.reloadCaptcha();
    };
    AgregarNuevaComponent.prototype.buscarRol = function () {
        this.showButtonLimpiarBusqueda = true;
        this.searchDireccion = false;
        this.validarCaptcha();
    };
    AgregarNuevaComponent.prototype.buscarDireccion = function () {
        this.showButtonLimpiarBusqueda = true;
        this.searchDireccion = false;
        this.validarCaptcha();
    };
    AgregarNuevaComponent.prototype.validarCaptcha = function () {
        var _this = this;
        this.resetCaptcha2();
        //this.captchaElem.reloadCaptcha();
        //this.captchaElem.resetCaptcha();
        this.onWait();
        this.scriptService.cleanup();
        this.reCaptchaV3Service.execute(this.recaptcha3.siteKey, this.recaptcha3.action, function (token) {
            if (_this.switchActive === 'direccion') {
                _this.buscarDireccionPostRecaptcha(token, TipoRecaptcha_enum_1.TipoRecaptcha.V3);
            }
            else {
                _this.buscarRolPost(token, TipoRecaptcha_enum_1.TipoRecaptcha.V3);
            }
        });
    };
    AgregarNuevaComponent.prototype.updateIconSeleccion = function () {
        if (this.selectAll === undefined) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.INDETERMINATE;
        }
        else if (this.selectAll) {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.SELECTED;
        }
        else {
            this.selectedIcon = CheckboxIcon_1.CheckboxIcon.UNSELECTED;
        }
    };
    AgregarNuevaComponent.prototype.selectAllProperies = function () {
        if (this.selectAll === undefined) {
            this.selectAll = false;
        }
        else {
            this.selectAll = !this.selectAll;
        }
        this.updateSelectionProperties();
        this.updateSeleccionadaTotal();
        this.updateIconSeleccion();
    };
    AgregarNuevaComponent.prototype.updateSelectionProperties = function () {
        var propiedadesList = this.propiedadComponentList.toArray();
        for (var _i = 0, propiedadesList_1 = propiedadesList; _i < propiedadesList_1.length; _i++) {
            var propiedades = propiedadesList_1[_i];
            propiedades.updateSeleccion(this.selectAll);
        }
    };
    AgregarNuevaComponent.prototype.limpiarBusquda = function () {
        this.showButtonLimpiarBusqueda = false;
        if (this.switchActive === 'direccion') {
            this.limpiarFiltroDireccion();
        }
        else {
            this.limpiarFiltroRol();
        }
    };
    AgregarNuevaComponent.prototype.limpiarFiltroRol = function () {
        this.formRol.reset();
        this.selectComuna.searchQuery = '';
    };
    AgregarNuevaComponent.prototype.limpiarFiltroDireccion = function () {
        this.formDireccion.reset();
        this.tipoPropiedad.setValue(-1);
        this.selectTipo.searchQuery = '';
    };
    AgregarNuevaComponent.prototype.existBusqueda = function () {
        var _this = this;
        setTimeout(function () {
            _this.searchDireccion = false;
        }, 200);
    };
    AgregarNuevaComponent.prototype.onScroll = function () {
        var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        var pos = scrollHeight - 340;
        setTimeout(function () {
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }, 200);
    };
    AgregarNuevaComponent.prototype.dialogConfirmarAgregarPropiedad = function () {
        this.propiedades = [];
        this.loadCantidadPropiedadesEnCarro();
        var pDialog = this.dialogService.showCustomDialog({
            component: dialog_agregar_propiedad_component_1.DialogAgregarPropiedadComponent,
            providers: [{ provide: dialog_agregar_propiedad_component_1.CANT_PROPIEDADES, useValue: this.cantidadSeleccionadas }],
            clickOutsideToClose: true,
            isModal: true
        });
        this.cantidadSeleccionadas = 0;
    };
    AgregarNuevaComponent.prototype.dialogAyudaDireccion = function () {
        var pDialog = this.dialogService.showCustomDialog({
            component: ayuda_direccion_component_1.AyudaDireccionComponent,
            clickOutsideToClose: true,
            isModal: true
        });
    };
    AgregarNuevaComponent.prototype.dialogAyudaRol = function () {
        var pDialog = this.dialogService.showCustomDialog({
            component: ayuda_rol_component_1.AyudaRolComponent,
            clickOutsideToClose: true,
            isModal: true
        });
    };
    AgregarNuevaComponent.prototype.dialogCorreo = function () {
        if (!this.user.email && this.user.solicitarEmail && this.dialogoRecuperarPropiedadesEmail) {
            var config = {
                component: asociar_correo_component_1.AsociarCorreoComponent,
                isModal: true,
                clickOutsideToClose: true
            };
            var pDialog = this.dialogService.showCustomDialog(config);
            /*pDialog.subscribe((dialogReference: MdlDialogReference) => {
              dialogReference.onHide().subscribe(
                () => this.bottomToolbarHidden = false
              );
            });*/
        }
    };
    AgregarNuevaComponent.prototype.autoScrollBuscar = function () {
        window.scrollTo({ top: 220, behavior: 'smooth' });
    };
    AgregarNuevaComponent.prototype.cargarMasDirecciones = function () {
        this.page++;
        this.agregarDireccionesAPropiedad();
    };
    AgregarNuevaComponent.prototype.orderDirecciones = function (lista) {
        if (lista !== null) {
            return lista.sort(function (a, b) {
                var rolA = pit_utils_1.PitUtils.calcularRol(a.rol, a.subrol, a.idComunaSii);
                var rolB = pit_utils_1.PitUtils.calcularRol(b.rol, b.subrol, b.idComunaSii);
                return rolA - rolB;
            });
        }
        return lista;
    };
    AgregarNuevaComponent.prototype.mostrarPaginacion = function () {
        if (this.direcciones != null) {
            var cantidad = this.paginacion * this.page;
            return cantidad < this.direcciones.length;
        }
        return false;
    };
    AgregarNuevaComponent.prototype.mostrarFinPaginacion = function () {
        if (this.direcciones != null) {
            var cantidad = this.paginacion * this.page;
            return cantidad >= this.direcciones.length;
        }
        return false;
    };
    AgregarNuevaComponent.prototype.upPage = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    __decorate([
        core_1.ViewChildren(propiedad_component_1.PropiedadComponent)
    ], AgregarNuevaComponent.prototype, "propiedadComponentList");
    __decorate([
        core_1.ViewChild('captchaElem')
    ], AgregarNuevaComponent.prototype, "captchaElem");
    __decorate([
        core_1.ViewChild('autocompleteSelectComuna')
    ], AgregarNuevaComponent.prototype, "selectComuna");
    __decorate([
        core_1.ViewChild('autocompleteSelectTipoPropiedades')
    ], AgregarNuevaComponent.prototype, "selectTipo");
    AgregarNuevaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-nueva',
            templateUrl: './agregar-nueva.component.html',
            styleUrls: ['./agregar-nueva.component.scss']
        })
    ], AgregarNuevaComponent);
    return AgregarNuevaComponent;
}());
exports.AgregarNuevaComponent = AgregarNuevaComponent;
