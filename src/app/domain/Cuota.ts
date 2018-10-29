export class Cuota {
  clasificacion: string;
  codigoBarra: string;
  condonacion: number;
  fechaVencimiento: Date;
  fechaVencimientoOriginal: string;
  folio: string;
  interes: number;
  montoCondonacion: number;
  multa: number;
  nroRol: number;
  numeroCuota: string;
  reajuste: number;
  saldoOriginal: number;
  saldoTotal: number;
  tipoDeuda: string;
  intencionPago: boolean;
  expired: boolean;

  public constructor(init?: Partial<Cuota>) {
    Object.assign(this, init);
    // @ts-ignore
    this.fechaVencimientoOriginal = init.fechaVencimiento;
    this.fechaVencimiento = this.formatDate(init.fechaVencimiento);
    this.intencionPago = true;
    this.expired = this.isExpired();
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

  isChecked(): boolean {
    return this.intencionPago;
  }

  getTotal(): number {
    return this.saldoTotal + this.montoCondonacion;
  }

  getYear(): any {
    this.fechaVencimiento.getFullYear();
  }
}
