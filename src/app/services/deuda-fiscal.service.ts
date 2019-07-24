import { Injectable } from '@angular/core';
import { DFDeudaFiscal } from '../domain/DFDeudaFiscal';
import { DFServicio } from '../domain/DFServicio';
import { DFFormulario } from '../domain/DFFormulario';
import { DFDetalle } from '../domain/DFDetalle';


@Injectable({
    providedIn: 'root'
})

  export class DeudaFiscalService {


    // Declaración de variables
    private listDeuda: DFDeudaFiscal[];                   // Listado de deudas fiscales.

    private listServicio: DFServicio[];             // Listado de servicios.

    private listFormulario: DFFormulario[];         // Listado de formularios.

    private listDetalle: DFDetalle[];               // Listado de detalle.


    // Declaración constructor
    constructor(  ) {

        console.log('Servicio de deuda fiscal listo!!');

        this.listDeuda = [
               {
                   servicioNom: 'Servicio de Impuestos Internos',
                   servicioId: 1,
                   formNom: 'Formulario 21',
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
                   servicioNom: 'Servicio de Impuestos Internos',
                   servicioId: 1,
                   formNom: 'Formulario 22',
                   formNum: 22,
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
                   servicioNom: 'Servicio de Impuestos Internos',
                   servicioId: 1,
                   formNom: 'Formulario 23',
                   formNum: 23,
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
                   servicioNom: 'Servicio de Impuestos Internos',
                   servicioId: 1,
                   formNom: 'Formulario 24',
                   formNum: 24,
                   folio: 94495,
                   vencimiento: new Date(2019, 1, 9),
                   montoTotal: 27396,
                   montoParcial: 27396,
                   reajuste: 0,
                   interes: 0,
                   multa: 0,
                   condonacion: 0,
                   porCondonacion: 0
               },
               {
                    servicioNom: 'Otro Servicio de Impuestos Internos',
                    servicioId: 2,
                    formNom: 'Formulario 21',
                    formNum: 21,
                    folio: 94498,
                    vencimiento: new Date(2019, 1, 9),
                    montoTotal: 27396,
                    montoParcial: 27396,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                     servicioNom: 'Otro Servicio de Impuestos Internos',
                     servicioId: 2,
                     formNom: 'Formulario 22',
                     formNum: 22,
                     folio: 94895,
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


    // Método que obtiene el listado de las deudas.
    getListDeuda(): DFDeudaFiscal[] {

        return this.listDeuda;
    }


    // Método que obtiene la lista de los servicios.
    getListServicio(): DFServicio[] {

        this.listServicio = [];

        for ( let i = 0; i < this.listDeuda.length ; i++ ) {

            if ( !this.listServicio.find( x => x.servicioId === this.listDeuda[i].servicioId ) ) {

                console.log( this.listDeuda[i].servicioNom );

                this.listServicio.push( new DFServicio( this.listDeuda[i].servicioId, this.listDeuda[i].servicioNom, this.getListFormulario( this.listDeuda[i].servicioId ) ) );

            }

        }

        return this.listServicio;

    }


    // Método que obtiene la lista de los formularios por servicio.
    getListFormulario( servicioId: number ): DFFormulario[] {

        this.listFormulario = [];

        for ( let i = 0; i < this.listDeuda.length ; i++ ) {

            if( this.listDeuda[i].servicioId === servicioId ) {

                if ( !this.listFormulario.find( x => x.formNum === this.listDeuda[i].formNum ) ) {

                    this.listFormulario.push( new DFFormulario( this.listDeuda[i].servicioId, this.listDeuda[i].formNum, this.listDeuda[i].formNom, this.getListDetalle( this.listDeuda[i].servicioId, this.listDeuda[i].formNum ) ) );
    
                }

            }

        }

        return this.listFormulario;

    }


    // Método que obtiene el detalle de las deudas por formulario y servicio.
    getListDetalle( servicioId: number, formNum: number ): DFDetalle[]{

        this.listDetalle = [];

        for ( let i = 0; i < this.listDeuda.length ; i++ ) {

            if( this.listDeuda[i].servicioId === servicioId && this.listDeuda[i].formNum === formNum ) {

                if ( !this.listDetalle.find( x => x.folio === this.listDeuda[i].folio ) ) {

                    this.listDetalle.push( new DFDetalle( this.listDeuda[i].servicioId, this.listDeuda[i].formNum,
                                                          this.listDeuda[i].folio, this.listDeuda[i].vencimiento, this.listDeuda[i].montoTotal,
                                                          this.listDeuda[i].montoParcial, this.listDeuda[i].reajuste, this.listDeuda[i].interes,
                                                          this.listDeuda[i].multa, this.listDeuda[i].condonacion, this.listDeuda[i].porCondonacion ));
    
                }

            }

        }


        return this.listDetalle;

    }



  }
