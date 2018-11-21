import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Localidad} from '../domain/Localidad';
import {environment} from '../../environments/environment';
import {Propiedad} from '../domain/Propiedad';
import {Rol} from '../domain/Rol';
import {LeadingZeroPipe} from '../pipes/leading-zero.pipe';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesBuscarRolService {

  localidad: Localidad[];


  constructor(private requestService: RequestService) {

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
/*
  getComuna(id: number): Localidad {
    for (let local of this.localidad) {
      if (local.id === id) {
        return local;
      }
    }
    return null;
  }
*/

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
        }
        const bienRaiz = data.curout[0];
        let propiedad = new Propiedad();
        propiedad.direccion = bienRaiz.direccion;
        const rol = new Rol(bienRaiz);
        propiedad.addRol(rol);

        resolve(propiedad);
      }, () => {
        reject();
      });
    });
  }
}
