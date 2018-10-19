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
  checked: boolean;

  public constructor(init?: Partial<Cuota>) {
    Object.assign(this, init);
    this.fechaVencimiento = this.formatDate(init.fechaVencimiento);
    this.checked = true;
  }

  private formatDate(fecha) {
    const fec = fecha.split('-');
    return new Date(fec[2], fec[1], fec[0], 0, 0, 0);
  }

  getYear(): any {
    this.fechaVencimiento.getFullYear();
  }

  isExpired(): boolean {
    const date = new Date();
    date.setHours(0, 0, 0, 0,);
    return (date.getTime() - this.fechaVencimiento.getTime() > 0);
  }

  isChecked(): boolean {
    return this.checked;
  }
}
