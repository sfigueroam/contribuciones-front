import {Cuota} from './Cuota';
import {Quote} from '../modulos/modelo';

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
  checkedAllCuotas: boolean[number] = [];

  public constructor(init?: Partial<Rol>) {
    Object.assign(this, init);
  }


  pushCuota(cuota: Cuota[], year: number): void {
    if (this.cuotas === undefined) this.cuotas = new Map<number, Cuota[]>();

    this.cuotas.set(year, cuota);
    this.checkedAllCuotas[year] = true;
  }

  getYaers(): number[] {
    return Array.from(this.cuotas.keys());
  }

  getCuotas(year): Cuota[] {
    return this.cuotas.get(year);
  }

  isCheckedAllCuotasForYear(year: number): boolean {
    this.checkedAllCuotas[year] = true;
    let subCuota: Cuota[] = this.cuotas.get(year);
    for (let i = 0; i < subCuota.length; i++) {
      if (!subCuota[i].checked) {
        this.checkedAllCuotas[year] = false;
      }
    }
    return this.checkedAllCuotas[year];

  }

  clickCheckedAll(year: number): boolean {
    let checkedCuotaAll = !this.checkedAllCuotas[year];
    let subCuota: Cuota[] = this.cuotas.get(year);
    for (let i = 0; i < subCuota.length; i++) {
      subCuota[i].checked = checkedCuotaAll;
    }
    this.checkedAllCuotas[year] = checkedCuotaAll;
  }
}

