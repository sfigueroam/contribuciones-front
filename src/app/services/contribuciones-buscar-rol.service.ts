import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Localidad} from '../domain/Localidad';
import {environment} from '../../environments/environment';
import {Propiedad} from '../domain/Propiedad';
import {Rol} from '../domain/Rol';
import {LeadingZeroPipe} from '../pipes/leading-zero.pipe';
import {TipoPropiedad} from '../domain/TipoPropiedad';
import {Direccion} from '../domain/Direccion';
import {ResponseResultado} from './contribuciones.service';
import {TipoRecaptcha} from '../enum/TipoRecaptcha.enum';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesBuscarRolService {

  localidad: Localidad[];
  tiposPropiedades: TipoPropiedad[];


  constructor(private requestService: RequestService) {

  }

  getTiposPropiedades(): Promise<TipoPropiedad[]> {
    if (this.tiposPropiedades !== undefined) {
      return new Promise((resolve, reject) => {
        resolve(this.tiposPropiedades);
      });
    }

    return new Promise((resolve, reject) => {
      this.requestService.requestElastic(environment.elastic.tiposPropiedades).then((data: {
          hits: {
            hits: {
              _source: TipoPropiedad
            }[], total: number
          }
        }) => {
          this.tiposPropiedades = [];
          for (const local of data.hits.hits) {
            const tipoPropiedad = new TipoPropiedad(local._source);
            this.tiposPropiedades.push(tipoPropiedad);
          }
          this.tiposPropiedades.sort(((a, b) => {
            const ac = a.descripcion.toLowerCase();
            const bc = b.descripcion.toLowerCase();
            return ac > bc ? 1 : (ac < bc ? -1 : 0);
          }));
          resolve(this.tiposPropiedades);
        },
        () => {
          reject();
        });
    });

  }

  getComunas(): Promise<Localidad[]> {

    if (this.localidad !== undefined) {
      return new Promise((resolve, reject) => {
        resolve(this.localidad);
      });
    }

    return new Promise((resolve, reject) => {
      this.requestService.requestElastic(environment.elastic.localidad).then((data: {
          hits: {
            hits: {
              _source: Localidad
            }[], total: number
          }
        }) => {
          this.localidad = [];
          for (const local of data.hits.hits) {
            const localid = new Localidad(local._source);
            this.localidad.push(localid);
          }
          this.localidad.sort(((a, b) => {
            const ac = a.comuna.toLowerCase();
            const bc = b.comuna.toLowerCase();
            return ac > bc ? 1 : (ac < bc ? -1 : 0);
          }));

          resolve(this.localidad);
        },
        () => {
          reject();
        });
    });
  }

  searchRolesForIds(idComuna: number, idRol: number, idSubRol: number, tokenCaptcha: string, tipo: TipoRecaptcha): Promise<Propiedad> {

    const leadingZeroPipe = new LeadingZeroPipe();
    return new Promise((resolve, reject) => {

      const body = {
        'rol': leadingZeroPipe.transform(idRol.toString(), 5),
        'subrol': leadingZeroPipe.transform(idSubRol.toString(), 3),
        'idcomuna': idComuna.toString(),
        'token': tokenCaptcha
      };

      const buscarBienRaiz = Object.assign({}, environment.servicios.buscarBienRaiz);

      if (tipo === TipoRecaptcha.V3) {
        buscarBienRaiz.url = buscarBienRaiz.recaptcha.v3;
      } else {
        buscarBienRaiz.url = buscarBienRaiz.recaptcha.v2;
      }

      this.requestService.request(buscarBienRaiz, body).then((data: { curout: any[] }) => {
        if (data.curout.length === 0) {
          resolve(null);

        } else {
          const bienRaiz = data.curout[0];
          const propiedad = new Propiedad();
          propiedad.direccion = bienRaiz.direccion;
          propiedad.idDireccion = idComuna + '-' + idRol;
          const rol = new Rol(bienRaiz);
          rol.subrolId = idSubRol;
          rol.rolId = idRol;
          rol.rolComunaSiiCod = idComuna;
          propiedad.addRol(rol);
          resolve(propiedad);
        }
      }, () => {
        reject();
      });
    });
  }


  direccionToPropiedad(direcciones: Direccion[]): Propiedad[] {
    let propiedades: Propiedad[];
    const leadingZeroPipe = new LeadingZeroPipe();
    const propiedadMap = new Map<string, Propiedad>();

    if (direcciones) {
      for (const dire of direcciones) {
        const idPropiedad = dire.idComunaSii + '-' + dire.rol;
        let propiedad = propiedadMap.get(idPropiedad);
        if (!propiedad) {
          propiedad = new Propiedad();
          propiedad.direccion = dire.direccionOriginal;
          propiedad.idDireccion = idPropiedad;
          propiedadMap.set(idPropiedad, propiedad);
        }

        const rol = new Rol({
          rolComunaSiiCod: dire.idComunaSii,
          rolId: dire.rol,
          subrolId: dire.subrol,
          direccion: dire.direccionOriginal,
          idComuna: dire.idComuna,
          comuna: dire.descripcionComuna,
          destPropiedad: dire.descripcionPropiedad,
          idDestPropiedad: dire.idDestPropiedad,
        });

        const rolFull = leadingZeroPipe.transform(rol.rolComunaSiiCod, 3) + '' +
          leadingZeroPipe.transform(rol.rolId, 5) + '' +
          leadingZeroPipe.transform(rol.subrolId, 3);
        rol.rol = +rolFull;

        propiedad.addRol(rol);
      }
      propiedades = Array.from(propiedadMap.values());
    }
    return propiedades;
  }

  searchDireccion(idComuna: number, tipoPropiedad: string, search: string, size: number): Promise<Direccion[]> {
    const body = {
      size: size,
      search: search,
      tipoPropiedad: tipoPropiedad
    };
    const propiedades = {
      url: environment.elastic.propiedades.url,
      method: environment.elastic.propiedades.method,
      body: body
    };

    const direcciones = [];
    return new Promise((resolve, reject) => {
      this.requestService.requestElastic(propiedades).then((data: { hits: { hits: { _source: Direccion }[] } }) => {
        if (data.hits.hits.length === 0) {
          resolve(null);
        } else {
          for (const direc of data.hits.hits) {
            const direccion2 = new Direccion(direc._source);
            direcciones.push(direccion2);
          }
          resolve(direcciones);
        }
      }, () => {
        reject();
      });
    });
  }

  asociarRoles(rut: number, correo: string, roles: number[]): Promise<any> {
    const promesas = [];
    for (const rol of roles) {
      if (rut) {
        const body = {
          'rutin': String(rut),
          'rolin': String(rol)
        };
        promesas.push(this.requestService.request(environment.servicios.asociarBienRaiz, body));
      } else if (correo) {
        promesas.push(this.asociar(correo, rol.toString()));
      }
    }
    return Promise.all(promesas);
  }

  asociar(correo: string, rol: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo,
          rol: rol
        };
        this.requestService.lambda(environment.lambda.asociar, body).then(
          response => resolve(new ResponseResultado(response)),
          err => reject(err)
        );
      }
    );
  }
}
