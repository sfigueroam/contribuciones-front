import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CheckboxIcon } from '../../../../domain/CheckboxIcon';


@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.scss']
})
export class BotoneraComponent implements OnInit {


  seleccionIcon: string;              //Icono de seleccion
  seleccionInd: boolean;              //Indicador de seleccion (true: seleccionado; false: no seleccionado)  
  
  @Input() deudasVencidas: boolean;   // Indicador de deudas vencidas (true: tiene deudas vencidas; false: no tiene deudas vencidas)
  @Input() deudasVigentes: boolean;   // Indicador de deudas vigentes (true: tiene deudas vigentes; false: no tiene deudas vigentes)
  @Input() tipoDeuda: string;         // Indicador del tipo de deuda (fiscal/contribuciones)
  @Input() listado: any[];            // Listado de las deudas

  
  constructor() {
    this.seleccionIcon = CheckboxIcon.UNSELECTED
    this.seleccionInd = false;  
  }


  ngOnInit() { }


  /************************************************************************
   * Método que permite seleccionar/no seleccionar las deudas.
   ************************************************************************/
  seleccionar():void{

    let opcion = "seleccionar";
    this.actualizarSeleccion();
    this.marcarSeleccion(opcion);

  }


  /************************************************************************
   * Método que permite seleccionar todas las deudas 
   * (vencidas y no vencidas).
   ************************************************************************/
  seleccionarTodas(): void{

    let opcion = "todas";
    this.marcarSeleccion(opcion); 
    
  }


  /************************************************************************
   * Método que permite no seleccionar todas las deudas (vencidas y no 
   * vencidas).
   ************************************************************************/
  seleccionarNinguna(): void{

    let opcion = "ninguna";
    this.marcarSeleccion(opcion);

  }


  /************************************************************************
   * Método que permite seleccionar todas las deudas vencidas.
   ************************************************************************/
  seleccionarVencidas(): void{

    let opcion = "vencidas";
    this.actualizarSeleccion();
    this.marcarSeleccion(opcion);

  }  


  /************************************************************************
   * Método que permite seleccionar todas las deudas vigentes.
   ************************************************************************/
  seleccionarVigentes(): void{

    let opcion = "vigentes";
    this.actualizarSeleccion();
    this.marcarSeleccion(opcion);

  }


  /*****************************************************************************
   * Método que actualiza el checkbox de deudas vencidas / vigentes
   *****************************************************************************/
  actualizarSeleccion(): void{

    if(this.seleccionIcon === CheckboxIcon.UNSELECTED || this.seleccionIcon === CheckboxIcon.INDETERMINATE){
      this.seleccionIcon = CheckboxIcon.SELECTED;  
      this.seleccionInd = true;    
    }else{
      this.seleccionIcon = CheckboxIcon.UNSELECTED;      
      this.seleccionInd = false;
    }

  }


  /*****************************************************************************
   * Método que marca lo seleccionado en la botonera.
   * opcion: - vencidas: Selecciona las deudas vencidas. 
   *         - vigentes: Selecciona las deudas no vencidas. 
   *         - todas: Selecciona todas las deudas (vigentes y no vigentes). 
   *         - ninguna: No selecciona deudas.
   *         - seleccionar: Selecciona/no selecciona según seleccionarInd.
   *****************************************************************************/
  marcarSeleccion( opcion: string ): void{

    switch(this.tipoDeuda) { 
      case "fiscal": {
        this.marcarFiscales(opcion);
        break; 
      } 
      case "contribuciones": {
        //this.seleccionContribuciones(opcion);
        break; 
      }
      default: { 
        console.log("default"); 
        break; 
      } 
   }
    
  }


  /*****************************************************************************
   * Método que marca lo seleccionado segun la botonera para deudas fiscales.
   * opcion: - vencidas: Selecciona las deudas vencidas. 
   *         - vigentes: Selecciona las deudas no vencidas. 
   *         - todas: Selecciona todas las deudas (vigentes y no vigentes). 
   *         - ninguna: No selecciona deudas.
   *         - seleccionar: Selecciona/no selecciona según seleccionarInd.
   *****************************************************************************/
  marcarFiscales(opcion: string): void{

    let fec = new Date();

    for(let serv of this.listado){

      for(let form of serv.listFormulario){

        for(let det of form.listDetalle){

          switch(opcion) { 
            case "vencidas": {
              if(det.vencimiento.getTime() < fec.getTime()){
                det.intencionPago = true;
              }else{
                det.intencionPago = false;
              }
              break; 
            } 
            case "vigentes": { 
              if(det.vencimiento.getTime() >= fec.getTime()){
                det.intencionPago = true;
              }else{
                det.intencionPago = false;
              } 
              break; 
            } 
            case "todas": { 
              form.intencionPago = true;
              det.intencionPago = true;
              break; 
            } 
            case "ninguna": { 
              form.intencionPago = false;
              det.intencionPago = false;
              break; 
            } 
            case "seleccionar": {               
              if(this.seleccionInd){
                form.intencionPago = true;
                det.intencionPago = true;
              }else{
                form.intencionPago = false;
                det.intencionPago = false;
              }
              break; 
            }
            default: { 
              console.log("default"); 
               break; 
            } 
          }
        }
      }
    }
  }

}
