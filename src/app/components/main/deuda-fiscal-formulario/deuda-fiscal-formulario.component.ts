import { Component, OnInit, Input } from '@angular/core';
import { DFFormulario } from '../../../domain/DFFormulario';
import { MdlSnackbarService } from '@angular-mdl/core';
import { CheckboxIcon } from '../../../domain/CheckboxIcon';
import { TipoCuota } from '../../../domain/TipoCuota';
import { DFDetalle } from 'src/app/domain/DFDetalle';
import { environment } from '../../../../environments/environment';





@Component({
  selector: 'app-deuda-fiscal-formulario',
  templateUrl: './deuda-fiscal-formulario.component.html',
  styleUrls: ['./deuda-fiscal-formulario.component.scss']
})
export class DeudaFiscalFormularioComponent implements OnInit {

  @Input() formulario: DFFormulario;

  someTooltip: any;
  expanded: boolean;

  icon: string;
  selectedIcon: CheckboxIcon;


  constructor( private mdlSnackbarService: MdlSnackbarService ) { }

  ngOnInit() {

    this.expanded = false;
    this.icon = 'assignment';
    this.selectedIcon = CheckboxIcon.SELECTED;
  }


  checkCuota(detalle: DFDetalle) {
    detalle.changeIntencionPago();
  }


  selectAllNone(): void {
    if (this.selectedIcon === CheckboxIcon.SELECTED) {
      this.formulario.seleccionar( TipoCuota.NINGUNA );
    } else {
      this.formulario.seleccionar( TipoCuota.TODAS );
    }
  }


  delete() {
    // if (this.rol.isComplete) {

    //   this.dialogService.confirm(
    //     'Eliminarás el ROL completo, ¿estás seguro/a?',
    //     'CANCELAR',
    //     'ELIMINAR').subscribe(
    //     () => {
    //       this.user.eliminarRol(this.rol.rolComunaSiiCod, this.rol.rolId, this.rol.subrolId).then(
    //         () => this.mdlSnackbarService.showToast('Rol eliminado.', environment.snackbarTime),
    //         err => {
    //           console.log(err);
    //           this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección.', environment.snackbarTime);
    //         }
    //       );
    //     }
    //   );
    // } else {
    //   this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment.snackbarTime);
    // }
  }


  toggle() {
    if (this.someTooltip !== undefined) {
      this.someTooltip.hide();
    }
    if (this.formulario.isComplete) {
      this.expanded = !this.expanded;
    } else {
       this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment.snackbarTime);
    }
  }

}
