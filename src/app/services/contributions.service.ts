import {Injectable, QueryList} from '@angular/core';
import {Dummy} from '../modulos/dummy';
import {Rol} from '../domain/Rol';
import {Cuota} from '../domain/Cuota';
import {Propiedad} from '../domain/Propiedad';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {ListadoPropiedadComponent} from '../components/contribuciones/listado/listado-propiedad/listado-propiedad.component';

@Injectable({
  providedIn: 'root'
})
export class ContributionsService {

  dummy: Dummy = new Dummy();

  propiedades: Propiedad[];

  constructor(private http: HttpClient, private user: UserService) {

  }

  /*
    initBienesRaices(): void {

      const propiedadMap = new Map<string, Propiedad>();

      for (const bienRaiz of this.getBienRaiz()) {
        const idPropiedad = this.getBienRaizId(bienRaiz);
        let propiedad = propiedadMap.get(idPropiedad);
        if (!propiedad) {
          propiedad = new Propiedad();
          propiedad.direccion = bienRaiz.direccion;
          propiedadMap.set(idPropiedad, propiedad);
        }
        const rol = new Rol(bienRaiz);
        propiedad.addRol(rol);
        for (const deuda of this.getDeudas(bienRaiz.rol)) {
          const cuota = new Cuota(deuda);
          const idCuota = this.getCuotaAnio(cuota);
          if (!rol.cuotas.has(idCuota)) {
            rol.cuotas.set(idCuota, []);
          }
          rol.cuotas.get(idCuota).push(cuota);
        }
      }

      this.propiedades = Array.from(propiedadMap.values());
    }
  */
  getBienesRaices(): Promise<Propiedad[]> {

    if (this.propiedades) {
      return new Promise((resolve, reject) => {
        resolve(this.propiedades);
      });
    }

    return new Promise((resolve, reject) => {
      this.getBienRaiz().then(
        (data: { curout: any }) => {
          const propiedadMap = new Map<string, Propiedad>();

          for (const bienRaiz of data.curout) {
            const idPropiedad = this.getBienRaizId(bienRaiz);
            let propiedad = propiedadMap.get(idPropiedad);
            if (!propiedad) {
              propiedad = new Propiedad();
              propiedad.direccion = bienRaiz.direccion;
              propiedadMap.set(idPropiedad, propiedad);
            }
            const rol = new Rol(bienRaiz);
            propiedad.addRol(rol);
          }
          this.propiedades = Array.from(propiedadMap.values());
          resolve(this.propiedades);
        }
      );
    });


  }


  getObtenerRoles(propiedades: Propiedad[], listadoComponent, count?: number) {

    if (!count) {
      count = 0;
    }

    console.log('propiedades.length-> ', propiedades.length);
    console.log('propiedades-> ', propiedades);

    if (propiedades.length === count) {
      return;
    }
    let propiedad = propiedades[count];
    this.getRol(propiedad.roles, listadoComponent, 0).then(() => {
      this.getObtenerRoles(propiedades, listadoComponent, (count + 1));
    });

  }

  getRol(roles: Rol[], listadoComponent, count): Promise<{}> {
    const rol = roles[count];
    if (rol === undefined) {
      return new Promise(() => {});
    }
    if (rol.cuotas.size > 0) {
      return this.getRol(roles, listadoComponent, (count + 1));
    } else {
      return this.getDeudaByRol(rol.rol).then((data: { listaDeudaRol: any[] }) => {
        for (const deuda of data.listaDeudaRol) {
          const cuota = new Cuota(deuda);
          const idCuota = this.getCuotaAnio(cuota);
          if (!rol.cuotas.has(idCuota)) {
            rol.cuotas.set(idCuota, []);
          }
          rol.cuotas.get(idCuota).push(cuota);
        }
        listadoComponent.actualizar(rol.rol);
        return this.getRol(roles, listadoComponent, (count + 1));
      });
    }
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }

  private getCuotaAnio(cuota: Cuota): number {
    return parseInt(cuota.numeroCuota.split('-')[1], 10);
  }

  private getBienRaiz(): Promise<{}> {
    const path = environment.wsTierra.obtenerBienRaizAsociado + '/' + this.user.rut;
    return this.apiTgr(path, 'GET');
  }

  private getDeudas(rol: number): any {
    return this.dummy.getDeudas(rol).listaDeudaRol;
  }

  private apiTgr(path, method, body?): Promise<{}> {
    const params = {
      'path': path
    };
    return new Promise((resolve, reject) => {
      this.http.request(method,
        environment.urlWsTierra,
        {
          body: body,
          params: params,
          responseType: 'json'
        }
      ).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log('Error', err);
          reject();
        }
      );
    });
  }

  private getDeudaByRol(rol): Promise<{}> {
    const path = environment.wsTierra.recuperarDeudaRol;
    const body = {
      'idRol': rol,
      'listaCuotas': []
    };
    return this.apiTgr(path, 'POST', body);
  }
}
