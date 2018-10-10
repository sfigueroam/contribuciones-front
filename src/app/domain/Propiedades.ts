import {Rol} from './Rol';

export class Propiedades {

  rol: Rol[];

  setRol(rolArg: Rol[]): void {
    this.rol = rolArg;
  }

  addRol(rolArg: Rol): void {

    if( this.rol === undefined) this.rol = [];

    this.rol.push(rolArg);
  }

}
