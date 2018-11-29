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
}
