import { Component, OnInit } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';

import { DeudaFiscalService } from '../../../../services/deuda-fiscal.service';

import { DFServicio } from '../../../../domain/DFServicio';
import { TipoCuota } from '../../../../domain/TipoCuota';
import { CheckboxIcon } from '../../../../domain/CheckboxIcon';

import { AyudaCondonacionComponent } from '../../contribuciones/seleccion-cuotas/modal/ayuda-condonacion/ayuda-condonacion.component';
import { ResumenComponent } from '../../contribuciones/seleccion-cuotas/modal/resumen/resumen.component';
import { ResumenCuotas } from '../../../../domain/ResumenCuotas';

@Component({
  selector: 'app-deuda-fiscal-listado',
  templateUrl: './deuda-fiscal-listado.component.html'
})
export class DeudaFiscalListadoComponent implements OnInit {

  tipoDeuda: string;  // Tipo de deuda (fiscal/contribuciones)

  deudasVigentes: boolean;  // Indicador de deudas vigentes.
  deudasVencidas: boolean;  // Indicador de deudas vencidas.  

  listServicio: DFServicio[] = [];  // Listado de deudas fiscales obtenidas del servicio.

  //variables usadas en resumen-pago
  complete: boolean;  
  resumen: ResumenCuotas;



  

  existeSoloVencidas = false;
  existeVencidas = false;
  obteniendoDatos = false;

  

 
  constructor( private deudaFiscalService: DeudaFiscalService,
               private dialogService: MdlDialogService) {

    this.resumen = new ResumenCuotas();            
    this.tipoDeuda = "fiscal";                
    
    this.listServicio = deudaFiscalService.getListServicio();
    this.deudasVigentes = deudaFiscalService.getExisteDeudasVigentes();
    this.deudasVencidas = deudaFiscalService.getExisteDeudasVencidas();

  }

  ngOnInit() { }


}
