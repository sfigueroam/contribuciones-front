import {Injectable} from '@angular/core';
import {PitUtils} from '../pit-utils';
import {Propiedad} from '../domain/Propiedad';
import {ContributionsService} from './contributions.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rut: number;
  dv: string;

  constructor(private contributions: ContributionsService) {
    this.rut = 96597810;
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
    return this.contributions.eliminarPropiedad(this.rut, idDireccion);
  }

  eliminarRol(rolComunaSiiCod: number, rolId: number, subrolId: number): Promise<any> {
    return this.contributions.eliminarRol(this.rut, rolComunaSiiCod, rolId, subrolId);
  }
}
