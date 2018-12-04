import {Injectable} from '@angular/core';
import {Rol} from '../domain/Rol';
import {Cuota} from '../domain/Cuota';
import {Propiedad} from '../domain/Propiedad';
import {environment} from '../../environments/environment';
import {RequestService} from './request.service';
import {CuotaDetalle} from '../domain/CuotaDetalle';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesService {

  propiedades: Propiedad[];

  constructor(private requestService: RequestService) {
  }

  clearPropiedades(): void {
    this.propiedades = undefined;
  }

  addPropiedad(response: Propiedad) {
    if (this.propiedades === undefined || this.propiedades == null) {
      this.propiedades = [];
    }
    let estado: boolean = false;
    for (const prop of this.propiedades) {
      if (prop.idDireccion === response.idDireccion) {
        estado = true;
        for (const rol of response.roles) {
          if (!prop.existRol(rol.rol)) {
            console.log('Rol no existe');
            prop.addRol(rol);
          }
        }
      }
    }

    if (!estado) {
      this.propiedades.push(response);
    }
  }

  updateBienesRaices(rut: number) {
    return new Promise<Propiedad[]>(
      (resolve, reject) => {
        const roles = [];
        this.getBienRaiz(rut).then(
          (data: { curout: any }) => {
            // Se construye un mapa para poder asociar los roles por dirección
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
              roles.push(rol);
            }
            this.propiedades = Array.from(propiedadMap.values());
            resolve(this.propiedades);
          }
        ).catch((err) => {
          console.error(err);
          reject(err);
        });
      }
    );
  }

  getBienesRaices(rut: number): Promise<Propiedad[]> {
    if (this.propiedades) {
      return new Promise((resolve) => {
        resolve(this.propiedades);
      });
    } else {
      return this.updateBienesRaices(rut);
    }
  }

  async cargarRoles(): Promise<any> {
    for (const propiedad of this.propiedades) {
      for (const rol of propiedad.roles) {
        await this.cargarRol(rol);
        rol.complete();
      }
    }
  }

  private cargarRol(rol: Rol): Promise<any> {
    return new Promise(
      (resolve, reject) => this.getDeudaByRol(rol.rol, []).then(
        (data: { listaDeudaRol: any[] }) => {
          const mapCuotas = new Map<string, Cuota>();
          for (const deuda of data.listaDeudaRol) {
            const cuota = new Cuota(deuda);
            mapCuotas.set(cuota.numeroCuota, cuota);
            rol.cuotas.push(cuota);
          }
          this.getDeudaByRol(rol.rol, rol.getCuotasDeseleccionadas()).then(
            (data2: { listaDeudaRol: { numeroCuota: string }[] }) => {
              for (const deuda of data2.listaDeudaRol) {
                const cuota = mapCuotas.get(deuda.numeroCuota);
                cuota.liqParcial = new CuotaDetalle(deuda);
              }
              resolve();
            },
            (err) => reject(err)
          );
        },
        (err) => reject(err)
      )
    );
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }

  private getBienRaiz(rut: number): Promise<{}> {
    const obtenerBienRaizAsociado = Object.assign({}, environment.servicios.obtenerBienRaizAsociado);
    obtenerBienRaizAsociado.path = obtenerBienRaizAsociado.path + '/' + rut;
    return this.requestService.request(obtenerBienRaizAsociado);
  }

  private getDeudaByRol(rol, cuotas?: any): Promise<{}> {
    const body = {
      'idRol': rol,
      'listaCuotas': Array.from(cuotas.values())
    };
    return this.requestService.request(environment.servicios.recuperarDeudaRol, body);
  }

  eliminarPropiedad(rut: number, idDireccion: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        const index = this.propiedades.findIndex(p => p.idDireccion === idDireccion);
        const propiedad = this.propiedades[index];
        this.propiedades.splice(index, 1);
        const promises = [];
        for (const rol of propiedad.roles) {
          promises.push(this.desasociarRol(rut, rol));
        }
        Promise.all(promises).then(
          value => {
            propiedad.changeSubject.next();
            propiedad.changeSubject.complete();
            resolve(value);
          },
          err => reject(err)
        );
      }
    );
  }

  eliminarRol(rut: number, rolComunaSiiCod: number, rolId: number, subrolId: number): Promise<any> | undefined {
    return new Promise<any>(
      (resolve, reject) => {
        let rol;
        for (const propiedad of this.propiedades) {
          const index = propiedad.roles.findIndex(r => r.rolComunaSiiCod === rolComunaSiiCod &&
            r.rolId === rolId && r.subrolId === subrolId);
          if (index >= 0) {
            rol = propiedad.roles[index];
            propiedad.roles.splice(index, 1);
            rol.changeSubject.next();
            rol.changeSubject.complete();
            this.desasociarRol(rut, rol).then(
              value => resolve(value),
              err => reject(err)
            );
          }
        }
        if (!rol) {
          reject('No se encontró el rol (' + rolComunaSiiCod + ', ' + rolId + ', ' + subrolId);
        }
      }
    );
  }

  private desasociarRol(rut: number, rol: Rol): Promise<any> {
    const body = {
      'rutin': String(rut),
      'rolin': rol.rol.toString()
    };
    return this.requestService.request(environment.servicios.desasociarBienRaiz, body);
  }
}
