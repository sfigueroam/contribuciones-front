import {Injectable} from '@angular/core';
import {Propiedad} from '../domain/Propiedad';
import {Rol} from '../domain/Rol';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  procesarPropiedades(bienesRaices: { direccion: string, rolId: number, rolComunaSiiCod: number }[]): Propiedad[] {
    const roles = [];
    const propiedadMap = new Map<string, Propiedad>();
    for (const bienRaiz of bienesRaices) {
      const idPropiedad = this.getBienRaizId(bienRaiz);
      let propiedad = propiedadMap.get(idPropiedad);
      if (!propiedad) {
        propiedad = new Propiedad();
        propiedad.direccion = bienRaiz.direccion;
        propiedad.idDireccion = idPropiedad;
        propiedadMap.set(idPropiedad, propiedad);
      }
      const rol = new Rol(bienRaiz);
      propiedad.addRol(rol);
      roles.push(rol);
    }
    return Array.from(propiedadMap.values());
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }
}
