export class Cuota {
  clasificacion: string;
  codigoBarra: string;
  condonacion: number;
  fechaVencimiento: Date;
  folio: string;
  interes: number;
  montoCondonacion: number;
  multa: number;
  nroRol: number;
  numeroCuota: string;
  reajuste: number;
  saldoOriginal: number;
  saldoPesos: number;
  tipoDeuda: string;

  public constructor(init?: Partial<Cuota>) {
    Object.assign(this, init);
    this.fechaVencimiento = this.formatDate(init.fechaVencimiento);
  }

  formatDate(fecha){
    let fec = fecha.split('-');
    return new Date(fec[2], fec[1], fec[0], 0,0,0);
  }
  getYear(): any {
    this.fechaVencimiento.getFullYear();
  }


  isVencida(): boolean{
    let date = new Date();
    date.setHours(0, 0, 0, 0, );
    let diff = date.getTime() - this.fechaVencimiento.getTime();
    return  (diff > 0);
  }
}
