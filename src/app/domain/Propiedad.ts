import {Rol} from './Rol';
import {isNumeric} from 'rxjs/internal-compatibility';

export class Propiedad {

  public rol: Rol[];
  public direccion: string;

  setRol(rolArg: Rol[]): void {
    this.rol = rolArg;
  }

  addRol(rolArg: Rol): void {

    if (this.rol === undefined) {
      this.rol = [];
      this.direccion = this.splitNombre(rolArg.direccion);
    }

    this.rol.push(rolArg);
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
}
