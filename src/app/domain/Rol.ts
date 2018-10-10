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

  public constructor(init?: Partial<Rol>) {
    Object.assign(this, init);
  }


  pushCuota(cuota: Cuota[], year: number): void {
    if(this.cuotas === undefined) this.cuotas = new Map<number, Cuota[]>();
    this.cuotas.set(year, cuota);
  }
}
