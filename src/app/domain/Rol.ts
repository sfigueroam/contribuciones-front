import {Cuota} from './Cuota';
import {TipoCuota} from './TipoCuota';

export class Rol {

  comuna: string;
  destPropiedad: string;
  dirPostal: string;
  dirPredial: string;
  direccion: string;
  idComuna: number;
  idDestPropiedad: string;
  rol: number;
  rolComunaSiiCod: number;
  rolId: number;
  subrolId: number;
  cuotas: Map<number, Cuota[]>;

  public constructor(init?: Partial<Rol>) {
    Object.assign(this, init);
    this.cuotas = new Map<number, Cuota[]>();
  }

  // Revisa si existe alguna cuota vencida
  hasExpiredQuotes(): boolean {
    for (const year of Array.from(this.cuotas.keys())) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.expired) {
          return true;
        }
      }
    }
    return false;
  }

  private all(checked: boolean, year: number): boolean{
    if (year) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.checked !== checked) {
          return false;
        }
      }
    } else {
      for (const aYear of Array.from(this.cuotas.keys())) {
        for (const cuota of Array.from(this.cuotas.get(aYear).values())) {
          if (cuota.checked !== checked) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // Revisa si todas las cuotas de un ano estan seleccionadas
  allChecked(year: number): boolean {
    return this.all(true, year);
  }

  // Revisa si todas las cuotas de un ano estan des seleccionadas
  noneChecked(year: number): boolean {
    return this.all(false, year);
  }

  pushCuota(cuota: Cuota[], year: number): void {
    if (this.cuotas === undefined) {
      this.cuotas = new Map<number, Cuota[]>();
    }

    this.cuotas.set(year, cuota);
  }

  getYears(): number[] {
    return Array.from(this.cuotas.keys()).sort();
  }

  seleccionar(tipo: TipoCuota, aYear?: number) {
    let yearList = [];
    if (aYear) {
      yearList.push(aYear);
    } else {
      yearList = this.getYears();
    }

    for (const year of yearList) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (tipo === TipoCuota.TODAS) {
          cuota.checked = true;
        } else if (tipo === TipoCuota.NINGUNA) {
          cuota.checked = false;
        } else if (tipo === TipoCuota.VENCIDAS) {
          cuota.checked = cuota.expired;
        } else if (tipo === TipoCuota.VIGENTES) {
          cuota.checked = !cuota.expired;
        }
      }
    }
  }

  calcularTipo(): Array<TipoCuota> {
    const result = new Array();

    let total = 0;
    let vencidas = 0;
    let seleccionadas = 0;
    let seleccionadasVencidas = 0;

    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        total++;
        if (cuota.expired) {
          vencidas++;
          if (cuota.checked) {
            seleccionadasVencidas++;
          }
        }
        if (cuota.checked) {
          seleccionadas++;
        }
      }
    }

    if (seleccionadas === seleccionadasVencidas && seleccionadas === vencidas) {
      result.push(TipoCuota.VENCIDAS);
    }
    if (seleccionadasVencidas === 0 && seleccionadas === (total - vencidas)) {
      result.push(TipoCuota.VIGENTES);
    }
    if (total === seleccionadas) {
      result.push(TipoCuota.TODAS);
    }
    if (seleccionadas === 0) {
      result.push(TipoCuota.NINGUNA);
    }
    return result;
  }

  cuotasSeleccionadas(): Cuota[] {
    const cuotas = [];
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.checked) {
          cuotas.push(cuota);
        }
      }
    }
    return cuotas;
  }

  calcularTotalCondonado(): number {
    let total = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.checked) {
          total += cuota.saldoPesos;
        }
      }
    }
    return total;
  }

  calcularTotal(): number {
    let total = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.checked) {
          total += cuota.saldoPesos + cuota.montoCondonacion;
        }
      }
    }
    return total;
  }

  calcularCondonacion() {
    let condonacion = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.checked) {
          condonacion += cuota.montoCondonacion;
        }
      }
    }
    return condonacion;
  }

  cantidadCuotas() {
    let cantidad = 0;
    for (const year of this.getYears()) {
      cantidad += this.cuotas.get(year).length;
    }
    return cantidad;
  }

  cantidadCuotasSeleccionadas() {
    let cantidad = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.checked) {
          cantidad++;
        }
      }
    }
    return cantidad;
  }

  allCuotas(): Cuota[] {
    const cuotas = [];
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        cuotas.push(cuota);
      }
    }
    return cuotas;
  }
}
