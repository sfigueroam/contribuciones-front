import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Localidad} from '../domain/Localidad';
import {environment} from '../../environments/environment';
import {Propiedad} from '../domain/Propiedad';
import {Rol} from '../domain/Rol';
import {LeadingZeroPipe} from '../pipes/leading-zero.pipe';
import {TipoPropiedad} from '../domain/TipoPropiedad';
import {Direccion} from '../domain/Direccion';

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

  searchRolesForIds(idComuna: number, idRol: number, idSubRol: number): Promise<Propiedad> {

    return new Promise((resolve, reject) => {
      const zero = new LeadingZeroPipe();

      let body = {
        'rol': zero.transform(idRol.toString(), 5),
        'subrol': zero.transform(idSubRol.toString(), 3),
        'idcomuna': idComuna.toString()
      };

      this.requestService.request(environment.servicios.buscarBienRaiz, body).then((data: { curout: any[] }) => {
        if (data.curout.length === 0) {
          resolve(null);

        } else {
          const bienRaiz = data.curout[0];
          let propiedad = new Propiedad();
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
/*
  parceDireccionToPropiedades(direcciones: Direccion[]): any {
    return null;
  }
*/
  searchDireccion(idComuna: number, tipoPropiedad: string, search: string, size:number): Promise<Direccion[]> {



    let body = {
      'size': size,
      'query': {
        'bool': {
          'must': [
            {
              'match': {
                'direccion': {
                  'query': search
                }
              }
            },
            {
              'match': {
                'comuna': {
                  'query': idComuna.toString()
                }
              }
            },
            {
              'match': {
                'id_dest_propiedad': {
                  'query': tipoPropiedad
                }
              }
            }
          ]
        }
      }
    };

    let propiedades = {
      url: environment.elastic.propiedades.url,
      method: environment.elastic.propiedades.method,
      body: body
    };

    let direcciones = [];
    return new Promise((resolve, reject) => {
      this.requestService.requestElastic(propiedades).then((data: { hits: { hits: { _source: Direccion }[] } }) => {
        if (data.hits.hits.length === 0) {
          resolve(null);
        } else {
          for (let direc of data.hits.hits) {
            let direccion = new Direccion(direc._source);
            direcciones.push(direccion);
          }
          resolve(direcciones);
        }
      }, () => {
        reject();
      });
    });
  }
}
