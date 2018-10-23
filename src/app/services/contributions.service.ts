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
      if (rol.rol !== 8201011013) {
        continue;
      }
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
    console.log(this.propiedades);
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }

  private getCuotaAnio(cuota: Cuota): number {
    return parseInt(cuota.numeroCuota.split('-')[1], 10);
  }

  initBienesRaicesOld(): void {

    this.propiedades = [];

    const bienesRaices = this.getBienRaiz();

    const propiedadesTmp: Propiedad[] = this.agruparRoles(bienesRaices);

    // Recorre los roles
    const keyPropiedades = Object.keys(propiedadesTmp);

    for (let p = 0; p < keyPropiedades.length; p++) {
      const prop: Propiedad = propiedadesTmp[keyPropiedades[p]];
      for (let i = 0; i < prop.roles.length; i++) {
        const deudas = this.getDeudas(prop.roles[i].rol).listaDeudaRol;
        let cuotasTmp: Cuota[] = [];
        let year = -1;

        // Recorre las Cuotas
        for (let j = 0; j < deudas.length; j++) {
          const cuota: Cuota = new Cuota(deudas[j]);
          if (year !== -1 && year !== cuota.fechaVencimiento.getFullYear()) {
            prop.roles[i].pushCuota(cuotasTmp, year);
            cuotasTmp = [];
          }
          cuotasTmp.push(cuota);
          year = cuota.fechaVencimiento.getFullYear();
          if (j + 1 === deudas.length) {
            prop.roles[i].pushCuota(cuotasTmp, year);
          }
        }
      }
      propiedadesTmp[p] = prop;
    }

    this.propiedades = propiedadesTmp;
    console.log(this.propiedades);
  }

  private getBienRaiz(): any {
    return this.dummy.getBienRaiz().curout;
  }

  private getDeudas(rol: number): any {
    return this.dummy.getDeudas(rol).listaDeudaRol;
  }

  private agruparRoles(bienesRaices: any): Propiedad[] {
    const propiedades: Propiedad[] = [];
    for (let i = 0; i < bienesRaices.length; i++) {
      const key = bienesRaices[i].rolComunaSiiCod + '-' + bienesRaices[i].rolId;
      const rol: Rol = new Rol(bienesRaices[i]);
      if (propiedades[key] === undefined) {
        propiedades[key] = new Propiedad();
      }
      propiedades[key].addRol(rol);
    }
    return propiedades;

  }

}
