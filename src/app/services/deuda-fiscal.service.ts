import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable()
export class DeudaFiscalService {


    private listadoDeuda: any[];


    constructor( private requestService: RequestService ) {

        console.log( 'Inicializado el servicio: DeudaFiscalService' );

        this.listadoDeuda = [
            {
                servicioNom: 'Servicio de Impuestos Internos',
                servicioId: 1,
                formNom: 'Formulario 21',
                formNum: 21,
                folio: 38155,
                // vencimiento: "09-05-2019",
                vencimiento: new Date(2019, 5, 9),
                monto: 273.332,
                reajuste: 0,
                interes: 0,
                multa: 0,
                condonacion: 0,
                porCondonacion: 0
            },
            {
                servicioNom: 'Servicio de Impuestos Internos',
                servicioId: 1,
                formNom: 'Formulario 21',
                formNum: 21,
                folio: 38187,
                // vencimiento: "09-05-2019",
                vencimiento: new Date(2019, 5, 9),
                monto: 15.405,
                reajuste: 0,
                interes: 0,
                multa: 0,
                condonacion: 0,
                porCondonacion: 0
            },
            {
                servicioNom: 'Servicio de Impuestos Internos',
                servicioId: 1,
                formNom: 'Formulario 21',
                formNum: 21,
                folio: 94493,
                // vencimiento: "09-01-2019",
                vencimiento: new Date(2019, 1, 9),
                monto: 479.324,
                reajuste: 0,
                interes: 0,
                multa: 0,
                condonacion: 0,
                porCondonacion: 0
            },
            {
                servicioNom: 'Servicio de Impuestos Internos',
                servicioId: 1,
                formNom: 'Formulario 21',
                formNum: 21,
                formulario: 21,
                folio: 94495,
                // vencimiento: "09-01-2019",
                vencimiento: new Date(2019, 1, 9),
                monto: 27.396,
                reajuste: 0,
                interes: 0,
                multa: 0,
                condonacion: 0,
                porCondonacion: 0
            }
     ];

    }


    getListadoDeuda(): any[] {

        return this.listadoDeuda;

    }
}
