import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { CheckboxIcon } from '../../../../domain/CheckboxIcon';
import { DFDetalle } from 'src/app/domain/DFDetalle';
import { DFFormulario } from '../../../../domain/DFFormulario';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-deuda-fiscal-formulario',
  templateUrl: './deuda-fiscal-formulario.component.html',
  styleUrls: ['./deuda-fiscal-formulario.component.scss']
})
export class DeudaFiscalFormularioComponent implements OnInit {


  mtoForm: number;    // Monto a pagar por formulario.
  someTooltip: any;   //

  @Input() formulario: DFFormulario;

  @Output() actualizarMonto: EventEmitter<boolean>;

  expanded: boolean;
  icon: string;
  selectedIcon: CheckboxIcon;


  constructor( private mdlSnackbarService: MdlSnackbarService ) {
    this.actualizarMonto = new EventEmitter();
  }


  ngOnInit() {

    this.expanded = false;
    this.icon = 'assignment';

    this.selectedIcon = CheckboxIcon.UNSELECTED;
    if (this.formulario.intencionPago) {
      this.selectedIcon = CheckboxIcon.SELECTED;
    }

  }

  /*************************************************************************
   * Método que muestra/oculta detalle de las deudas a pagar por formulario.
   *************************************************************************/
  mostrarOcultar() {

    if (this.someTooltip !== undefined) {
      this.someTooltip.hide();
    }
    
    if (this.formulario.isComplete) {
      this.expanded = !this.expanded;
    } else {
       this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', environment.snackbarTime);
    }

  }


  /*************************************************************************
   * Método que cambia el estado de la intención de pago de la cuota y 
   * recalcula el monto a pagar.
   *************************************************************************/
  seleccionarDetalle(detalle: DFDetalle) {

    detalle.changeIntencionPago();
    this.calcularMonto();

  }


  /************************************************************************
   * Método que calcula el monto a pagar en el formulario
   ************************************************************************/
  calcularMonto(): void {

    let cont: number = 0;
    let mtoTotal: number = 0;
    let mtoParcial: number = 0;

    for ( let det of this.formulario.listDetalle ) {
      if ( det.intencionPago ) {
        mtoTotal = mtoTotal + det.montoTotal;
        mtoParcial = mtoParcial + det.montoParcial;
        cont = cont + 1;
      }
    }

    if ( cont === this.formulario.listDetalle.length ) {
      this.mtoForm = mtoTotal;
      this.formulario.pagoTotal = true;
      this.formulario.total = mtoTotal;

    } else {
      this.mtoForm = mtoParcial;      
      this.formulario.pagoTotal = false;
      this.formulario.total = mtoParcial;
    }

    this.actualizarMonto.emit(this.formulario.pagoTotal);

  }


  /************************************************************************
   * Método que permite seleccionar/no seleccionar todas las deudas de 
   * formulario.
   ************************************************************************/
  seleccionarTodasNinguna(): void {

    let opcion: boolean;
    if (this.formulario.intencionPago) {
      opcion = false;
    } else {
      opcion = true;
    }

    this.formulario.intencionPago = opcion;
    for (let det of this.formulario.listDetalle) {
      det.intencionPago = opcion;
    }

    this.calcularMonto();
  }


  toggle(): void { }

}
