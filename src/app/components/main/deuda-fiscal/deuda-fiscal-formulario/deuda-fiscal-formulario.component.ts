import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { CheckboxIcon } from '../../../../domain/CheckboxIcon';
import { DFDetalle } from 'src/app/domain/DFDetalle';
import { DFFormulario } from '../../../../domain/DFFormulario';
import { environment } from '../../../../../environments/environment';
import { DeudaFiscalService } from '../../../../services/deuda-fiscal.service';


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


  constructor( private deudaFiscalService: DeudaFiscalService,
               private mdlSnackbarService: MdlSnackbarService ) {
    this.actualizarMonto = new EventEmitter();
  }


  ngOnInit() {

    this.expanded = true;
    this.icon = 'assignment';

    this.selectedIcon = CheckboxIcon.UNSELECTED;
    if (this.formulario.pagoTotal) {
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

    let cnt: number = 0;
    let mtoTot: number = 0;
    let mtoPar: number = 0;
    let mtoCnd: number = 0;

    for ( let det of this.formulario.listDetalle ) {
      if ( det.intencionPago ) {
        mtoTot+=det.montoTotal;
        mtoPar+=det.montoParcial;
        mtoCnd+=det.condonacion;
        cnt++;
      }
    }

    this.formulario.total = mtoTot;
    this.formulario.parcial = mtoPar;

    if (cnt === this.formulario.listDetalle.length){
      this.formulario.pagoTotal = true;      
    } else {
      this.formulario.pagoTotal = false;      
    }   

    this.actualizarMonto.emit(this.formulario.pagoTotal);

  }


  /************************************************************************
   * Método que permite seleccionar/no seleccionar todas las deudas de 
   * formulario.
   ************************************************************************/
  seleccionarTodasNinguna(): void {

    this.formulario.pagoTotal = !this.formulario.pagoTotal;
    for ( let det of this.formulario.listDetalle ) {
      det.intencionPago = this.formulario.pagoTotal;
    }

    this.calcularMonto();
    
  }


  toggle(): void { }

}
