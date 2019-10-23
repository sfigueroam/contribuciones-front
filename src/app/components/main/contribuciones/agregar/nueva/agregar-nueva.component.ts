import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ContribucionesBuscarRolService} from '../../../../../services/contribuciones-buscar-rol.service';
import {Localidad} from '../../../../../domain/Localidad';
import {MdlDialogReference, MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Propiedad} from '../../../../../domain/Propiedad';
import {TipoPropiedad} from '../../../../../domain/TipoPropiedad';
import {Direccion} from '../../../../../domain/Direccion';
import {environment} from '../../../../../../environments/environment';
import {PropiedadComponent} from '../../../shared/propiedad/propiedad.component';
import {Rol} from '../../../../../domain/Rol';
import {UserService} from '../../../../../services/user.service';
import {Router} from '@angular/router';
import {ContribucionesService} from '../../../../../services/contribuciones.service';
import {AsociarCorreoComponent} from '../../../../dialogs/asociar-correo/asociar-correo.component';
import {InvisibleReCaptchaComponent, ReCaptchaV3Service, ScriptService} from 'ngx-captcha';
import {TgrReCaptcha} from '../../../../../domain/TgrReCaptcha';
import {RecaptchaService} from '../../../../../services/recaptcha.service';
import {TipoRecaptcha} from '../../../../../enum/TipoRecaptcha.enum';
import {MdlSelectComponent} from '@angular-mdl/select';
import {DeviceDetectService} from '../../../../../services/device-detect.service';
import {CheckboxIcon} from '../../../../../domain/CheckboxIcon';
import {CANT_PROPIEDADES, DialogAgregarPropiedadComponent} from './modal/dialog-agregar-propiedad/dialog-agregar-propiedad.component';
import {AyudaDireccionComponent} from './modal/ayuda-direccion/ayuda-direccion.component';
import {AyudaRolComponent} from './modal/ayuda-rol/ayuda-rol.component';
import {CANT_PROPIEDADES_SELEC, RecordarComponent} from './modal/recordar/recordar.component';
import {PitUtils} from '../../../../../pit-utils';
//Probando logeo
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-agregar-nueva',
  templateUrl: './agregar-nueva.component.html',
  styleUrls: ['./agregar-nueva.component.scss']
})
export class AgregarNuevaComponent implements OnInit, AfterViewInit {

  @ViewChildren(PropiedadComponent)
  propiedadComponentList: QueryList<PropiedadComponent>;

  /*  @ViewChild('scrollDireccion') scrollDireccion: ElementRef;
    @ViewChild('scrollRol') scrollRol: ElementRef;*/

//Probando logeo
  logged: boolean;
  
  wait = false;
  sinResultado = false;
  searchDireccion = false;

  localidad: Localidad[];
  tipoPropiedadesfrecuentes: TipoPropiedad[];
  tipoPropiedades: TipoPropiedad[];
  direcciones: Direccion[];
  direccionModel: string;

  formRol: FormGroup;
  formDireccion: FormGroup;

  comuna: FormControl;
  rol: FormControl;
  subRol: FormControl;

  tipoPropiedad: FormControl;
  direccion: FormControl;

  propiedades: Propiedad[];
  switchActive = 'rol';
  busquedaEnEjecucion = false;

  cantidadSeleccionadas: number;
  hidden: boolean;
  resultadoSinPropiedades = 0;

  inputDireccionesTmp = '';

  bottomToolbarHidden: boolean;
  footerHidden = false;

  dialogoRecuperarPropiedadesEmail: boolean;
  viewRecaptcha2: boolean;
  countPropiedades: number;

  selectAll: boolean;
  selectedIcon: string;

  page = 1;
  paginacion: number;


  @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent;
  recaptcha2: TgrReCaptcha;
  recaptcha3: TgrReCaptcha;


  @ViewChild('autocompleteSelectComuna') selectComuna: MdlSelectComponent;
  @ViewChild('autocompleteSelectTipoPropiedades') selectTipo: MdlSelectComponent;

  public recaptcha: any = null;
  private totalRoles = 0;
  showButtonLimpiarBusquedaRol = false;
  showButtonLimpiarBusquedaDir = false;
  provider: any;


