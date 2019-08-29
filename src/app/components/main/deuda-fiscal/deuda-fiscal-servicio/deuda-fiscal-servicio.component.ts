import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DFServicio } from '../../../../domain/DFServicio';


@Component({
  selector: 'app-deuda-fiscal-servicio',
  templateUrl: './deuda-fiscal-servicio.component.html',
  styleUrls: ['./deuda-fiscal-servicio.component.scss']
})
export class DeudaFiscalServicioComponent implements OnInit {
  
  mtoServ: number;  // Monto total a pagar por servicio
  mostrar: boolean; // Indicador que muestra/oculta el listado de formularios por servicio
  indPagoTotal: boolean;

  @Input() servicio: DFServicio;  // Detalle de servicio

  @Output() actualizarResumen: EventEmitter<any>; // Indicador de actualización de resumen

  
  constructor ( ) {
    this.mostrar = true;        
    this.actualizarResumen = new EventEmitter();
  }
  

  ngOnInit() { }
  
  
  /************************************************************
   * Método que actualiza el monto total a pagar por servicio.
   * indMontoTotal: Indicador de pago total por formulario.
   *                - true: Pago total del formulario.
   *                - false: Pago parcial del formulario.
   ************************************************************/
  actualizarMonto( indPagoTotal: boolean ) {

    let mtoTot: number = 0;
    let mtoPar: number = 0;
    let mtoCnd: number = 0;

    for (let form of this.servicio.listFormulario) {      
      mtoTot += form.total;
      mtoPar += form.parcial;
      mtoCnd += form.condonacion;
    }

    this.servicio.total = mtoTot;
    this.servicio.parcial = mtoPar;
    this.servicio.condonacion = mtoCnd;

    this.indPagoTotal = indPagoTotal;

    this.actualizarResumen.emit(true);

  }

}
