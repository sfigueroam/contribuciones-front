import {Rol} from './Rol';
import {isNumeric} from 'rxjs/internal-compatibility';

export class Propiedad {

  public roles: Rol[];
  public direccion: string;

  constructor() {
    this.roles = [];
  }

  calcularTotalCondonado(): number {
    let total = 0;
    for (const rol of this.roles) {
      total += rol.calcularTotalCondonado();
    }
    return total;
  }

  calcularCondonacion() {
    let total = 0;
    for (const rol of this.roles) {
      total += rol.calcularCondonacion();
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

  addRol(rolArg: Rol): void {
    this.roles.push(rolArg);
  }

  private splitNombre(fullName: string): string {
    let slimName = '';
    for (let i = 0; i < fullName.length; i++) {
      const character = fullName.charAt(i);

      if (!isNumeric(character)) {
        slimName += character;
      } else {
        return slimName;
      }
    }

    return slimName;
  }

/*  desasociarRol(rol: Rol[]) {
    let rolTmp: Rol[];
    for (const ro of rol) {
      rolTmp = [];
      for (const r of this.roles) {
        if (r.rol !== ro.rol) {
          rolTmp.push(r);
        }
      }
      this.roles = rolTmp;
    }
  }
*/
  desasociarRol(rol: Rol) {
    let rolTmp = [];
    for (const r of this.roles) {
      if (r.rol !== rol.rol) {
        rolTmp.push(r);
      }
    }
    this.roles = rolTmp;
  }
}
