import {Injectable} from '@angular/core';
import {PitUtils} from '../pit-utils';
import {Propiedad} from '../domain/Propiedad';
import {ContribucionesService} from './contribuciones.service';
import {ContribucionesBuscarRolService} from './contribuciones-buscar-rol.service';
import {ContribucionesSugeridasService} from './contribuciones-sugeridas.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rut: number;
  dv: string;

  constructor(private contributions: ContribucionesService,
              private sugeridas: ContribucionesSugeridasService,
              private buscarRoles: ContribucionesBuscarRolService) {
    // this.rut = 96597810;
  }

  redirectMiCuenta(): void {
    window.location.href = environment.cuentaUrl;
  }

  isLogged(): boolean {
    return this.rut !== undefined;
  }

  setRut(rut: string) {
    this.rut = +rut;
    this.dv = PitUtils.dv(+this.rut);
  }

  getBienesRaices(): Promise<Propiedad[]> {
    return this.contributions.getBienesRaices(this.rut);
  }

  eliminarPropiedad(idDireccion: string): Promise<any> {
    if (this.rut) {
      return this.contributions.eliminarPropiedad(this.rut, idDireccion);
    } else {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }

  eliminarRol(rolComunaSiiCod: number, rolId: number, subrolId: number): Promise<any> {
    if (this.rut) {
      return this.contributions.eliminarRol(this.rut, rolComunaSiiCod, rolId, subrolId);
    } else {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }

  asociarRoles(roles: number[]): Promise<any> {
    return this.buscarRoles.asociarRoles(this.rut, roles);
  }

  getRolesNoAsociados(): Promise<Propiedad[]> {
    return this.sugeridas.getRolesNoAsociados(this.rut);
  }
}
