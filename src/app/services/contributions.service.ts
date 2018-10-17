import {Injectable} from '@angular/core';
import {Dummy} from '../modulos/dummy';
import {Rol} from '../domain/Rol';
import {Cuota} from '../domain/Cuota';
import {Propiedad} from '../domain/Propiedad';

@Injectable({
  providedIn: 'root'
})
export class ContributionsService {

  dummy: Dummy = new Dummy();

  propiedades: Propiedad[];

  constructor() {
    this.initBienesRaices();
  }

  getBienesRaices(): Propiedad[] {
    return this.propiedades;
  }

  initBienesRaices(): void {

    this.propiedades = [];

    let bienesRaices = this.getBienRaiz().curout;

    let propiedadesTmp: Propiedad[] = this.agruparRoles(bienesRaices);

    // Recorre los roles
    let keyPropiedades = Object.keys(propiedadesTmp);

    for (let p = 0; p < keyPropiedades.length; p++) {
      let prop: Propiedad = propiedadesTmp[keyPropiedades[p]];
      for (let i = 0; i < prop.rol.length; i++) {
        let deudas = this.getDeudas(prop.rol[i].rol).listaDeudaRol;
        let cuotasTmp: Cuota[] = [];
        let year: number = -1;

        // Recorre las Cuotas
        for (let j = 0; j < deudas.length; j++) {
          let cuota: Cuota = new Cuota(deudas[j]);
          if (year !== -1 && year !== cuota.fechaVencimiento.getFullYear()) {
            prop.rol[i].pushCuota(cuotasTmp, year);
            cuotasTmp = [];
          }
          cuotasTmp.push(cuota);
          year = cuota.fechaVencimiento.getFullYear();
          if (j + 1 === deudas.length) {
            prop.rol[i].pushCuota(cuotasTmp, year);
          }
        }
      }
      propiedadesTmp[p] = prop;
    }


    this.propiedades = propiedadesTmp;

  }

  private getBienRaiz(): any {
    return this.dummy.getBienRaiz();
  }

  private getDeudas(rol: number): any {
    return this.dummy.getDeudas(rol);
  }

  private agruparRoles(bienesRaices: any): Propiedad[] {
    let propiedades: Propiedad[] = [];

    for (let i = 0; i < bienesRaices.length; i++) {
      let key = bienesRaices[i].rolComunaSiiCod + '-' + bienesRaices[i].rolId;
      let rol: Rol = new Rol(bienesRaices[i]);
      if (propiedades[key] === undefined) {
        propiedades[key] = new Propiedad();
      }
      propiedades[key].addRol(rol);

    }
    return propiedades;

  }

}
