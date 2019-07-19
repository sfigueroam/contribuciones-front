import { Injectable } from '@angular/core';
import { RequestService } from './request.service';


@Injectable({
    providedIn: 'root'
  })

  export class DeudaFiscalService {


    private listado: any[];


    constructor( private requestService: RequestService ) {

        console.log("Servicio de deuda fiscal listo!!");    
    
        this.listado = [
               {
                   servicioNom: "Servicio de Impuestos Internos",
                   servicioId: 1,
                   formNom: "Formulario 21",
                   formNum: 21,
                   folio: 38155,
                   vencimiento: "09-05-2019",
                   monto: 273.332,
                   reajuste: 0,
                   interes: 0,
                   multa: 0,
                   condonacion: 0,
                   porCondonacion: 0 
               },
               {
                   servicioNom: "Servicio de Impuestos Internos",
                   servicioId: 1,
                   formNom: "Formulario 21",
                   formNum: 21,
                   folio: 38187,
                   vencimiento: "09-05-2019",
                   monto: 15.405,
                   reajuste: 0,
                   interes: 0,
                   multa: 0,
                   condonacion: 0,
                   porCondonacion: 0
               },
               {
                   servicioNom: "Servicio de Impuestos Internos",
                   servicioId: 1,
                   formNom: "Formulario 21",
                   formNum: 21,
                   folio: 94493,
                   vencimiento: "09-01-2019",
                   monto: 479.324,
                   reajuste: 0,
                   interes: 0,
                   multa: 0,
                   condonacion: 0,
                   porCondonacion: 0
               },
               {
                   servicioNom: "Servicio de Impuestos Internos",
                   servicioId: 1,
                   formNom: "Formulario 21",
                   formNum: 21,
                   formulario: 21,
                   folio: 94495,
                   vencimiento: "09-01-2019",
                   monto: 27.396,
                   reajuste: 0,
                   interes: 0,
                   multa: 0,
                   condonacion: 0,
                   porCondonacion: 0
               }
        ]; 

    }

    getListado(){
        return this.listado;
    }

  

  }    
