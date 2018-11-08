import {Cuota} from './Cuota';
import {TipoCuota} from './TipoCuota';

export class Rol {

  comuna: string;
  destPropiedad: string;
  dirPostal: string;
  dirPredial: string;
  direccion: string;
  idComuna: number;
  idDestPropiedad: string;
  rol: number;
  rolComunaSiiCod: number;
  rolId: number;
  subrolId: number;
  cuotas: Map<number, Cuota[]>;
  wait: boolean;

  public constructor(init?: Partial<Rol>) {
    Object.assign(this, init);
    this.cuotas = new Map<number, Cuota[]>();
    this.wait = true;
  }

  // Revisa si existe mas o igual de n cuotas vencidas por defecto 2
  hasExpiredQuotes(maxCuota?: number): boolean {
    let max = 2;
    if (maxCuota) {
      max = maxCuota;
    }

    let cantidad = 0;
    for (const year of Array.from(this.cuotas.keys())) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.expired) {
          cantidad++;
        }
        if (cantidad >= max) {
          return true;
        }
      }
    }
    return false;
  }

  private all(checked: boolean, year: number): boolean {
    if (year) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.intencionPago !== checked) {
          return false;
        }
      }
    } else {
      for (const aYear of Array.from(this.cuotas.keys())) {
        for (const cuota of Array.from(this.cuotas.get(aYear).values())) {
          if (cuota.intencionPago !== checked) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // Revisa si todas las cuotas de un ano estan seleccionadas
  allChecked(year: number): boolean {
    return this.all(true, year);
  }

  // Revisa si todas las cuotas de un ano estan des seleccionadas
  noneChecked(year: number): boolean {
    return this.all(false, year);
  }

  pushCuota(cuota: Cuota[], year: number): void {
    if (this.cuotas === undefined) {
      this.cuotas = new Map<number, Cuota[]>();
    }

    this.cuotas.set(year, cuota);
  }

  getYears(): number[] {
    return Array.from(this.cuotas.keys()).sort();
  }

  seleccionar(tipo: TipoCuota, aYear?: number) {
    let yearList = [];
    if (aYear) {
      yearList.push(aYear);
    } else {
      yearList = this.getYears();
    }

    for (const year of yearList) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (tipo === TipoCuota.TODAS) {
          cuota.intencionPago = true;
        } else if (tipo === TipoCuota.NINGUNA) {
          cuota.intencionPago = false;
        } else if (tipo === TipoCuota.VENCIDAS) {
          cuota.intencionPago = cuota.expired;
        } else if (tipo === TipoCuota.VIGENTES) {
          cuota.intencionPago = !cuota.expired;
        }
      }
    }
  }

  calcularTipo(): Array<TipoCuota> {
    const result = new Array();

    let total = 0;
    let vencidas = 0;
    let seleccionadas = 0;
    let seleccionadasVencidas = 0;

    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        total++;
        if (cuota.expired) {
          vencidas++;
          if (cuota.intencionPago) {
            seleccionadasVencidas++;
          }
        }
        if (cuota.intencionPago) {
          seleccionadas++;
        }
      }
    }

    if (seleccionadas === seleccionadasVencidas && seleccionadas === vencidas) {
      result.push(TipoCuota.VENCIDAS);
    }
    if (seleccionadasVencidas === 0 && seleccionadas === (total - vencidas)) {
      result.push(TipoCuota.VIGENTES);
    }
    if (total === seleccionadas) {
      result.push(TipoCuota.TODAS);
    }
    if (seleccionadas === 0) {
      result.push(TipoCuota.NINGUNA);
    }
    return result;
  }

  cuotasSeleccionadas(): Cuota[] {
    const cuotas = [];
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.intencionPago) {
          cuotas.push(cuota);
        }
      }
    }
    return cuotas;
  }

  calcularTotalCondonado(): number {
    let total = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.intencionPago) {
          total += cuota.saldoTotal;
        }
      }
    }
    return total;
  }

  calcularTotal(): number {
    let total = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.intencionPago) {
          //total += cuota.saldoTotal + cuota.montoCondonacion;
          total += cuota.saldoTotal;
        }
      }
    }
    return total;
  }

  calcularCondonacion() {
    let condonacion = 0;
    if (this.isAllCondonacion()) {
      for (const year of this.getYears()) {
        for (const cuota of Array.from(this.cuotas.get(year).values())) {
          if (cuota.intencionPago) {
            condonacion += cuota.montoCondonacion;
          }
        }
      }
    } else {
      condonacion = 0;
    }

    return condonacion;
  }

  cantidadCuotas() {
    let cantidad = 0;
    for (const year of this.getYears()) {
      cantidad += this.cuotas.get(year).length;
    }
    return cantidad;
  }

  cantidadCuotasSeleccionadas() {
    let cantidad = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.intencionPago) {
          cantidad++;
        }
      }
    }
    return cantidad;
  }

  private isAllCondonacion(): boolean {
    let cantidad = 0;
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        if (cuota.condonacion === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  allCuotas(): Cuota[] {
    const cuotas = [];
    for (const year of this.getYears()) {
      for (const cuota of Array.from(this.cuotas.get(year).values())) {
        cuotas.push(cuota);
      }
    }
    return cuotas;
  }


  actualizarCuota(deuda: any) {
    //console.log('deuda ->', deuda);
    //console.log('cuotas ->', this.cuotas);

    const year = parseInt(deuda.numeroCuota.split('-')[1], 10);
    const folioDeuda = deuda.folio;

    const cuotaDeuda = new Cuota(deuda);

    //console.log(this.cuotas.get(year));

    for (let i = 0; i < this.cuotas.get(year).length; i++) {
      const folio = this.cuotas.get(year)[i].folio;
      if (folio === folioDeuda) {
        this.updateCuotas(this.cuotas.get(year)[i], deuda);
      }
    }

  }

  private updateCuotas(actual: Cuota, deuda: Cuota): void {
    actual.codigoBarra = deuda.codigoBarra;
    actual.folio = deuda.folio;
    actual.interes = deuda.interes;
    actual.condonacion = deuda.condonacion;
    if (deuda.montoCondonacion !== undefined) {
      actual.montoCondonacion = deuda.montoCondonacion;
    } else {
      actual.montoCondonacion = 0;
    }
    actual.reajuste = deuda.reajuste;
    actual.saldoOriginal = deuda.saldoOriginal;
    actual.saldoTotal = deuda.saldoTotal;
  }

  getCuotaRequest() {

    let cuotasRequest: any = [];
    //console.log(this.cuotas);
    const years = this.getYears();
    for (let i = 0; i < years.length; i++) {
      const cuotas = this.cuotas.get(years[i]);
      for (let j = 0; j < cuotas.length; j++) {
        cuotasRequest.push({
          numeroFolio: cuotas[j].folio,
          fechaVencimiento: cuotas[j].fechaVencimientoOriginal,
          intencionPago: cuotas[j].intencionPago
        });
      }
    }

    return cuotasRequest;
  }


}
