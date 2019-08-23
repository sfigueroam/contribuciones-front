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
  actualizarMonto( indMontoTotal: boolean ) {

    let monto: number = 0;

    for (let form of this.servicio.listFormulario) {      
      monto = monto + form.total;      
    }

    this.mtoServ = monto;
    this.servicio.total = monto;

    this.actualizarResumen.emit(true);

  }

}
