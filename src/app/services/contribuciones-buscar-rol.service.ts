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

    const leadingZeroPipe = new LeadingZeroPipe();
    return new Promise((resolve, reject) => {

      let body = {
        'rol': leadingZeroPipe.transform(idRol.toString(), 5),
        'subrol': leadingZeroPipe.transform(idSubRol.toString(), 3),
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
        let rol = new Rol();
        rol.rolComunaSiiCod = dire.idComunaSii;
        rol.rolId = dire.rol;
        rol.subrolId = dire.subrol;
        rol.direccion = dire.direccionOriginal;
        rol.idComuna = dire.idComuna;
        rol.comuna = dire.descripcionComuna;
        rol.destPropiedad = dire.descripcionPropiedad;
        rol.idDestPropiedad = dire.idDestPropiedad;

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

  /*
    parceDireccionToPropiedades(direcciones: Direccion[]): any {
      return null;
    }
  */
  searchDireccion(idComuna: number, tipoPropiedad: string, search: string, size: number): Promise<Direccion[]> {

    search = search.replace(',', ' ');
    let filtros;// = this.wildcard(search);
    let body = {size, query: {bool: {must: []}}};

    body.size = size;
    body.query.bool.must = [];

    let direccion = {
      'match': {
        'direccion': {
          'query': search,
          'operator': 'and'
        }
      }
    };

    body.query.bool.must.push(direccion);
    if (filtros !== undefined) {
      for (const fil of filtros) {
        let wild = {
          'wildcard': {
            'direccion': fil
          }
        };
        body.query.bool.must.push(wild);

      }

      if (idComuna) {
        let searchComuna = {
          'match': {
            'comuna': {
              'query': idComuna.toString()
            }
          }
        };
        body.query.bool.must.push(searchComuna);
      }
      if (tipoPropiedad) {
        let searchPropiedad = {
          'match': {
            'id_dest_propiedad': {
              'query': tipoPropiedad
            }
          }
        };
        body.query.bool.must.push(searchPropiedad);
      }


    }

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

  wildcard(search: string): string[] {
    let busqueda = [];
    const campos: string[] = search.trim().toLowerCase().split(' ');
    if (campos.length === 1) {
      busqueda.push(campos[0] + '*');
    } else {
      let i = 0;
      while (campos.length > i + 1) {
        busqueda.push(campos[i].toLowerCase() + '*' + campos[i + 1].toLowerCase());
        i++;
      }
      if ((campos.length % 2) === 1 && campos[i].toLowerCase().trim().length > 0) {
        busqueda.push(campos[i].toLowerCase());
      }
    }
    return busqueda;
  }


  asociarRoles(rut: string, roles: Rol[]): Promise<{}> {

    return new Promise((resolve, reject) => {
      let promesas = [];
      for (let rol of roles) {
          const body = {
            'rutin': rut,
            'rolin': rol.rol.toString()
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

}
