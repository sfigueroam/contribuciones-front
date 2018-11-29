export class CuotaDetalle {
  codigoBarra: string;
  condonacion: number;
  interes: number;
  montoCondonacion: number;
  multa: number;
  nroRol: number;
  reajuste: number;
  saldoOriginal: number;
  saldoTotal: number;

  public constructor(init?: any) {
    this.codigoBarra = init.codigoBarra;
    this.condonacion = init.condonacion;
    this.interes = init.interes;
    this.montoCondonacion = init.montoCondonacion;
    this.multa = init.multa;
    this.nroRol = init.nroRol;
    this.reajuste = init.reajuste;
    this.saldoOriginal = init.saldoOriginal;
    this.saldoTotal = init.saldoTotal;
  }
}
