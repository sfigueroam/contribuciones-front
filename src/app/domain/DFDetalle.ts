import { FormsModule } from '@angular/forms';


export class DFDetalle {

    servicioId: number;
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


    constructor ( servId:number, formNum: number,
                  fol:number, venc:Date, mtoTot:number, 
                  mtoPar:number, mtoRea:number, mtoInt:number, 
                  mtoMul:number, mtoCond:number, porCond:number ) {
        
        this.servicioId = servId;
        this.formNum = formNum;            
        this.folio = fol;
        this.vencimiento = venc;
        this.montoTotal = mtoTot;
        this.montoParcial = mtoPar;
        this.reajuste = mtoRea;
        this.interes = mtoInt;
        this.multa = mtoMul;
        this.condonacion = mtoCond;
        this.porCondonacion = porCond;

    }

}