import {LeadingZeroPipe} from './pipes/leading-zero.pipe';

export class PitUtils {

  constructor() {
  }

  static validarRutDv(rut: string, dv: string): boolean {
    return PitUtils.dv(+rut) === dv;
  }

  static dv(rut: number): string {
    let M = 0, S = 1;
    for (; rut; rut = Math.floor(rut / 10)) {
      S = (S + rut % 10 * (9 - M++ % 6)) % 11;
    }
    return S ? String(S - 1) : 'k';
  }

  static parseRutDv(texto: string): { rut: string, dv: string } {
    let rut = texto;
    let dv;
    if (rut.indexOf('-') > 0) {
      const values = rut.split('-');
      rut = values[0];
      dv = values[1];
    } else {
      dv = rut.charAt(rut.length - 1);
      rut = rut.substring(0, rut.length - 1);
    }
    return {
      rut: rut.replace(/\./g, ''),
      dv: dv
    };
  }

  static separaRol(valor: number): { comuna: string, rol: string, subrol: string } {
    const result = {comuna: undefined, rol: undefined, subrol: undefined};
    result.subrol = ('000' + (valor % 1000)).substr(-3);
    valor = Math.floor(valor / 1000);
    result.rol = ('00000' + (valor % 100000)).substr(-5);
    valor = Math.floor(valor / 100000);
    result.comuna = ('000' + (valor)).substr(-3);
    return result;
  }

  static calcularRol(rolId, subrolId, rolComuna): number {
    const rolIdConst = new LeadingZeroPipe().transform(rolId, 5);
    const subRolIdConst = new LeadingZeroPipe().transform(subrolId, 3);
    const rol = rolComuna + '' + rolIdConst + '' + subRolIdConst;
    return +rol;
  }
}
