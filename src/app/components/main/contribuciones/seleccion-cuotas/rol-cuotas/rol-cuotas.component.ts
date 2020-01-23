import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren, Inject, InjectionToken} from '@angular/core';
import {Propiedad} from '../../../../../domain/Propiedad';
import {Rol} from '../../../../../domain/Rol';
import {Cuota} from '../../../../../domain/Cuota';
import {TipoCuota} from '../../../../../domain/TipoCuota';
import {CheckboxIcon} from '../../../../../domain/CheckboxIcon';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../../../services/user.service';
import {environment} from '../../../../../../environments/environment';
import {TooltipDirective} from 'ng2-tooltip-directive';
import {UserDataService} from '../../../../../user-data.service'
import {ContribucionesService} from '../../../../../services/contribuciones.service';

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
  // JMS: es cuoton
  cuotaAnualCheck: boolean;
  montoCuoton: number = 0;
  
  
  

  expanded: boolean;
  icon: string;

  // tabla de cuotas
  selectedIcon: CheckboxIcon;
  icons = CheckboxIcon;
  

  someTooltip: any;
  @ViewChildren(TooltipDirective) tooltipDirective;


  constructor(private user: UserService,
              private dialogService: MdlDialogService,
              private mdlSnackbarService: MdlSnackbarService,
              private userdataservice: UserDataService,) {
        this.noLiquidablebool = false

  // this.propiedades = propiedades;
  }
  
  ngOnInit() {

    this.expanded = false;
    this.icon = this.rol.icon();
    this.selectedIcon = CheckboxIcon.SELECTED;
    this.cuotaAnualCheck = true;

    this.rol.completeStream.subscribe(
      () => null,
      (err) => console.log(err),
      () => {
        this.rol.changeStream.subscribe(
          () => this.reloadChecked()
        );
        console.log("rol.noLiquidable", this.rol.noLiquidable)
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

  showHelp() {
    this.someTooltip = this.tooltipDirective.find(elem => elem.id === 'helpTooltip' + this.rol.rol);
    this.someTooltip.show();
    setTimeout(
      () => {
        this.someTooltip.hide();
      },
      environment.tooltipTime
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
      this.selectedIcon = CheckboxIcon.SELECTED;
    } else if (this.rol.noneChecked()) {
      this.selectedIcon = CheckboxIcon.UNSELECTED;
    } else {
      this.selectedIcon = CheckboxIcon.INDETERMINATE;
    }
    this.change.emit();
  }

  selectAllNone(): void {
    if (this.selectedIcon === CheckboxIcon.SELECTED) {
      this.rol.seleccionar(TipoCuota.NINGUNA);
    } else {
      this.rol.seleccionar(TipoCuota.TODAS);
    }
  }

  // JMS: calcula el total del cuoton
  private calculaTotalCuoton(rol: Rol){
    let totalCuoton = 0;
    for(let c of rol.cuotas){
      if(c.esCuoton == 'S'){
          totalCuoton += c.liqTotal.montoTotalTotal;
      }
    }
    this.montoCuoton = totalCuoton;
    console.log("monto cuoton", totalCuoton);
    return(totalCuoton);
  }
  
  
  checkCuota(cuota: Cuota) {
    cuota.changeIntencionPago();
    if(cuota.esCuoton == 'S' && this.cuotaAnualCheck == false){
      this.cuotaAnualCheck = true;
    }
    if(cuota.esCuoton == 'S' && this.cuotaAnualCheck == true){
      this.cuotaAnualCheck = false;
    }
  }
  checkCuoton(rol: Rol){
    if(rol != undefined){
      if(this.cuotaAnualCheck = true){
        console.log("rol", rol);
        for(let c of rol.cuotas){
          console.log("cuotas", rol.cuotas);
          if(c.esCuoton == 'S'){
            console.log("cuota: ", c.nroCuota);
            console.log("esCuoton: ", c.esCuoton);
            c.intencionPago = false;
            console.log("intencion pago despues: ", c.intencionPago);
          }
        }
        this.cuotaAnualCheck = false;
        console.log("cuota anual", this.cuotaAnualCheck);
      }
      else{
        console.log("rol", rol);
        for(let c of rol.cuotas){
          console.log("cuotas", rol.cuotas);
          if(c.esCuoton == 'S'){
            console.log("cuota: ", c.nroCuota);
            console.log("esCuoton: ", c.esCuoton);
            c.intencionPago = true;
            console.log("intencion pago despues: ", c.intencionPago);
          }
        }
        this.cuotaAnualCheck = true;
        console.log("cuota anual", this.cuotaAnualCheck);
      }
    }
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
