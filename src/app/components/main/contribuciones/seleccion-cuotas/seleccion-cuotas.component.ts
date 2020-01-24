import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {Propiedad} from '../../../../domain/Propiedad';
import {Cuota} from '../../../../domain/Cuota';
import {ContribucionesService} from '../../../../services/contribuciones.service';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {ResumenCuotas} from '../../../../domain/ResumenCuotas';
import {UserService} from '../../../../services/user.service';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {DeviceDetectService} from '../../../../services/device-detect.service';
import {AyudaCondonacionComponent} from './modal/ayuda-condonacion/ayuda-condonacion.component';
import {ModalCuotaAnualComponent} from './modal/modal-cuota-anual/modal-cuota-anual.component';
import {
  MULTI_AR_CODIGOS,
  CODIGO_LIST_PROPIEDADES,
  CONDONACION_PROPIEDADES,
  EXISTE_VENCIDAS,
  LIST_PROPIEDADES,
  ResumenComponent,
  TOTAL_PROPIEDADES
} from './modal/resumen/resumen.component';
import {CheckboxIcon} from '../../../../domain/CheckboxIcon';
import {DireccionCuotasComponent} from './direccion-cuotas/direccion-cuotas.component';
import {TooltipDirective} from 'ng2-tooltip-directive';
import { CookieService } from 'ngx-cookie-service';
import {UserDataService} from '../../../../user-data.service';

@Component({
  selector: 'app-seleccion-cuotas',
  templateUrl: './seleccion-cuotas.component.html',
  styleUrls: ['./seleccion-cuotas.component.scss']
})
export class SeleccionCuotasComponent implements OnInit, AfterViewInit {

  @ViewChildren(DireccionCuotasComponent)
  direccionCuotasComponentList: QueryList<DireccionCuotasComponent>;

  propiedades: Propiedad[] = [];
  cuota: Cuota[] = [];
  //javier
  noLiqVar: string;


  tipo = TipoCuota;
  seleccionada: TipoCuota = this.tipo.TODAS;
  cantidadSeleccionadas: number;

  selectTipo: TipoCuota = this.tipo.TODAS;

  total: number;
  condonacion: number;
  complete: boolean;

  rolesSugeridos = 0;
  ocultarAlertaSugeridas = false;

  listaContribuciones: string;

  urlPagoTgr: string;

  existeVencidas = false;
  existeSoloVencidas = false;
  showVencidasPorRoles = false;
  obteniendoDatos = false;


  selectedIcon: string;

  result: ResumenCuotas;
  someTooltip: any;
  
  // prueba de dispositivo
  mobile: boolean;
  desktop: boolean;
  reg: string;
  canal: string;
  providerConex: string;
  multiARString2: string;
  cidUnico: string;
  
  // JMS: Modal ayuda info de cuota anual
  modalCuotaAnualVar: boolean = false;
  
  // JMS: arrglo de multiAR
  // multiARObj = {listaCid:[{idMoneda:0,codigoBarra:'',montoTotal:0}],usuario:'',montoTotalPagar:''}; 
  
