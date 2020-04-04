import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren, Inject, InjectionToken} from '@angular/core';
import {Propiedad} from '../../../../../domain/Propiedad';
import {Rol} from '../../../../../domain/Rol';
import {Cuota} from '../../../../../domain/Cuota';
import {TipoCuota} from '../../../../../domain/TipoCuota';
import {CheckboxIcon} from '../../../../../domain/CheckboxIcon';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../../../services/user.service';
import {environment} from '../../../../../../environments/environment';
import {UserDataService} from '../../../../../user-data.service'
import {ContribucionesService} from '../../../../../services/contribuciones.service';
import {SeleccionCuotasComponent} from '../seleccion-cuotas.component'

// import LIST_PROPIEDADES = new InjectionToken<number>('lista_propiedades');

@Component({
  selector: 'app-rol-cuotas',
  templateUrl: './rol-cuotas.component.html',
  styleUrls: ['./rol-cuotas.component.scss']
})
export class RolCuotasComponent implements OnInit, AfterViewInit {

  @Input()
  rol: Rol;
  cuotas1: Cuota[] = [];
  propiedades: Propiedad[] = [];
  @Output()
  change: EventEmitter<any> = new EventEmitter();
  noLiquidable: string;
  noLiquidablebool: boolean;
  beneficioBool:boolean;
  
  // JMS: es cuoton
  cuotaAnualCheck: boolean = true;
  // JMS: variable para activar el bloque azul de la cuota anual
  bloqueAzul: boolean = false;
  
  montoCuoton: number = 0;
  
  
  

  expanded: boolean;
  icon: string;

  // tabla de cuotas
  selectedIcon: CheckboxIcon;
  icons = CheckboxIcon;
  

  someTooltip: any;

  constructor(private user: UserService,
              private dialogService: MdlDialogService,
              private mdlSnackbarService: MdlSnackbarService,
              private userdataservice: UserDataService,
              private seleccioncuotas: SeleccionCuotasComponent,) {
        this.noLiquidablebool = false

  // this.propiedades = propiedades;
  }
  
  ngOnInit() {

    this.expanded = false;
    this.icon = this.rol.icon();
    this.selectedIcon = CheckboxIcon.SELECTED;
    // this.userdataservice.pagoTotal = true;

    this.rol.completeStream.subscribe(
      () => null,
      (err) => console.log(err),
      () => {
        this.rol.changeStream.subscribe(
          () => this.reloadChecked()
        );
        this.rol.cuotas.forEach(element => {
          console.log(element);
        if(element['nroCuotaTotal'] == "1-2019"){
          console.log('viene la cuota uno del año 2019!')
          this.beneficioBool = this.rol.beneficioCovid;
        }
        })
        this.noLiquidable = this.rol.noLiquidable;
 
        if (this.noLiquidable == "true"){
          this.noLiquidablebool = true;
        }
        else{
          this.noLiquidablebool = false;
        }
      }
    );
  }
  

  ngAfterViewInit() {
  }

  toggle() {
    //javier
    if (this.someTooltip !== undefined) {
      this.someTooltip.hide();
    }
    if (this.rol.isComplete) {
      this.expanded = !this.expanded;
    } else {
      this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment.snackbarTime);
    }
  }

  private reloadChecked(): void {
    if (this.rol.allChecked()) {
      this.cuotaAnualCheck = true;
      this.selectedIcon = CheckboxIcon.SELECTED;
    } else if (this.rol.noneChecked()) {
      this.cuotaAnualCheck = false;
      this.selectedIcon = CheckboxIcon.UNSELECTED;
    } else {
      this.selectedIcon = CheckboxIcon.INDETERMINATE;
    }
    this.change.emit();
    this.seleccioncuotas.recalcularTipo();
    this.seleccioncuotas.calcularTotal();
  }

  selectAllNone(): void {
    if (this.selectedIcon === CheckboxIcon.SELECTED) {
      this.cuotaAnualCheck = false;
      this.rol.seleccionar(TipoCuota.NINGUNA);
    } else {
      this.cuotaAnualCheck = true;
      this.rol.seleccionar(TipoCuota.TODAS);
    }
    this.seleccioncuotas.recalcularTipo();
    this.seleccioncuotas.calcularTotal();
  }

  private calculaTotalCuoton(rol: Rol){
    let totalCuoton = 0;
    for(let c of rol.cuotas){
      if(c.esCuoton == 'S'){
        if(rol.condonacion > 0){
          totalCuoton += c.liqTotal.montoTotalTotal;
        }
        else{
          totalCuoton += c.liqTotal.montoTotalParcial;
        }
      }
    }
    this.montoCuoton = totalCuoton;
    return(totalCuoton);
  }
  
  checkCuota(rol: Rol, cuota: Cuota) {
    if(cuota.esCuoton == 'S' && this.cuotaAnualCheck){
      this.checkCuoton(rol);
    }
    else{
      cuota.changeIntencionPago();
    }

  }
  
  checkCuoton(rol: Rol){
    if(rol != undefined){
      if(this.cuotaAnualCheck){
        this.cuotaAnualCheck = false;
        for(let c of rol.cuotas){
          if(c.esCuoton == 'S'){
            c.changeIntencionPago();
          }
        }
      }
      else{
        this.cuotaAnualCheck = true;
        for(let c of rol.cuotas){
          if(c.esCuoton == 'S' && !c.intencionPago){
            c.changeIntencionPago();
          }
        }
      }
    }
    this.seleccioncuotas.recalcularTipo();
    this.seleccioncuotas.calcularTotal();
    this.rol.calcularTotal();
  }

  delete() {
    if (this.rol.isComplete) {

      this.dialogService.confirm(
        'Eliminarás el ROL completo, ¿estás seguro/a?',
        'CANCELAR',
        'ELIMINAR').subscribe(
        () => {
          this.user.eliminarRol(this.rol.rolComunaSiiCod, this.rol.rolId, this.rol.subrolId).then(
            () => this.mdlSnackbarService.showToast('Rol eliminado.', environment.snackbarTime),
            err => {
              console.log(err);
              this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección.', environment.snackbarTime);
            }
          );
        }
      );
    } else {
      this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment.snackbarTime);
    }
  }
}
