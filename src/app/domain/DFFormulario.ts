import { DFDetalle } from './DFDetalle';
import { TipoCuota } from './TipoCuota';
import { Observable, Subject } from 'rxjs';

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

    isComplete = true;

    completeSubject: Subject<any> = new Subject<any>();
    completeStream: Observable<any> = this.completeSubject.asObservable();

    changeSubject: Subject<any> = new Subject<any>();
    changeStream: Observable<any> = this.changeSubject.asObservable();

    total: number = 0;  // Monto total por formulario.
    sufijoDireccion: string;
    isProcess = false;
    expired = false;
    pagoTotal = false;

    intencionPago: boolean;


    public constructor ( servicioId: number, formNum: number, formNom: string, listDetalle: DFDetalle[] ) {

        this.servicioId = servicioId;
        this.formNum = formNum;
        this.formNom = formNom;
        this.listDetalle = listDetalle;

        this.total = 0;
        this.intencionPago = false;

    }

    seleccionar( tipo: TipoCuota ) {

        for (const detalle of this.listDetalle) {

          if (tipo === TipoCuota.TODAS) {
            detalle.intencionPago = true;
          } else if (tipo === TipoCuota.NINGUNA) {
            detalle.intencionPago = false;
          } else if (tipo === TipoCuota.VENCIDAS) {
            detalle.intencionPago = detalle.expired;
          } else if (tipo === TipoCuota.NO_VENCIDAS) {
            detalle.intencionPago = !detalle.expired;
          }
        }
         this.calcularTotal();
         this.changeSubject.next();
      }


    private calcularTotal() {

        let mtoTotal = 0;
        let mtoParcial = 0;
        this.expired = false;

        for (const det of this.listDetalle) {
          mtoTotal += det.montoTotal;
          mtoParcial += det.montoParcial;

          if (det.expired) {
            this.expired = true;
          }
        }

        this.montoTotal = mtoTotal;
        this.montoParcial = mtoParcial;
      }


}
