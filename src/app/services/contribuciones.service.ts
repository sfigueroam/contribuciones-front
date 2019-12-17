import {Injectable} from '@angular/core';
import {Rol} from '../domain/Rol';
import {Cuota} from '../domain/Cuota';
import {Propiedad} from '../domain/Propiedad';
import {environment} from '../../environments/environment';
import {RequestService} from './request.service';
import {CuotaDetalle} from '../domain/CuotaDetalle';
import {UtilService} from './util.service';
import {Direccion} from '../domain/Direccion';
import {UserDataService} from '../user-data.service';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesService {

  propiedades: Propiedad[];
  noLiquidable: boolean;

  constructor(private requestService: RequestService, 
              private util: UtilService,
              private userdataservice: UserDataService,) {

  }

  clearPropiedades(): void {
    this.propiedades = [];
  }

  getCountPropiedad() {
    let cantidad = 0;
    if (this.propiedades === undefined || this.propiedades == null) {
      return 0;
    }

    for (const prop of this.propiedades) {
      cantidad = cantidad + prop.countRol();
    }
    return cantidad;

  }

  addPropiedad(response: Propiedad) {
    if (this.propiedades === undefined || this.propiedades == null) {
      this.propiedades = [];
    }
    let estado = false;
    for (const prop of this.propiedades) {
      if (prop.idDireccion === response.idDireccion) {
        estado = true;
        for (const rol of response.roles) {
          if (!prop.existRol(rol.rol)) {
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
        this.getBienRaiz(rut).then(
          (data: { curout: any }) => {
            this.propiedades = this.util.procesarPropiedades(data.curout);
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

  getBienesRaicesByEmail(email: string): Promise<Propiedad[]> {
    return new Promise((resolve) => {
      if (this.propiedades) {
        resolve(this.propiedades);
      } else {
        this.rolesRecuperar(email).then(
          propiedades => {
            this.propiedades = propiedades;
            resolve(this.propiedades);
          }
        );
      }
    });
  }

  getBienesRaicesSinlogin(): Promise<Propiedad[]> {
    if (this.propiedades === undefined) {
      this.clearPropiedades();
    }
    return new Promise((resolve) => {
      resolve(this.propiedades);
    });
  }

  // async cargarRoles(): Promise<any> {
  //   for (const propiedad of this.propiedades) {
  //     for (const rol of propiedad.roles) {
  //       if (!rol.isProcess) {
  //         await this.cargarRol(rol);
  //       }
  //       rol.complete();
  //     }
  //   }
  // }
  


  // private cargarRol(rol: Rol): Promise<any> {
  //   if (rol.cuotas.length > 0) {
  //     return new Promise((resolve, reject) => {
  //       resolve();
  //     });

  //   } else {
  //     return new Promise(
  //       (resolve, reject) => this.getDeudaByRol(rol.rol, []).then(
  //         (data: { listaDeudaRol: any[], noLiq: any }) => {
  //           this.userdataservice.deudaNoLiquidable = data.noLiq;
  //           const mapCuotas = new Map<string, Cuota>();
  //           for (const deuda of data.listaDeudaRol) {
  //             const cuota = new Cuota(deuda);
  //             mapCuotas.set(cuota.numeroCuota, cuota);
  //             rol.cuotas.push(cuota);
  //             console.log("data ", data);
  //             console.log("listaDeudaRol", data.listaDeudaRol);
  //           }
  //           this.getDeudaByRol(rol.rol, rol.getCuotasDeseleccionadas()).then(
  //             (data2: { listaDeudaRol: { numeroCuota: string }[] }) => {
  //               for (const deuda of data2.listaDeudaRol) {
  //                 const cuota = mapCuotas.get(deuda.numeroCuota);
  //                 cuota.liqParcial = new CuotaDetalle(deuda);
  //               }
  //               rol.isProcess = true;
  //               resolve();
  //             },
  //             (err) => reject(err)
  //           );
  //         },
  //         (err) => reject(err)
  //       )
  //     );
  //   }
  // }
  
  // JMS: copia de cargar roles
  async cargaRoles(): Promise<any> {
    for (const propiedad of this.propiedades) {
      for (const rol of propiedad.roles) {
        console.log("rol.cuotas", rol.cuotas)
        console.log("rol.cuotas.length", rol.cuotas.length);
        console.log("rol", rol);
        if (!rol.isProcess) {
          await this.cargaRol(rol);
        }
        rol.complete();
      }
    }
  }
  
  // JMS: Copia de servicio que obtiene la cuota uno a uno
    private cargaRol(rol: Rol): Promise<any> {
    if (rol.cuotas.length > 0) {
      return new Promise((resolve, reject) => {
        resolve();
      });

    } else {
      return new Promise(
        (resolve, reject) => this.obtieneDeuda(rol.rol, []).then(
          (data: { listaDeudas: any[], outNoLiq: any }) => {
            this.userdataservice.deudaNoLiquidable = data.outNoLiq;
            console.log("no liquidable", data.outNoLiq);
            const mapCuotas = new Map<string, Cuota>();
            for (const deuda of data.listaDeudas) {
              console.log("data1", data);
              console.log("data.listaDeudas", data.listaDeudas);
              const cuota = new Cuota(deuda);
              console.log("cuota", cuota);
              mapCuotas.set(cuota.numeroCuota, cuota);
              rol.cuotas.push(cuota);
              console.log("data2 ", data);
              console.log("listaDeudaRol", data.listaDeudas);
            }
            this.obtieneDeuda(rol.rol, rol.getCuotasDeseleccionadas()).then(
              (data2: { listaDeudas: { numeroCuota: string }[] }) => {
                for (const deuda of data2.listaDeudas) {
                  const cuota = mapCuotas.get(deuda.numeroCuota);
                  cuota.liqParcial = new CuotaDetalle(deuda);
                }
                rol.isProcess = true;
                resolve();
              },
              (err) => reject(err)
            );
          },
          (err) => reject(err)
        )
      );
    }
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }

  private getBienRaiz(rut: number): Promise<{}> {
    const obtenerBienRaizAsociado = Object.assign({}, environment.servicios.obtenerBienRaizAsociado);
    obtenerBienRaizAsociado.url = obtenerBienRaizAsociado.url + '/' + rut;
    return this.requestService.request(obtenerBienRaizAsociado);
  }

  private getDeudaByRol(rol, cuotas?: any): Promise<{}> {
    const body = {
      'idRol': rol,
      'listaCuotas': Array.from(cuotas.values()),
    };
    return this.requestService.request(environment.servicios.recuperarDeudaRol, body);
  }
// JMS: copia de captura de rol nuevo servico
  private obtieneDeuda(rol, cuotas?: any): Promise<{}> {
    const body = {
      'idRol': rol,
      'listaDeudas': Array.from(cuotas.values()),
    };
    const url = Object.assign({}, environment.servicios.urlApiObtieneDeuda);
    url.url = url.url + '/' + body.idRol;
    console.log(url);
    return this.requestService.request2(url, body);
  }


  eliminarPropiedad(rut: number, correo: string, idDireccion: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        const index = this.propiedades.findIndex(p => p.idDireccion === idDireccion);
        const propiedad = this.propiedades[index];
        this.propiedades.splice(index, 1);
        const promises = [];
        for (const rol of propiedad.roles) {
          promises.push(this.desasociarRol(rut, correo, rol));
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

  eliminarPropiedadSinlogin(idDireccion: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        const index = this.propiedades.findIndex(p => p.idDireccion === idDireccion);
        const propiedad = this.propiedades[index];
        this.propiedades.splice(index, 1);
        if (propiedad !== undefined) {
          propiedad.changeSubject.next();
          propiedad.changeSubject.complete();
        }
        resolve();
      }
    );
  }

  eliminarRol(rut: number, email: string, rolComunaSiiCod: number, rolId: number, subrolId: number): Promise<any> | undefined {
    return new Promise<any>(
      (resolve, reject) => {
        let rol;
        for (const propiedad of this.propiedades) {
          const index = propiedad.roles.findIndex(r => r.rolComunaSiiCod === rolComunaSiiCod &&
            r.rolId === rolId && r.subrolId === subrolId);
          if (index >= 0) {
            rol = propiedad.roles[index];
            propiedad.roles.splice(index, 1);
            if (propiedad.roles.length === 0) {
              this.desasociarRol(rut, email, rol).then(
                value => resolve(value),
                err => reject(err)
              );
              return this.eliminarPropiedad(rut, email, propiedad.idDireccion);
            } else {
              rol.changeSubject.next();
              rol.changeSubject.complete();
            }
          }
        }
        if (!rol) {
          reject('No se encontró el rol (' + rolComunaSiiCod + ', ' + rolId + ', ' + subrolId);
        }
      }
    );
  }


  eliminarRolSinLogin(rolComunaSiiCod: number, rolId: number, subrolId: number): Promise<any> | undefined {
    return new Promise<any>(
      (resolve, reject) => {
        let rol;
        for (const propiedad of this.propiedades) {
          const index = propiedad.roles.findIndex(r => r.rolComunaSiiCod === rolComunaSiiCod &&
            r.rolId === rolId && r.subrolId === subrolId);
          if (index >= 0) {
            rol = propiedad.roles[index];
            propiedad.roles.splice(index, 1);
            if (propiedad.roles.length === 0) {
              return this.eliminarPropiedadSinlogin(propiedad.idDireccion);
            } else {
              rol.changeSubject.next();
              rol.changeSubject.complete();
            }
          }
        }
        resolve();
        if (!rol) {
          reject('No se encontró el rol (' + rolComunaSiiCod + ', ' + rolId + ', ' + subrolId);
        }
      }
    );
  }

  private desasociarRol(rut: number, correo: string, rol: Rol): Promise<any> {
    if (rut) {
      const body = {
        'rutin': String(rut),
        'rolin': rol.rol.toString()
      };
      return this.requestService.request(environment.servicios.desasociarBienRaiz, body);
    } else if (correo) {
      return this.desasociar(correo, rol.rol.toString());
    }
  }

  enviarMailCodigoVerificacion(correo: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo
        };
        this.requestService.lambda(environment.lambda.enviarMailCodigoVerificacion, body).then(
          response => resolve(new ResponseResultado(response)),
          err => reject(err)
        );
      }
    );
  }

  validarCodigo(correo: string, codigo: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo,
          codigo: codigo
        };
        this.requestService.lambda(environment.lambda.validarCodigo, body).then(
          response => resolve(new ResponseResultado(response)),
          err => reject(err)
        );
      }
    );
  }

  rolesRecuperar(correo: string): Promise<Propiedad[]> {
    return new Promise<Propiedad[]>(
      (resolve, reject) => {
        const rec = Object.assign({}, environment.lambda.recuperar);
        rec.path = rec.path.replace('{idUsuario}', correo);
        this.requestService.lambda(rec, {}).then(
          (response: { curout: { direccion: string, rolId: number, rolComunaSiiCod: number }[] }) => {
            resolve(this.util.procesarPropiedades(response.curout));
          },
          err => reject(err)
        );
      }
    );
  }

  desasociar(correo: string, rol: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {};
        const rec = Object.assign({}, environment.lambda.desasociar);
        rec.path = rec.path.replace('{idUsuario}', correo);
        rec.path = rec.path.replace('{rol}', rol);
        this.requestService.lambda(rec, body).then(
          response => resolve(new ResponseResultado(response)),
          err => reject(err)
        );
      }
    );
  }
}

export class ResponseResultado {
  resultado: string;
  descripcion: string;

  public constructor(init?: Partial<Direccion>) {
    Object.assign(this, init);
  }

  ok(): boolean {
    return this.resultado === '1';
  }
}
