import {CuotaDetalle} from './CuotaDetalle';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
 


export class Cuota {
  clasificacion: string;
  fechaVcto: Date;
  fechaVctoStr: Date;
  fechaVctoStr1: any;
  fechaVctoStr3: Date;
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
    // this.fechaVencimiento = this.formatDate(init.fechaVencimiento);
    this.fechaVctoStr = init.fechaVcto;
    console.log("this.fechaVctoStr", this.fechaVctoStr);
    this.fechaVctoStr1 = moment(this.fechaVctoStr);
    console.log("this.fechaVctoStr1", this.fechaVctoStr1);
    
    
    
    this.fechaVencimientoOriginal = init.fechaVcto;
    // this.folio = init.folio;
    this.formFolio = init.formFolio;
    this.numeroCuota = init.numeroCuota;
    // this.tipoDeuda = init.tipoDeuda;
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
