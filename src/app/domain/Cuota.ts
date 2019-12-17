import {CuotaDetalle} from './CuotaDetalle';
import {Observable, Subject} from 'rxjs';

export class Cuota {
  clasificacion: string;
  fechaVcto: Date;
  fechaVctoStr: string;
  fechaVctoStr2: string;
  fechaVencimientoOriginal: string;
  formFolio: string;
  numeroCuota: string;
  clienteTipo: string;
  intencionPago = true;
  expired: boolean;
  day: string;
  month: string;
  year:string;

  liqParcial: CuotaDetalle;
  liqTotal: CuotaDetalle;

  changeSubject: Subject<any> = new Subject<any>();
  changeStream: Observable<any> = this.changeSubject.asObservable();

  public constructor(init?: any) {
    this.clasificacion = "S";
    console.log("this.clasificacion", this.clasificacion);
    this.fechaVencimientoOriginal = init.fechaVcto;
    // this.fechaVcto = this.fechaVencimientoOriginal;
    console.log(this.fechaVencimientoOriginal);
    console.log(this.fechaVcto);
    this.year = this.fechaVencimientoOriginal.substring(0,4);
    console.log(this.year);
    this.month = this.fechaVencimientoOriginal.substring(5,7);
    console.log(this.month);
    this.day = this.fechaVencimientoOriginal.substring(8,10);
    console.log(this.year);
    this.fechaVctoStr = this.day + "-" + this.month + "-" + this.year;
    console.log(this.fechaVctoStr);
    this.fechaVcto = this.formatDate(this.fechaVctoStr);
    console.log(this.fechaVcto);

    this.formFolio = init.formFolio;
    this.numeroCuota = init.numeroCuota;
    this.clienteTipo = init.clienteTipo;
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
    // return (date.getTime() - this.fechaVencimiento.getTime() > 0);
    return (date.getTime() - this.fechaVcto.getTime() > 0);
  }

  getYear(): any {
    // this.fechaVencimiento.getFullYear();
    this.fechaVcto.getFullYear();
  }
}
