import { Component, OnInit } from '@angular/core';
import { DeudaFiscalService } from '../../../../services/deuda-fiscal.service';
import { DFServicio } from '../../../../domain/DFServicio';
import { DFResumen } from '../../../../domain/DFResumen';

@Component({
  selector: 'app-deuda-fiscal-listado',
  templateUrl: './deuda-fiscal-listado.component.html'
})
export class DeudaFiscalListadoComponent implements OnInit {

  tipoDeuda: string;  // Tipo de deuda (fiscal/contribuciones)

  deudasVigentes: boolean;  // Indicador de deudas vigentes.
  deudasVencidas: boolean;  // Indicador de deudas vencidas.  

  listServicio: DFServicio[] = [];  // Listado de deudas fiscales obtenidas del servicio.

  montoTotal: number; // Monto total a pagar
  montoCondonacion: number; // Monto total de condonacion

  //variables usadas en resumen-pago
  complete: boolean;  
  resumen: DFResumen;


  existeSoloVencidas = false;
  existeVencidas = false;
  obteniendoDatos = false;


  opcion: string = "todas";



  constructor( private deudaFiscalService: DeudaFiscalService ) {

    this.resumen = new DFResumen();
    this.tipoDeuda = 'fiscal';

    this.listServicio = deudaFiscalService.getListServicio();
    this.deudasVigentes = deudaFiscalService.getExisteDeudasVigentes();
    this.deudasVencidas = deudaFiscalService.getExisteDeudasVencidas();

  }
  

  ngOnInit() { }


  /******************************************************* 
   * Método que actualiza el resumen de pago.
   *******************************************************/
  actualizarResumen(indResumen: boolean): void {

    console.log("actualizarResumen");

    let monto: number = 0;
    for ( let serv of this.listServicio) {
      monto = monto + serv.total;
    }

    this.resumen.total = monto;

  }

  calcularMonto(opcion: string): void{
    console.log("calcularMonto: " + opcion);
  }


}
