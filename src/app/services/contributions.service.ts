import {Injectable} from '@angular/core';
import {Dummy} from '../modulos/dummy';
import {Rol} from '../domain/Rol';
import {Cuota} from '../domain/Cuota';
import {Propiedad} from '../domain/Propiedad';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {ListadoPropiedadRolComponent} from '../components/contribuciones/listado/listado-propiedad-rol/listado-propiedad-rol.component';

@Injectable({
  providedIn: 'root'
})
export class ContributionsService {

  dummy: Dummy = new Dummy();

  propiedades: Propiedad[];
  rolesNoAsociados: Rol[];


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


  getObtenerRoles(propiedades: Propiedad[], listadoComponent, count?: number): Promise<{}> {

    if (!count) {
      count = 0;
    }

    if (propiedades.length === count) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    let propiedad = propiedades[count];
    return new Promise((resolve, reject) => {
      this.getRol(propiedad.roles, listadoComponent, 0).then(() => {
        this.getObtenerRoles(propiedades, listadoComponent, (count + 1)).then(() => {
          resolve();
        });
      });
    });

  }

  getRolUpdate(rol: Rol, rolComponent: ListadoPropiedadRolComponent, update?: boolean): Promise<{}> {
    return new Promise((resolve, reject) => this.getDeudaByRol(rol.rol, rol.getCuotaRequest()).then((data: { listaDeudaRol: any[] }) => {
      for (const deuda of data.listaDeudaRol) {
        if (!update) {
          const cuota = new Cuota(deuda);
          const idCuota = this.getCuotaAnio(cuota);
          if (!rol.cuotas.has(idCuota)) {
            rol.cuotas.set(idCuota, []);
          }
          rol.cuotas.get(idCuota).push(cuota);
        } else {
          rol.actualizarCuota(deuda);
        }
      }
      rolComponent.actualizarTipoTotal();
      resolve();
    }));
  }

  getRol(roles: Rol[], listadoComponent, count): Promise<{}> {
    const rol = roles[count];
    if (rol === undefined) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    if (rol.cuotas.size > 0) {
      return this.getRol(roles, listadoComponent, (count + 1));
    } else {
      return this.getDeudaByRol(rol.rol, rol.cuotas).then((data: { listaDeudaRol: any[] }) => {
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
    let obtenerBienRaizAsociado = environment.servicios.obtenerBienRaizAsociado;
    obtenerBienRaizAsociado.path = obtenerBienRaizAsociado.path + '/' + this.user.rut;
    return this.request(obtenerBienRaizAsociado);
  }

  private getDeudas(rol: number): any {
    return this.dummy.getDeudas(rol).listaDeudaRol;
  }

  private request(servicio: { url: string, path: string, method: string }, body?): Promise<{}> {
    const params = {
      'path': servicio.path
    };
    return new Promise((resolve, reject) => {
      this.http.request(servicio.method,
        servicio.url,
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

  private getDeudaByRol(rol, cuotas?: any): Promise<{}> {
    const body = {
      'idRol': rol,
      'listaCuotas': Array.from(cuotas.values())
    };
    return this.request(environment.servicios.recuperarDeudaRol, body);
  }

  getRolesNoAsociados(): Promise<Rol[]> {
    if (this.rolesNoAsociados) {
      return new Promise((resolve, reject) => {
        resolve(this.rolesNoAsociados);
      });
    }

    return new Promise((resolve, reject) => {
      let obtenerBienRaizNoAsociado = environment.servicios.obtenerBienRaizNoAsociado;
      obtenerBienRaizNoAsociado.path = obtenerBienRaizNoAsociado.path + '/' + this.user.rut;
      this.request(environment.servicios.obtenerBienRaizNoAsociado).then((data: { curout: any }) => {
        for (const bienRaiz of data.curout) {
          if (!this.rolesNoAsociados) {
            this.rolesNoAsociados = [];
          }
          const rol = new Rol(bienRaiz);
          this.rolesNoAsociados.push(rol);
        }
        resolve(this.rolesNoAsociados);
      });
    });
  }
}
