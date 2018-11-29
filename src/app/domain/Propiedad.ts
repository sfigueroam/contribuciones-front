import {Rol} from './Rol';
import {TipoCuota} from './TipoCuota';
import {ResumenCuotas} from './ResumenCuotas';
import {Observable, Subject} from 'rxjs';

export class Propiedad {

  public roles: Rol[];
  public direccion: string;
  public idDireccion: string;

  isComplete = false;

  changeSubject: Subject<any> = new Subject<any>();
  changeStream: Observable<any> = this.changeSubject.asObservable();

  total: number;

  constructor() {
    this.roles = [];
    this.idDireccion = '';
  }

  addRol(rol: Rol) {
    this.roles.push(rol);
    rol.completeStream.subscribe(
      () => null,
      (err) => console.log(err),
      () => {
        for (const r of this.roles) {
          if (!r.isComplete) {
            return;
          }
        }
        this.isComplete = true;
        this.calcularTotal();
        for (const r of this.roles) {
          r.changeStream.subscribe(
            () => this.changeSubject.next()
          );
        }
      }
    );
  }

  private calcularTotal() {
    let total = 0;
    for (const r of this.roles) {
      total += r.total;
    }
    this.total = total;
  }

  resumen(): ResumenCuotas {
    const result = new ResumenCuotas();
    for (const rol of this.roles) {
      const resumenRol = rol.resumen();
      result.total += resumenRol.total;
      result.seleccionadas += resumenRol.seleccionadas;
      result.vencidas += resumenRol.vencidas;
      result.vencidasSeleccionadas += resumenRol.vencidasSeleccionadas;
    }
    return result;
  }

  calcularTotalCondonado(): number {
    let total = 0;
    for (const rol of this.roles) {
      total += rol.calcularTotalCondonado();
    }
    return total;
  }

  tieneCuotasSeleccionadas(): boolean {
    for (const rol of this.roles) {
      if (rol.cantidadCuotasSeleccionadas() > 0) {
        return true;
      }
    }
    return false;
  }

  desasociarRol(rol: Rol) {
    this.roles = this.roles.filter((r) => {
      return r.rol !== rol.rol;
    });


  }

  existRol(rol: number): boolean {
    console.log('!!existRol');
    for (const r of this.roles) {
      console.log('r.rol', r.rol);
      console.log('rol', rol);
      if (r.rol === rol) {
        return true;
      }
    }
    return false;
  }


  seleccionar(tipo: TipoCuota) {
    for (const rol of this.roles) {
      rol.seleccionar(tipo);
    }
  }
}
