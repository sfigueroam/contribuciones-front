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
  }

  private getBienRaizId(bienRaiz: { rolId: number, rolComunaSiiCod: number }): string {
    return bienRaiz.rolComunaSiiCod + '-' + bienRaiz.rolId;
  }

  private getCuotaAnio(cuota: Cuota): number {
    return parseInt(cuota.numeroCuota.split('-')[1], 10);
  }

  private getBienRaiz(): any {
    return this.dummy.getBienRaiz().curout;
  }

  private getDeudas(rol: number): any {
    return this.dummy.getDeudas(rol).listaDeudaRol;
  }
}
