import {Injectable} from '@angular/core';
import {Propiedad} from '../domain/Propiedad';
import {UserService} from './user.service';
import {environment} from '../../environments/environment';
import {Rol} from '../domain/Rol';
import {RequestService} from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesSugeridasService {


  rolesNoAsociados: Propiedad[];


  constructor(private requestService: RequestService, private user: UserService) {
  }

  getRolesNoAsociados(force?: boolean): Promise<Propiedad[]> {
    if (this.rolesNoAsociados && !force) {
      return new Promise((resolve, reject) => {
        resolve(this.rolesNoAsociados);
      });
    }


    return new Promise((resolve, reject) => {
      const obtenerBienRaizNoAsociado = Object.assign({}, environment.servicios.obtenerBienRaizNoAsociado);
      obtenerBienRaizNoAsociado.path = obtenerBienRaizNoAsociado.path + '/' + this.user.rut;
      this.requestService.request(obtenerBienRaizNoAsociado).then((data: { curout: any }) => {

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
      });
    });
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }

  asociarRoles(roles: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let promesas = [];

      for (let rol of roles) {
        const body = {
          'rutin': this.user.rut,
          'rolin': rol.toString()
        };
        promesas.push(this.requestService.request(environment.servicios.asociarBienRaiz,body));
      }
      Promise.all(promesas).then(() => {
          resolve();
        },
        () => {
          reject();
        });
    });
  }
}