  constructor(private contribucionesBuscarRol: ContribucionesBuscarRolService,
              private mdlSnackbarService: MdlSnackbarService,
              private user: UserService,
              private router: Router,
              private contribuciones: ContribucionesService,
              private dialogService: MdlDialogService,
              private reCaptchaV3Service: ReCaptchaV3Service,
              private scriptService: ScriptService,
              private deviceDetectService: DeviceDetectService,
              private recaptchaService: RecaptchaService,
              private cookieService: CookieService) {

    this.recaptcha2 = new TgrReCaptcha();
    this.viewRecaptcha2 = false;
    this.recaptcha3 = new TgrReCaptcha();

    this.recaptcha2.siteKey = environment.recaptcha.v2.key;
    this.recaptcha3.siteKey = environment.recaptcha.v3.key;
    this.recaptcha3.action = 'buscar';


    this.comuna = new FormControl('', Validators.required);
    this.rol = new FormControl('', Validators.required);
    this.subRol = new FormControl('', Validators.required);
    this.formRol = new FormGroup({
      comuna: this.comuna,
      rol: this.rol,
      subRol: this.subRol
    });

    this.cantidadSeleccionadas = 0;

    this.tipoPropiedad = new FormControl('');

    const validatorsDireccion = Validators.compose([
      Validators.minLength(3),
      Validators.required
    ]);
    this.direccion = new FormControl('', validatorsDireccion);

    this.formDireccion = new FormGroup({
      tipoPropiedad: this.tipoPropiedad,
      direccion: this.direccion
    });

    this.tipoPropiedad.setValue(-1);

    this.hidden = true;

    this.bottomToolbarHidden = !this.user.email && this.user.solicitarEmail;

    this.selectAll = false;
    this.paginacion = environment.paginacion;
    this.updateIconSeleccion();

  }


  ocultarToolbar(): void {
    this.bottomToolbarHidden = true;
    this.ocultarFooter();
  }

  mostrarToolbar(): void {
    this.bottomToolbarHidden = false;
    this.mostrarFooter();
  }

  mostrarFooter(): void {
    this.footerHidden = false;
    console.log("device " || this.deviceDetectService);
  }

  ocultarFooter(): void {
    if (!this.deviceDetectService.isDeviceDesktop()) {
      this.footerHidden = true;
    }

  }

  updateSeleccionadaTotal(): void {
    this.totalSeleccionadas();
    if (this.cantidadSeleccionadas === 0) {
      this.selectAll = false;
    } else if (this.totalRoles === this.cantidadSeleccionadas) {
      this.selectAll = true;
    } else if (this.totalRoles !== this.cantidadSeleccionadas) {
      this.selectAll = undefined;
    }
    this.updateIconSeleccion();

  }

  totalSeleccionadas(): void {
    this.cantidadSeleccionadas = 0;
    this.totalRoles = 0;
    const propiedadesComponent = this.propiedadComponentList.toArray();
    for (const propedadComponent of propiedadesComponent) {
      this.cantidadSeleccionadas = this.cantidadSeleccionadas + propedadComponent.getCantidadRolesSeleccionadas();
      this.totalRoles = this.totalRoles + propedadComponent.getCantRoles();
    }
  }

  ngAfterViewInit(): void {
    /*  setTimeout(
        () => {
          this.dialogCorreo();
        },
        200);*/
  }

