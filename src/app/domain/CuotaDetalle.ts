export class CuotaDetalle {
  codigoBarraParcial: string;
  codigoBarraTotal: string;
  condonaParcial: number;
  condonaTotal: number;
  esCuoton: string
  interesesParcial: number;
  interesesTotal: number;
  montoNetoParcial: number;
  montoNetoTotal: number;
  montoTotalParcial: number;
  montoTotalTotal: number;
  multasParcial: number;
  multasTotal: number;
  reajustesParcial: number;
  reajustesTotal: number;
  rutRol: number;
  nroCuota: string;  

  public constructor(init?: any) {
    this.codigoBarraParcial = init.codigoBarraParcial;
    this.codigoBarraTotal = init.codigoBarraTotal;
    this.condonaParcial = init.condonaParcial;
    this.condonaTotal = init.condonaTotal;
    this.esCuoton = init.esCuoton;
    this.interesesParcial = init.interesesParcial;
    this.interesesTotal = init.interesesTotal;
    this.montoTotalParcial = init.montoTotalParcial;
    this.montoTotalTotal = init.montoTotalTotal;
    this.multasParcial = init.multasParcial;
    this.multasTotal = init.multasTotal;
    this.reajustesParcial = init.reajustesParcial;
    this.reajustesTotal = init.reajustesTotal;
    this.rutRol = init.rutRol;
    this.nroCuota = init.nroCuota;
  }
}
