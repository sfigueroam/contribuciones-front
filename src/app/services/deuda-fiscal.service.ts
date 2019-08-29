import { Injectable } from '@angular/core';
import { DFDeudaFiscal } from '../domain/DFDeudaFiscal';
import { DFServicio } from '../domain/DFServicio';
import { DFFormulario } from '../domain/DFFormulario';
import { DFDetalle } from '../domain/DFDetalle';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})

  export class DeudaFiscalService {


    // Declaración de variables
    private listDeuda: DFDeudaFiscal[];             // Listado de deudas fiscales.
    private listServicio: DFServicio[];             // Listado de servicios.
    private listFormulario: DFFormulario[];         // Listado de formularios.
    private listDetalle: DFDetalle[];               // Listado de detalle.

    
    // Declaración constructor
    constructor( private user: UserService ) {

        this.listDeuda = this.getListDeudaPrueba( this.user.rut );

    }


    // Método que obtiene el listado de las deudas.
    getListDeuda(): DFDeudaFiscal[] {

        return this.listDeuda;
    }


    getListDeudaPrueba(rut: number): DFDeudaFiscal[] {

        
        if(rut === 1374582 ){ //deudas no vencidas
            this.listDeuda = [
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 16,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 60926,
                    montoParcial: 70926,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 17,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 109667,
                    montoParcial: 119667,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 18,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 158408,
                    montoParcial: 168408,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 19,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 207149,
                    montoParcial: 217149,
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
                     vencimiento: new Date(2019, 11, 1),
                     montoTotal: 27396,
                     montoParcial: 28396,
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
                      vencimiento: new Date(2019, 11, 1),
                      montoTotal: 28396,
                      montoParcial: 29396,
                      reajuste: 0,
                      interes: 0,
                      multa: 0,
                      condonacion: 0,
                      porCondonacion: 0
                  }
         ];
        } else if ( rut === 10066110 ) { //deudas vencidas
            this.listDeuda = [
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 16,
                    vencimiento: new Date(2018, 11, 1),
                    montoTotal: 60926,
                    montoParcial: 70926,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 17,
                    vencimiento: new Date(2018, 11, 1),
                    montoTotal: 109667,
                    montoParcial: 119667,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 18,
                    vencimiento: new Date(2018, 11, 1),
                    montoTotal: 158408,
                    montoParcial: 168408,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 19,
                    vencimiento: new Date(2018, 11, 1),
                    montoTotal: 207149,
                    montoParcial: 217149,
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
                     vencimiento: new Date(2018, 11, 1),
                     montoTotal: 27396,
                     montoParcial: 28396,
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
                      vencimiento: new Date(2018, 11, 1),
                      montoTotal: 28396,
                      montoParcial: 29396,
                      reajuste: 0,
                      interes: 0,
                      multa: 0,
                      condonacion: 0,
                      porCondonacion: 0
                  }
         ];                
        } else if( rut === 12182216 ) { // deudas vencidas y no vencidas
            this.listDeuda = [
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 16,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 60926,
                    montoParcial: 70926,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 17,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 109667,
                    montoParcial: 119667,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 18,
                    vencimiento: new Date(2018, 11, 1),
                    montoTotal: 158408,
                    montoParcial: 168408,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 19,
                    vencimiento: new Date(2018, 11, 1),
                    montoTotal: 207149,
                    montoParcial: 217149,
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
                     vencimiento: new Date(2019, 11, 1),
                     montoTotal: 27396,
                     montoParcial: 28396,
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
                      vencimiento: new Date(2019, 11, 1),
                      montoTotal: 28396,
                      montoParcial: 29396,
                      reajuste: 0,
                      interes: 0,
                      multa: 0,
                      condonacion: 0,
                      porCondonacion: 0
                  }
         ];
        } else if ( rut === 4670812 ) { //sin deudas fiscales
            this.listDeuda = [];
        } else {
            this.listDeuda = [
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 16,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 60926,
                    montoParcial: 70926,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 17,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 109667,
                    montoParcial: 119667,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 18,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 158408,
                    montoParcial: 168408,
                    reajuste: 0,
                    interes: 0,
                    multa: 0,
                    condonacion: 0,
                    porCondonacion: 0
                },
                {
                    servicioNom: 'Servicio de Impuestos Internos',
                    servicioId: 1,
                    formNom: 'Formulario 47',
                    formNum: 47,
                    folio: 19,
                    vencimiento: new Date(2019, 11, 1),
                    montoTotal: 207149,
                    montoParcial: 217149,
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
                     vencimiento: new Date(2019, 11, 1),
                     montoTotal: 27396,
                     montoParcial: 28396,
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
                      vencimiento: new Date(2019, 11, 1),
                      montoTotal: 28396,
                      montoParcial: 29396,
                      reajuste: 0,
                      interes: 0,
                      multa: 0,
                      condonacion: 0,
                      porCondonacion: 0
                  }
         ];
        }

        return this.listDeuda;
    }


    // Método que obtiene la lista de los servicios.
    getListServicio(): DFServicio[] {

        this.listServicio = [];

        for ( let i = 0; i < this.listDeuda.length ; i++ ) {

            if ( !this.listServicio.find( x => x.servicioId === this.listDeuda[i].servicioId ) ) {

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

        let fec = new Date();
        this.listDetalle = [];

        for ( let i = 0; i < this.listDeuda.length ; i++ ) {

            if( this.listDeuda[i].servicioId === servicioId && this.listDeuda[i].formNum === formNum ) {

                if ( !this.listDetalle.find( x => x.folio === this.listDeuda[i].folio ) ) {

                    
                    let expired = false;
                    if (this.listDeuda[i].vencimiento.getTime() < fec.getTime()) {
                        expired = true;
                    }

                    this.listDetalle.push( new DFDetalle( this.listDeuda[i].servicioId, this.listDeuda[i].formNum,
                                                          this.listDeuda[i].folio, this.listDeuda[i].vencimiento, this.listDeuda[i].montoTotal,
                                                          this.listDeuda[i].montoParcial, this.listDeuda[i].reajuste, this.listDeuda[i].interes,
                                                          this.listDeuda[i].multa, this.listDeuda[i].condonacion, this.listDeuda[i].porCondonacion,
                                                          expired ));
    
                }

            }

        }


        return this.listDetalle;

    }


    getExisteDeudasVigentes(): boolean{

        let res: boolean = false;
        let cont: number = 0;

        for(let serv of this.listServicio){
            for(let form of serv.listFormulario){
                for(let det of form.listDetalle){
                    if(!det.expired){
                        cont = cont + 1;        
                    }                    
                }        
            }        
        }

        if( cont>0 ){
            res = true;
        }

        return res;

    }

    getExisteDeudasVencidas(): boolean{

        let res: boolean = false;
        let cont: number = 0;

        for(let serv of this.listServicio){
            for(let form of serv.listFormulario){
                for(let det of form.listDetalle){
                    if(det.expired){
                        cont = cont + 1;        
                    }                    
                }        
            }        
        }

        if( cont>0 ){
            res = true;
        }

        return res;

    }

  }
