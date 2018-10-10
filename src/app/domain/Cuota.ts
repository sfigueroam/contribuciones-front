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
    return new Date( fec[2] + '-' + fec[1] + '-' + fec[0] + 'T00:00:00');
  }

}
