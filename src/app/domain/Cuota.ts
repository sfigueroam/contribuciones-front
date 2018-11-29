import {CuotaDetalle} from './CuotaDetalle';
import {Observable, Subject} from 'rxjs';

export class Cuota {
  clasificacion: string;
  fechaVencimiento: Date;
  fechaVencimientoOriginal: string;
  folio: string;
  numeroCuota: string;
  tipoDeuda: string;
  intencionPago = true;
  expired: boolean;

  liqParcial: CuotaDetalle;
  liqTotal: CuotaDetalle;

  changeSubject: Subject<any> = new Subject<any>();
  changeStream: Observable<any> = this.changeSubject.asObservable();

  public constructor(init?: any) {
    this.clasificacion = init.clasificacion;
    this.fechaVencimiento = this.formatDate(init.fechaVencimiento);
    this.fechaVencimientoOriginal = init.fechaVencimiento;
    this.folio = init.folio;
    this.numeroCuota = init.numeroCuota;
    this.tipoDeuda = init.tipoDeuda;
    this.expired = this.isExpired();

    this.liqTotal = new CuotaDetalle(init);
  }

  changeIntencionPago(value: boolean = !this.intencionPago) {
    this.intencionPago = value;
    this.changeSubject.next();
  }

  private formatDate(fecha) {
    const fec = fecha.split('-');
    return new Date(fec[2], fec[1] - 1, fec[0], 0, 0, 0);
  }

  private isExpired(): boolean {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return (date.getTime() - this.fechaVencimiento.getTime() > 0);
  }

  getYear(): any {
    this.fechaVencimiento.getFullYear();
  }
}
