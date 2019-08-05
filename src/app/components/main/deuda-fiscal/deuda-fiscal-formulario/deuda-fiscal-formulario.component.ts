import { Component, OnInit, Input } from '@angular/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { CheckboxIcon } from '../../../../domain/CheckboxIcon';
import { TipoCuota } from '../../../../domain/TipoCuota';
import { DFDetalle } from 'src/app/domain/DFDetalle';
import { DFFormulario } from '../../../../domain/DFFormulario';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-deuda-fiscal-formulario',
  templateUrl: './deuda-fiscal-formulario.component.html'
})
export class DeudaFiscalFormularioComponent implements OnInit {

  mtoForm: number;    // Monto a pagar por formulario.

  indMto: boolean;    // Indicador de monto total/parcial a mostrar ( true: muestra total/oculta parcial; false: oculta total/muestra parcial )

  someTooltip: any;

  expanded: boolean;

  icon: string;
  
  selectedIcon: CheckboxIcon;

  @Input() formulario: DFFormulario;


  constructor( private mdlSnackbarService: MdlSnackbarService ) {

    this.indMto = true;

  }

  ngOnInit() {

    this.expanded = false;
    this.icon = 'assignment';
    this.selectedIcon = CheckboxIcon.SELECTED;

    this.mtoForm = this.obtenerMonto( this.indMto );

  }



  // Método que calcula el monto a pagar por formulario.
  obtenerMonto( indMto: boolean ): number{

    let mto: number = 0;

      for ( let det of this.formulario.listDetalle ) {

        if ( indMto ){
          mto = mto + det.montoTotal;
        } else {
          mto = mto + det.montoParcial;
        }

      }    
    
    return mto;
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
