import {TipoCuota} from './TipoCuota';

export class ResumenCuotas {
  total: number;
  seleccionadas: number;
  vencidas: number;
  vencidasSeleccionadas: number;

  public constructor() {
    this.total = 0;
    this.seleccionadas = 0;
    this.vencidas = 0;
    this.vencidasSeleccionadas = 0;
  }

  tipo(): TipoCuota {
    if (this.total === this.seleccionadas) {
      return TipoCuota.TODAS;
    } else if (this.seleccionadas === 0) {
      return TipoCuota.NINGUNA;
    } else if (this.vencidas === this.vencidasSeleccionadas && this.vencidas === this.seleccionadas) {
      return TipoCuota.VENCIDAS;
    }
    return undefined;
  }
}
