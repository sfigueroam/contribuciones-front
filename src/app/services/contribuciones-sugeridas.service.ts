import {Injectable} from '@angular/core';
import {Propiedad} from '../domain/Propiedad';
import {environment} from '../../environments/environment';
import {Rol} from '../domain/Rol';
import {RequestService} from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesSugeridasService {

  rolesNoAsociados: Propiedad[];

  constructor(private requestService: RequestService) {
  }

  getRolesNoAsociados(rut: number, force?: boolean): Promise<Propiedad[]> {
    if (rut == null) {
      this.rolesNoAsociados = [];
    }
    if (this.rolesNoAsociados && !force) {
      return new Promise((resolve) => {
        resolve(this.rolesNoAsociados);
      });
    }
    return new Promise((resolve, reject) => {
      const obtenerBienRaizNoAsociado = Object.assign({}, environment.servicios.obtenerBienRaizNoAsociado);
      obtenerBienRaizNoAsociado.url = obtenerBienRaizNoAsociado.url + '/' + rut;
      this.requestService.request(obtenerBienRaizNoAsociado).then(
        (data: { curout: any }) => {

          const propiedadSugeridasMap = new Map<string, Propiedad>();

          for (const bienRaiz of data.curout) {
            const idPropiedad = this.getBienRaizId(bienRaiz);
            let propiedad = propiedadSugeridasMap.get(idPropiedad);
            if (!propiedad) {
              propiedad = new Propiedad();
              propiedad.direccion = bienRaiz.direccion;
              propiedadSugeridasMap.set(idPropiedad, propiedad);
            }
            const rol = new Rol(bienRaiz);
            propiedad.addRol(rol);
          }
          this.rolesNoAsociados = Array.from(propiedadSugeridasMap.values());

          resolve(this.rolesNoAsociados);
        },
        err => reject(err)
      );
    });
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }

  asociarRoles(rut: number, roles: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const promesas = [];

      for (const rol of roles) {
        const body = {
          'rutin': String(rut),
          'rolin': rol.toString()
        };
        promesas.push(this.requestService.request(environment.servicios.asociarBienRaiz, body));
      }
      Promise.all(promesas).then(() => {
          resolve();
        },
        () => {
          reject();
        });
    });
  }

  clearPropiedades() {
    this.rolesNoAsociados = undefined;
  }
}
