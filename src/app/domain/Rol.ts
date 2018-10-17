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
  checkedAllCuotas: boolean[] = [];
  showMsgCuotasVencidas: boolean;

  public constructor(init?: Partial<Rol>) {
    Object.assign(this, init);
  }


  pushCuota(cuota: Cuota[], year: number): void {
    if (this.cuotas === undefined) this.cuotas = new Map<number, Cuota[]>();

    this.cuotas.set(year, cuota);
    this.checkedAllCuotas[year] = true;
  }

  getYaers(): any[] {
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

  clickCheckedAll(year: number): void {
    let checkedCuotaAll = !this.checkedAllCuotas[year];
    let subCuota: Cuota[] = this.cuotas.get(year);
    for (let i = 0; i < subCuota.length; i++) {
      subCuota[i].checked = checkedCuotaAll;
    }
    this.checkedAllCuotas[year] = checkedCuotaAll;
  }

  isShowMsgCuotasVencidas(): boolean {
    if (this.showMsgCuotasVencidas === undefined) {
      let years = this.getYaers();
      for (let i = 0; i < years.length; i++) {
        let cuotas = this.getCuotas(years[i]);
        for (let j = 0; j < cuotas.length; j++) {
          if (cuotas[j].isVencida()) {
            this.showMsgCuotasVencidas = true;
            return this.showMsgCuotasVencidas;
          }
        }
      }
      if (this.showMsgCuotasVencidas === undefined) {
        this.showMsgCuotasVencidas = false;
      }
    }
    return this.showMsgCuotasVencidas;
  }

  clickHideMsgCuotasVencidas() {
    this.showMsgCuotasVencidas = false;
  }
}
