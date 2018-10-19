import {Cuota} from './Cuota';

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
  }

  // Revisa si existe alguna cuota vencida
  hasExpiredQuotes(): boolean {
    for (const year of Array.from(this.cuotas.keys())) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.isExpired()) {
          return true;
        }
      }
    }
    return false;
  }

  // Revisa si todas las cuotas de un ano estan seleccionadas
  allChecked(year: number): boolean {
    for (const cuota of Array.from(this.cuotas.get(year).values())) {
      if (!cuota.checked) {
        return false;
      }
    }
    return true;
  }

  // Revisa si todas las cuotas de un ano estan des seleccionadas
  noneChecked(year: number): boolean {
    for (const cuota of Array.from(this.cuotas.get(year).values())) {
      if (cuota.checked) {
        return false;
      }
    }
    return true;
  }

  // Marca todas las cuotas de un ano como seleccionadas
  checkAll(year: number): void {
    for (const cuota of Array.from(this.cuotas.get(year).values())) {
      cuota.checked = true;
    }
  }

  // Marca todas las cuotas de un ano como de sseleccionadas
  checkNone(year: number): void {
    for (const cuota of Array.from(this.cuotas.get(year).values())) {
      cuota.checked = false;
    }
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

  getCuotas(year): Cuota[] {
    return this.cuotas.get(year);
  }
}
