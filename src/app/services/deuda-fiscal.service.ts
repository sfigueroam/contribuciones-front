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
                   vencimiento: new Date(2019, 5, 9),
                   montoTotal: 273332,
                   montoParcial: 273332,
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
                   vencimiento: new Date(2019, 5, 9),
                   montoTotal: 15405,
                   montoParcial: 15405,
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
                   vencimiento: new Date(2019, 1, 9),
                   montoTotal: 479324,
                   montoParcial: 479324,
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
                   folio: 94495,
                   vencimiento: new Date(2019, 1, 9),
                   montoTotal: 27396,
                   montoParcial: 27396,
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