  ngOnInit() {
    //valida que no se encuentre logueado
    /*this.provider = this.cookieService.get("providerCookie");
    console.log("provider en login2: ");
    console.log(this.provider);
    if (this.provider != "") {
      this.cookieService.delete("providerCookie");
    } */

    //Probando logeo
    this.logged = this.user.isLogged();

    this.dialogoRecuperarPropiedadesEmail = environment.dialogoRecuperarPropiedadesEmail;

    this.contribucionesBuscarRol.getComunas().then((data) => {
      this.localidad = data;
    }, () => {
      this.error('Ocurrió un error al obtener las comunas');
    });

    this.contribucionesBuscarRol.getTiposPropiedades().then((data) => {
      this.tipoPropiedadesfrecuentes = [];
      this.tipoPropiedades = [];
      for (const prop of data) {
        if (prop.id === 'H' || prop.id === 'L' || prop.id === 'Z') {
          prop.order = environment.frecuentesOrder[prop.id];
          this.tipoPropiedadesfrecuentes.push(prop);
        } else {
          this.tipoPropiedades.push(prop);
        }
      }
    }, () => {
      this.error('Ocurrió un error al obtener los tipos de propiedades');
    });


    this.loadCantidadPropiedadesEnCarro();

    const domSelectComuna = this.selectComuna.selectInput.nativeElement as HTMLElement;
    domSelectComuna.addEventListener('focus', () => this.ocultarFooter());
    domSelectComuna.addEventListener('blur', () => this.mostrarFooter());

    domSelectComuna.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });


    const domSelectTipo = this.selectTipo.selectInput.nativeElement as HTMLElement;
    domSelectTipo.addEventListener('focus', () => this.ocultarFooter());
    domSelectTipo.addEventListener('blur', () => this.mostrarFooter());


  }

  loadCantidadPropiedadesEnCarro(): void {
    this.countPropiedades = this.contribuciones.getCountPropiedad();
  }

  buscarRolPost(tokenCaptcha: string, tipo: TipoRecaptcha): void {
    this.onWait();
    this.contribucionesBuscarRol.searchRolesForIds(this.comuna.value, this.rol.value, this.subRol.value, tokenCaptcha, tipo).then((response) => {
      if (response === null) {
        this.sinResultado = true;
      } else {
        this.agregarPropiedad(response);
        this.onScroll();
      }
      this.offWait();
    }, () => {

      if (tipo === TipoRecaptcha.V3) {
        this.executeCaptcha2();
      } else {
        this.error('Ocurrió un error al buscar direcciones');
        this.offWait();
      }
    });
  }

  buscarDireccionSugeridos() {
    if (this.direccion.value === '' || this.direccion.value === null) {
      return;
    }
    this.inputDireccionesTmp = this.direccion.value;
    const size = environment.sizeResultSuggested;

    let tipoPropiedad = this.tipoPropiedad.value;
    if (tipoPropiedad === -1) {
      tipoPropiedad = '';
    }
  
    this.contribucionesBuscarRol.searchDireccion(undefined,
      tipoPropiedad,
      this.direccion.value,
      size, false, null, null).then((lista) => {
        
        this.direcciones = lista;

        //if(this.direcciones == null || this.direcciones == undefined){ //cambio de victor Tomé
        //    this.sinResultado= true;}

      },
      err => {
        this.error(err);
      });
    
  }

  onWait(): void {
    this.sinResultado = false;
    this.wait = true;
  }

  offWait(): void {
    this.wait = false;
  }

  changeSwith(active: string) {
    this.switchActive = active;
  }

  inputDirecciones(event: any) {
    const inp = String.fromCharCode(event.keyCode);
    if (this.direcciones == null) {
      this.inputDireccionesTmp = '';
    }
    if (this.direccion.value != null && this.direccion.value.length <= 2) {
      this.direcciones = null;
      this.inputDireccionesTmp = '';
      this.sinResultado = false; //Agregado para sacar el mensaje cuando se borra (Victor)
    } else if (event.keyCode === 13) {
      this.searchDireccion = false;
      //this.sinResultado = true;
    } else if (/[a-zA-Z0-9-_ ]/.test(inp) || event.keyCode === 8 || this.direccion.value !== this.inputDireccionesTmp) {
      this.searchDireccion = true;
      if (this.direccion.value != null && this.direccion.value.length > 2) {
        if (!this.busquedaEnEjecucion) {
          this.busquedaEnEjecucion = true;
          setTimeout(
            () => {
              this.buscarDireccionSugeridos();
              this.busquedaEnEjecucion = false;
              //this.sinResultado = false; se elimina mensaje de resultado antes de presionar boton buscar
            },
            800);
        }
      }
    }
  }

  private agregarPropiedad(response: Propiedad) {
    if (this.propiedades === undefined || this.propiedades == null) {
      this.propiedades = [];
    }
    let estado = false;
    for (const prop of this.propiedades) {
      if (prop.idDireccion === response.idDireccion) {
        estado = true;
        for (const rol of response.roles) {
          if (!prop.existRol(rol.rol)) {
            prop.addRol(new Rol(rol));
          }
        }
      }
    }

    if (!estado) {
      this.propiedades.push(response);
    }
  }

  private error(msg: string) {
    this.mdlSnackbarService.showSnackbar({
      message: msg,
      timeout: environment.snackbarTime,
      action: {
        handler: () => {
        },
        text: 'ok'
      }
    });
  }

  buscarDireccionPostRecaptcha(tokenCaptcha: string, tipo: TipoRecaptcha) {
    if (this.direccion.value === '' || this.direccion.value === null) {
      return;
    }
    this.onWait();
    this.searchDireccion = false;
    const size = environment.sizeResultPage;
    let tipoPropiedad = this.tipoPropiedad.value;
    if (tipoPropiedad === -1) {
      tipoPropiedad = '';
    }
    this.contribucionesBuscarRol.searchDireccion(undefined,
      tipoPropiedad,
      this.direccion.value,
      size, true, tokenCaptcha, tipo).then((lista) => {

        lista = this.orderDirecciones(lista);
        this.direcciones = lista;
        if(this.direcciones == null || this.direcciones == undefined){
          this.sinResultado=true;}
        this.page = 1;
        this.agregarDireccionesAPropiedad();
        this.offWait();
        this.resetCaptcha2();
        this.onScroll();

      },
      () => {

        if (tipo === TipoRecaptcha.V3) {
          this.executeCaptcha2();
        } else {
          this.resetCaptcha2();
          this.error('Ocurrió un error al buscar direcciones');
          this.offWait();
        }
      });
  }

  autoCompletarPropiedad() {
    this.buscarDireccionSugeridos();
  }

  agregarDireccionesAPropiedad(): void {
    const propiedads = this.contribucionesBuscarRol.direccionToPropiedad(this.direcciones, this.page);
    if (propiedads) {
      for (const pro of propiedads) {
        this.agregarPropiedad(pro);
      }
    }

  }

  asociarPropiedades(isConfirmar: boolean = true) {
    this.hidden = false;

    if ((this.user.rut != null && this.user.rut !== undefined) || this.user.email) {
      let roles: Rol[] = [];

      const listaPropiedades = [];
      const propiedadesComponent = this.propiedadComponentList.toArray();
      for (const propiedadComponent of propiedadesComponent) {
        const rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
        if (rolesSeleccionados !== undefined) {
          roles = roles.concat(rolesSeleccionados);
          const propiedad = propiedadComponent.propiedad;
          listaPropiedades.push(propiedad);
        }
      }

      if (roles.length > 0) {
        this.user.asociarRoles(roles.map(r => r.rol)).then(() => {
            for (const propiedad of listaPropiedades) {
              this.contribuciones.addPropiedad(propiedad);
            }
            if (isConfirmar) {
              this.dialogConfirmarAgregarPropiedad();
            } else {
              this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
            }

          },
          err => {
            this.hidden = true;
            console.error(err);
            this.error('Ocurrio un error al asociar los roles, intente más tarde');
          });
      } else {
        this.hidden = true;
      }
    } else {
      const propiedadesConRolesSeleccionados = this.getPropiedadesConRolesSeleccionados();

      for (const propiedad of propiedadesConRolesSeleccionados) {
        this.contribuciones.addPropiedad(propiedad);
      }
      if (isConfirmar) {
        this.dialogConfirmarAgregarPropiedad();
      } else {
        this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
      }
    }
  }

  private getPropiedadesConRolesSeleccionados(): Propiedad[] {
    const listaPropiedades = [];
    const propiedadesComponent = this.propiedadComponentList.toArray();
    for (const propiedadComponent of propiedadesComponent) {
      const rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
      if (rolesSeleccionados !== undefined) {
        const propiedad = propiedadComponent.propiedad;
        propiedad.roles = rolesSeleccionados;
        listaPropiedades.push(propiedad);
      }
    }
    return listaPropiedades;
  }

  volver() {
    if (this.cantidadSeleccionadas > 0) {
      const pDialog = this.dialogService.showCustomDialog({
        component: RecordarComponent,
        providers: [{provide: CANT_PROPIEDADES_SELEC, useValue: this.cantidadSeleccionadas}],
        isModal: true
      });
      pDialog.subscribe((dialogReference: MdlDialogReference) => {
        dialogReference.onHide().subscribe(
          data => {
            if (data !== undefined && data === 'agregar') {
              this.asociarPropiedades(false);
            }
          }
        );
      });
    } else {
      this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
    }
  }

  cargarDireccion(dire) {
    this.showButtonLimpiarBusquedaDir = true;
    const direcciones = [];
    direcciones.push(new Direccion(dire));
    this.direcciones = direcciones;
    this.agregarDireccionesAPropiedad();
    this.onScroll();
  }


  handleSuccessCaptcha2(token): void {
    if (this.switchActive === 'direccion') {
      this.buscarDireccionPostRecaptcha(token, TipoRecaptcha.V2);
    } else {
      this.buscarRolPost(token, TipoRecaptcha.V2);
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
  }

  executeCaptcha2(): void {
    console.log('Ejecutando Recaptcha 2');
    this.offWait();
    this.captchaElem.execute();
  }

  resetCaptcha2(): void {
    this.captchaElem.reloadCaptcha();
  }

  buscarRol() {
    this.showButtonLimpiarBusquedaRol = true;
    this.searchDireccion = false;
    this.validarCaptcha();
  }

  buscarDireccion() {
    this.showButtonLimpiarBusquedaDir = true;
    this.searchDireccion = false;
    this.validarCaptcha();
  }

  validarCaptcha(): void {
    this.resetCaptcha2();
    //this.captchaElem.reloadCaptcha();
    //this.captchaElem.resetCaptcha();
    this.onWait();
    this.scriptService.cleanup();
    this.reCaptchaV3Service.execute(this.recaptcha3.siteKey, this.recaptcha3.action, (token) => {

      if (this.switchActive === 'direccion') {
        this.buscarDireccionPostRecaptcha(token, TipoRecaptcha.V3);
      } else {
        this.buscarRolPost(token, TipoRecaptcha.V3);
      }
    });
  }

  private updateIconSeleccion(): void {
    if (this.selectAll === undefined) {
      this.selectedIcon = CheckboxIcon.INDETERMINATE;
    } else if (this.selectAll) {
      this.selectedIcon = CheckboxIcon.SELECTED;
    } else {
      this.selectedIcon = CheckboxIcon.UNSELECTED;
    }
  }

  private selectAllProperies() {
    if (this.selectAll === undefined) {
      this.selectAll = false;
    } else {
      this.selectAll = !this.selectAll;
    }
    this.updateSelectionProperties();
    this.updateSeleccionadaTotal();
    this.updateIconSeleccion();


  }

  private updateSelectionProperties() {
    const propiedadesList = this.propiedadComponentList.toArray();
    for (const propiedades of propiedadesList) {
      propiedades.updateSeleccion(this.selectAll);
    }
  }

  limpiarBusqudaDir() {
    this.showButtonLimpiarBusquedaDir = false;
    this.limpiarFiltroDireccion();
  }
 limpiarBusqudaRol() {
    this.showButtonLimpiarBusquedaRol = false;
    this.limpiarFiltroRol();
  }

  limpiarFiltroRol() {
    this.formRol.reset();
    this.selectComuna.searchQuery = '';
    this.sinResultado = false;
  }

  limpiarFiltroDireccion() {
    this.formDireccion.reset();
    this.tipoPropiedad.setValue(-1);
    this.sinResultado = false;
    this.selectTipo.searchQuery = '';
  }

  existBusqueda() {
    setTimeout(
      () => {
        this.searchDireccion = false;
      },
      200
    );
  }

  onScroll() {


    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    const pos = scrollHeight - 340;
    setTimeout(
      () => {
        window.scrollTo({top: pos, behavior: 'smooth'});
      },
      200
    );

  }

  dialogConfirmarAgregarPropiedad(): void {
    this.propiedades = [];
    this.loadCantidadPropiedadesEnCarro();
    const pDialog = this.dialogService.showCustomDialog({
      component: DialogAgregarPropiedadComponent,
      providers: [{provide: CANT_PROPIEDADES, useValue: this.cantidadSeleccionadas}],
      clickOutsideToClose: true,
      isModal: true
    });
    this.cantidadSeleccionadas = 0;
  }

  dialogAyudaDireccion(): void {
    const pDialog = this.dialogService.showCustomDialog({
      component: AyudaDireccionComponent,
      clickOutsideToClose: true,
      isModal: true
    });
  }

  dialogAyudaRol(): void {
    const pDialog = this.dialogService.showCustomDialog({
      component: AyudaRolComponent,
      clickOutsideToClose: true,
      isModal: true
    });
  }

  dialogCorreo(): void {

    if (!this.user.email && this.user.solicitarEmail && this.dialogoRecuperarPropiedadesEmail) {
      const config = {
        component: AsociarCorreoComponent,
        isModal: true,
        clickOutsideToClose: true
      };

      const pDialog = this.dialogService.showCustomDialog(config);
      /*pDialog.subscribe((dialogReference: MdlDialogReference) => {
        dialogReference.onHide().subscribe(
          () => this.bottomToolbarHidden = false
        );
      });*/
    }

  }

  autoScrollBuscar() {
    window.scrollTo({top: 220, behavior: 'smooth'});
  }

  cargarMasDirecciones() {
    this.page++;
    this.agregarDireccionesAPropiedad();
  }

  private orderDirecciones(lista: Direccion[]) {
    if (lista !== null) {
      return lista.sort((a, b) => {
        const rolA = PitUtils.calcularRol(a.rol, a.subrol, a.idComunaSii);
        const rolB = PitUtils.calcularRol(b.rol, b.subrol, b.idComunaSii);
        return rolA - rolB;
      });
    }
    return lista;
  }

  mostrarPaginacion(): boolean {
    if (this.direcciones != null) {
      const cantidad = this.paginacion * this.page;
      return cantidad < this.direcciones.length;
    }
    return false;
  }

  mostrarFinPaginacion(): boolean {
    if (this.direcciones != null) {
      const cantidad = this.paginacion * this.page;
      return cantidad >= this.direcciones.length;
    }
    return false;
  }

  upPage(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}