  @ViewChildren(TooltipDirective) tooltipDirective;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private user: UserService,
              private contribuciones: ContribucionesService,
              private sugeridas: ContribucionesSugeridasService,
              private mdlSnackbarService: MdlSnackbarService,
              private deviceDetectService: DeviceDetectService,
              private dialogService: MdlDialogService,
              private cookieService: CookieService,
              private userdataservice: UserDataService) {
    this.route.queryParams.subscribe(val => {
      if (val.refresh !== undefined && val.refresh === 'true' && this.complete !== undefined) {
        if (this.user.email !== undefined) {
          this.ngOnInit();
        }
      }
    });
  }

  ngAfterViewInit() {
  }

  openHelp() {
    if (this.user.isFirst && environment.viewTooltip) {
      setTimeout(
        () => {
          if (this.propiedades.length > 0) {
            this.showHelp();
          }
        },
        300
      );
    }
  }

  ngOnInit() {
    // prueba de deteccion de dispositivo
    this.canal = '';
    this.reg = '';
    this.providerConex = this.cookieService.get("providerCookie")
      if (this.providerConex == "") {
        console.log(this.reg);
        this.reg = 'SC';
      }
      if (this.providerConex == "ClaveTesoreria"){
        console.log(this.reg);
        this.reg = 'CT';
      }
      if (this.providerConex == "ClaveUnica"){
        console.log(this.reg);
        this.reg = 'CU';
      }
    
      if (this.deviceDetectService.device.mobile){
        console.log("mobile");
        this.canal = '30M' + this.reg; 
      }
      if (this.deviceDetectService.device.tablet){
        console.log("tablet");
        this.canal = '30T' + this.reg; 
      }
      if (this.deviceDetectService.device.smartTv){
        console.log("smarttv");
        this.canal = '30S' + this.reg;
      }
      if (this.deviceDetectService.device.desktop){
        console.log("desktop");
        this.canal = '30D' + this.reg;
      }
      console.log(this.canal);
      console.log(this.providerConex);
      this.userdataservice.canal = this.canal;

    console.log('ngOnInit', this.complete);

    this.complete = false;
    this.seleccionada = TipoCuota.TODAS;
    this.urlPagoTgr = environment.pago.url;
    if (this.user.email) {
      this.obteniendoDatos = true;
    }

    this.user.getRolesNoAsociados().then(
      (props: Propiedad[]) => {
        this.rolesSugeridos = 0;
        for (const p of props) {
          this.rolesSugeridos += p.roles.length;
        }
      },
      (err) => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles sugeridos', environment.snackbarTime);
      }
    );

    this.user.getBienesRaices().then(
      (propiedades) => {
        this.propiedades = propiedades;
        console.log("propiedades", propiedades);
        this.openHelp();
        
        this.contribuciones.cargaRoles().then(
          () => {
            // console.log(propiedades);
            
            this.complete = true;
            this.abrirPrimerRol();
            this.calcularTotal();
            this.obteniendoDatos = false;
            for (const p of this.propiedades) {
              p.changeStream.subscribe(
                () => {
                  this.calcularTotal();
                }
              );
            }
          },
          err => {
            this.obteniendoDatos = false;
            console.log(err);
            this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles', environment.snackbarTime);
          }
        );
      },
      err => {
        console.log(err);
        this.obteniendoDatos = false;
        this.mdlSnackbarService.showToast('Ocurrió un error al cargar las propiedades', environment.snackbarTime);
      }
    );

  }
  

  private calcularTotal() {
    let multiARObj = {listaCid:[{idMoneda:0,codigoBarra:'',montoTotal:0}],usuario:'',montoTotalPagar:''}; 
    let multiARString;
    let total = 0;
    let totalCuoton = 0;
    let condonacion = 0;
    let esCuotonBool = false;
    for (const p of this.propiedades) {
      total += p.total;
      condonacion += p.condonacion;
    }
    this.total = total;
    this.condonacion = condonacion;
    this.recalcularTipo();

    let codigos = 'on, ';

    for (const p of this.propiedades) {
      for (const r of p.roles) {
        for (const c of r.cuotas) {
          // if (c.cuoton4){
          //   this.modalCuotaAnualVar = true;
          // }
          if (c.intencionPago) {
            if (r.condonacion > 0) {
              codigos += c.liqTotal.codigoBarraTotal + ', ';
              multiARObj.listaCid.push({idMoneda:0, codigoBarra:c.liqTotal.codigoBarraTotal, montoTotal:c.liqTotal.montoTotalTotal});
            } else {
              codigos += c.liqTotal.codigoBarraParcial + ', ';
              multiARObj.listaCid.push({idMoneda:0, codigoBarra:c.liqTotal.codigoBarraParcial, montoTotal:c.liqTotal.montoTotalParcial});
            }
          }
        }
      }
    }
    this.listaContribuciones = codigos;
    multiARObj.listaCid.splice(0, 1);
    multiARObj.usuario = this.canal;
    multiARObj.montoTotalPagar = total.toString();
    multiARString = JSON.stringify(multiARObj);
    // console.log(multiARString);
    this.userdataservice.multiAR_Cid = multiARString;
    // if (this.modalCuotaAnualVar){
    //   this.abreModalCuotaAnual();
    // }
  }

  gotoSugeridas() {
    this.router.navigate(['/main/contribuciones/agregar/sugeridas']);
  }

  onChange() {
    this.recalcularTipo();
  }

  seleccionar(tipo: TipoCuota): void {
    for (const propiedad of this.propiedades) {
      propiedad.seleccionar(tipo);
    }
    this.recalcularTipo();
  }

  private recalcularTipo() {
    const resultados = new ResumenCuotas();
    for (const propiedad of this.propiedades) {
      const resumen = propiedad.resumen();
      resultados.total += resumen.total;
      resultados.seleccionadas += resumen.seleccionadas;
      resultados.vencidas += resumen.vencidas;
      resultados.vencidasSeleccionadas += resumen.vencidasSeleccionadas;

      resultados.vencidasRoles += resumen.vencidasRoles;
      resultados.vencidasSeleccionadasRoles += resumen.vencidasSeleccionadasRoles;
    }
    this.seleccionada = resultados.tipo();
    this.cantidadSeleccionadas = resultados.seleccionadas;
    this.existeVencidas = resultados.vencidas > 0;
    this.existeSoloVencidas = resultados.vencidas === resultados.total;

    this.showVencidasPorRoles = +resultados.vencidasRoles > +resultados.vencidasSeleccionadasRoles;
    this.result = resultados;

    this.updateIconSeleccion(resultados);
  }

  dialogAyudaCondonacion(): void {
    const pDialog = this.dialogService.showCustomDialog({
      component: AyudaCondonacionComponent,
      clickOutsideToClose: true,
      isModal: true
    });
  }

  //Todo pendiente termianar
  private updateIconSeleccion(result: ResumenCuotas): void {
    if (result.tipo() === undefined) {
      this.selectedIcon = CheckboxIcon.INDETERMINATE;
    } else if (result.tipo() === TipoCuota.TODAS) {
      this.selectedIcon = CheckboxIcon.SELECTED;
    } else {
      this.selectedIcon = CheckboxIcon.UNSELECTED;
    }
  }

  public openDialogResumen() {
    const pDialog = this.dialogService.showCustomDialog({
      component: ResumenComponent,
      clickOutsideToClose: true,
      providers: [
        {provide: LIST_PROPIEDADES, useValue: this.propiedades},
        {provide: MULTI_AR_CODIGOS, useValue: this.multiARString2},
        {provide: CODIGO_LIST_PROPIEDADES, useValue: this.listaContribuciones},
        {provide: TOTAL_PROPIEDADES, useValue: this.total},
        {provide: CONDONACION_PROPIEDADES, useValue: this.condonacion},
        {provide: EXISTE_VENCIDAS, useValue: this.existeVencidas}
      ],
      classes: 'dialogo-resumen-deudas',
      isModal: true
    });
  }

  seleccionarTodas() {
    if (this.selectedIcon === CheckboxIcon.INDETERMINATE || this.selectedIcon === CheckboxIcon.UNSELECTED) {
      this.seleccionar(TipoCuota.TODAS);
    } else {
      this.seleccionar(TipoCuota.NINGUNA);
    }
  }

  seleccionarTodasVencidas() {
    if (this.selectedIcon === CheckboxIcon.INDETERMINATE || this.selectedIcon === CheckboxIcon.UNSELECTED) {
      this.seleccionar(TipoCuota.TODAS);
    } else {
      this.seleccionar(TipoCuota.NO_VENCIDAS);
    }
  }

  abrirPrimerRol(): void {
    const direccionCuotasList = this.direccionCuotasComponentList.toArray();
    if (direccionCuotasList !== undefined && direccionCuotasList.length > 0) {
      direccionCuotasList[0].abrirPrimerRol();
    }
  }

  abreModalCuotaAnual(): void{
    for (const propiedad of this.propiedades){
      for (const rol of propiedad.roles){
        for (const cuota of rol.cuotas){
          if (cuota.cuoton4){
            this.modalCuotaAnualVar = true;
          }
        }
      }
    }
    if (this.modalCuotaAnualVar){
      const pDialog = this.dialogService.showCustomDialog({
        component: ModalCuotaAnualComponent,
        clickOutsideToClose: true,
        isModal: true
      });
    }
  }
  
  private showHelp() {
    const direccionCuotasList = this.direccionCuotasComponentList.toArray();
    if (direccionCuotasList !== undefined && direccionCuotasList.length > 0) {
      console.log('direccionCuotasList[0].showHelp();');
      direccionCuotasList[0].showHelp();
    }
    this.someTooltip = this.tooltipDirective.find(elem => elem.id === 'helpTooltip-buttonAdd');
    this.someTooltip.show();
    this.user.isFirst = false;
    setTimeout(
      () => {
        this.someTooltip.hide();
      },
      environment.tooltipTime
    );
  }
}
