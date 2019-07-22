import { DFDetalle } from './DFDetalle';

export class DFFormulario {

    servicioId: number;
    formNom: string;
    formNum: number;
    folio: number;
    vencimiento: Date;
    montoTotal: number;
    montoParcial: number;
    reajuste: number;
    interes: number;
    multa: number;
    condonacion: number;
    porCondonacion: number;

    listDetalle: DFDetalle[];


    public constructor ( servicioId:number, formNum: number, formNom: string, listDetalle ) {

        this.servicioId = servicioId;
        this.formNum = formNum;
        this.formNom = formNom;
        this.listDetalle = listDetalle;

    }

}