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
  cuoton4: boolean = false;
  cuoton3: boolean = false;
  cuoton2: boolean = false;
  cuoton1: boolean = false;
  esCuoton: string;
  nroCuotaTotal: string;
  nroCuota: string;

  liqTotal: CuotaDetalle;

  changeSubject: Subject<any> = new Subject<any>();
  changeStream: Observable<any> = this.changeSubject.asObservable();

  public constructor(init?: any) {
    this.clasificacion = "S";
    this.fechaVencimientoOriginal = init.fechaVcto;
    this.year = this.fechaVencimientoOriginal.substring(0,4);
    this.month = this.fechaVencimientoOriginal.substring(5,7);
    this.day = this.fechaVencimientoOriginal.substring(8,10);
    this.fechaVctoStr = this.day + "-" + this.month + "-" + this.year;
    this.fechaVcto = this.formatDate(this.fechaVctoStr);

    this.formFolio = init.formFolio;
    this.numeroCuota = init.numeroCuota;
    this.clienteTipo = init.clienteTipo;
    this.expired = this.isExpired();
    this.liqTotal = new CuotaDetalle(init);
    this.esCuoton = init.esCuoton;
    this.nroCuotaTotal = init.nroCuota;
    this.nroCuota = this.nroCuotaTotal.substring(0,1);

    if (this.esCuoton == 'S' && this.nroCuota == '4'){
      this.cuoton4 = true;
    }
    if (this.esCuoton == 'S' && this.nroCuota == '3'){
      this.cuoton3 = true;
    }
    if (this.esCuoton == 'S' && this.nroCuota == '2'){
      this.cuoton2 = true;
    }
    if (this.esCuoton == 'S' && this.nroCuota == '1'){
      this.cuoton1 = true;
    }
  }

  changeIntencionPago(value: boolean = !this.intencionPago) {
    // console.log("value", value);
    this.intencionPago = value;
    // console.log("intencion de pago", this.intencionPago);
    this.changeSubject.next();
  }
  
  // intencionPagoCuoton(value: boolean = !this.intencionPago){
  //   if (this.esCuoton == 'S'){
  //     this.intencionPago = value;
  //     this.changeSubject.next();
  //   }
  // }

  private formatDate(fecha) {
    const fec = fecha.split('-');
    return new Date(fec[2], fec[1] - 1, fec[0], 0, 0, 0);
  }

  private isExpired(): boolean {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return (date.getTime() - this.fechaVcto.getTime() > 0);
  }

  getYear(): any {
    this.fechaVcto.getFullYear();
  }
}
