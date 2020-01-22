import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {Rol} from '../../../../../domain/Rol';
import {Cuota} from '../../../../../domain/Cuota';
import {TipoCuota} from '../../../../../domain/TipoCuota';
import {CheckboxIcon} from '../../../../../domain/CheckboxIcon';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../../../services/user.service';
import {environment} from '../../../../../../environments/environment';
import {TooltipDirective} from 'ng2-tooltip-directive';
import {UserDataService} from '../../../../../user-data.service'

@Component({
  selector: 'app-rol-cuotas',
  templateUrl: './rol-cuotas.component.html',
  styleUrls: ['./rol-cuotas.component.scss']
})
export class RolCuotasComponent implements OnInit, AfterViewInit {

  @Input()
  rol: Rol;
  cuotas: Cuota[] = [];
  @Output()
  change: EventEmitter<any> = new EventEmitter();
  noLiquidable: string;
  noLiquidablebool: boolean;
  // JMS: es cuoton
  cuotaAnualCheck: boolean = true;
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
              private userdataservice: UserDataService) {
        this.noLiquidablebool = false

  
  }

  ngOnInit() {

    this.expanded = false;
    this.icon = this.rol.icon();
    this.selectedIcon = CheckboxIcon.SELECTED;
    // this.esCuoton = this.userdataservice.vieneCuoton;
    // console.log("esCuoton", this.esCuoton);
    
    // this.esCuoton = this.userdataservice.esCuotonServ;
    // console.log("es cuoton servicio", this.userdataservice.esCuotonServ);

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
    this.calculaTotalCuoton();
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
  private calculaTotalCuoton(){
    let totalCuoton;
    for(let cuota of this.cuotas){
      if(cuota.esCuoton == 'S'){
        totalCuoton += cuota.liqTotal.montoTotalTotal;
      }
    }
    this.montoCuoton = totalCuoton;
  }
  
  checkCuota(cuota: Cuota) {
    cuota.changeIntencionPago();
  }
  checkCuoton(cuota: Cuota){
    if (this.cuotaAnualCheck){
      this.cuotaAnualCheck = false;
      cuota.intencionPagoCuoton();
    }
    else{
      this.cuotaAnualCheck = true;
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
