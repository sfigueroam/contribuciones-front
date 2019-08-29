import { DFDetalle } from './DFDetalle';
import { TipoCuota } from './TipoCuota';
import { Observable, Subject } from 'rxjs';

export class DFFormulario {

    servicioId: number; // Identificador del formulario
    formNom: string;    // Nombre del formulario
    formNum: number;    // Número del formulario 
    folio: number;      
    vencimiento: Date;
    montoTotal: number;
    montoParcial: number;
    reajuste: number;
    interes: number;
    multa: number;
    
    porCondonacion: number;

    listDetalle: DFDetalle[];   // Listado con el detalle de deudas por formulario

    isComplete = true;

    completeSubject: Subject<any> = new Subject<any>();
    completeStream: Observable<any> = this.completeSubject.asObservable();

    changeSubject: Subject<any> = new Subject<any>();
    changeStream: Observable<any> = this.changeSubject.asObservable();

    total: number;    // Monto total por formulario.
    parcial: number;  // Monto parcial por formulario.
    condonacion: number;  // Monto condonacion por formulario.

    sufijoDireccion: string;
    isProcess = false;
    expired = false;
    pagoTotal = false;  // Indicador de pago total de las deudas del formulario asociado.

    // intencionPago: boolean;   // Indicador de intención de pago


    public constructor ( servicioId: number, formNum: number, formNom: string, listDetalle: DFDetalle[] ) {

        this.servicioId = servicioId;
        this.formNum = formNum;
        this.formNom = formNom;
        this.listDetalle = listDetalle;

        this.total = 0;
        this.parcial = 0;
        this.condonacion = 0;
        this.pagoTotal = false;

    }

    // seleccionar( tipo: TipoCuota ) {

    //     for (const detalle of this.listDetalle) {

    //       if (tipo === TipoCuota.TODAS) {
    //         detalle.intencionPago = true;
    //       } else if (tipo === TipoCuota.NINGUNA) {
    //         detalle.intencionPago = false;
    //       } else if (tipo === TipoCuota.VENCIDAS) {
    //         detalle.intencionPago = detalle.expired;
    //       } else if (tipo === TipoCuota.NO_VENCIDAS) {
    //         detalle.intencionPago = !detalle.expired;
    //       }
    //     }
    //      this.calcularTotal();
    //      this.changeSubject.next();
    //   }


    // private calcularTotal() {

    //     let mtoTotal = 0;
    //     let mtoParcial = 0;
    //     this.expired = false;

    //     for (const det of this.listDetalle) {
    //       mtoTotal += det.montoTotal;
    //       mtoParcial += det.montoParcial;

    //       if (det.expired) {
    //         this.expired = true;
    //       }
    //     }

    //     this.montoTotal = mtoTotal;
    //     this.montoParcial = mtoParcial;
    //   }


}
