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
