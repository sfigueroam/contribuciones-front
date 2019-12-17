import {CuotaDetalle} from './CuotaDetalle';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';

export class Cuota {
  clasificacion: string;
  fechaVcto: Date;
  fechaVctoStr: Date;
  fechaVctoStr2: string;
  fechaVencimientoOriginal: string;
  formFolio: string;
  numeroCuota: string;
  clienteTipo: string;
  intencionPago = true;
  expired: boolean;

  liqParcial: CuotaDetalle;
  liqTotal: CuotaDetalle;

  changeSubject: Subject<any> = new Subject<any>();
  changeStream: Observable<any> = this.changeSubject.asObservable();

  public constructor(init?: any) {
    this.clasificacion = "S";
    console.log("this.clasificacion", this.clasificacion);
    this.fechaVencimientoOriginal = init.fechaVcto;
    var dateObj = new Date(this.fechaVencimientoOriginal);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('DD-MM-YYYY');
    console.log("momentString", momentString);
    

    
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
