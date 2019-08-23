import { Observable, Subject } from 'rxjs';


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

    expired: boolean;
    intencionPago: boolean;

    // liqParcial: CuotaDetalle;
    //   liqTotal: CuotaDetalle;

    changeSubject: Subject<any> = new Subject<any>();
    changeStream: Observable<any> = this.changeSubject.asObservable();


    constructor ( servId: number, formNum: number,
                  fol: number, venc: Date, mtoTot: number,
                  mtoPar: number, mtoRea: number, mtoInt: number,
                  mtoMul: number, mtoCond: number, porCond: number ) {

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
        this.intencionPago = false;

    }

    changeIntencionPago(value: boolean = !this.intencionPago) {
        this.intencionPago = value;
        this.changeSubject.next();
    }


    private isExpired(): boolean {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return (date.getTime() - this.vencimiento.getTime() > 0);
    }

}
