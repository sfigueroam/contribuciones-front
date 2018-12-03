import {Cuota} from './Cuota';
import {TipoCuota} from './TipoCuota';
import {Observable, Subject} from 'rxjs';
import {ResumenCuotas} from './ResumenCuotas';

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
  cuotas: Cuota[];

  isComplete = false;

  completeSubject: Subject<any> = new Subject<any>();
  completeStream: Observable<any> = this.completeSubject.asObservable();

  changeSubject: Subject<any> = new Subject<any>();
  changeStream: Observable<any> = this.changeSubject.asObservable();

  condonacion: number;
  total: number;

  public constructor(init?: Partial<Rol>) {
    Object.assign(this, init);
    if (!this.cuotas) {
      this.cuotas = [];
    }
  }

  complete() {
    this.isComplete = true;
    this.calcularTotal();
    this.completeSubject.complete();
    for (const cuota of this.cuotas) {
      cuota.changeStream.subscribe(
        () => {
          this.calcularTotal();
          this.changeSubject.next();
        }
      );
    }
  }

  resumen(): ResumenCuotas {
    const result = new ResumenCuotas();
    for (const cuota of this.cuotas) {
      result.total++;
      if (cuota.intencionPago) {
        result.seleccionadas++;
      }
      if (cuota.expired) {
        result.vencidas++;
        if (cuota.intencionPago) {
          result.vencidasSeleccionadas++;
        }
      }
    }
    return result;
  }

  icon(): string {
    switch (this.idDestPropiedad) {
      case 'A': // AGRICOLA
      case 'B': // AGRICOLA POR ASIMILACION
        return 'spa';
      case 'E': // EDUCACION Y CULTURA
        return 'school';
      case 'F': // FORESTAL
        return 'terrain';
      case 'G': // HOTEL, MOTEL
        return 'hotel';
      case 'I': // INDUSTRIA
      case 'M': // MINERIA
        return 'local_shipping';
      case 'H': // HABITACIONAL
        return 'business';
      case 'O': // OFICINA
        return 'work';
      case 'L': // BODEGA
        return 'meeting_room';
      case 'Q': // CULTO
        return '';
      case 'S': // SALUD
        return 'local_hospital';
      case 'Z': // ESTACIONAMIENTO
        return 'directions_car';
      default:
        return 'layers';
    }
  }

  private all(checked: boolean): boolean {
    for (const cuota of this.cuotas) {
      if (cuota.intencionPago !== checked) {
        return false;
      }
    }
    return true;
  }

  // Revisa si todas las cuotas de un ano estan seleccionadas
  allChecked(): boolean {
    return this.all(true);
  }

  // Revisa si todas las cuotas de un ano estan des seleccionadas
  noneChecked(): boolean {
    return this.all(false);
  }

  seleccionar(tipo: TipoCuota) {
    for (const cuota of this.cuotas) {
      if (tipo === TipoCuota.TODAS) {
        cuota.intencionPago = true;
      } else if (tipo === TipoCuota.NINGUNA) {
        cuota.intencionPago = false;
      } else if (tipo === TipoCuota.VENCIDAS) {
        cuota.intencionPago = cuota.expired;
      }
    }
    this.calcularTotal();
    this.changeSubject.next();
  }

  cuotasSeleccionadas(): Cuota[] {
    const cuotas = [];
    for (const cuota of this.cuotas) {
      if (cuota.intencionPago) {
        cuotas.push(cuota);
      }
    }
    return cuotas;
  }

  private calcularTotal() {
    let pagoParcial = 0;
    let pagoTotal = 0;
    let condonacion = 0;
    let total = true;
    for (const cuota of this.cuotas) {
      pagoTotal += cuota.liqTotal.saldoTotal;
      condonacion += cuota.liqTotal.montoCondonacion;
      if (cuota.intencionPago && cuota.liqParcial) {
        pagoParcial += cuota.liqParcial.saldoTotal;
      } else {
        total = false;
      }
    }

    if (total) {
      this.total = pagoTotal;
      this.condonacion = condonacion;
    } else {
      this.total = pagoParcial;
      this.condonacion = 0;
    }
  }

  getCuotasDeseleccionadas(): { numeroFolio: string, fechaVencimiento: string, intencionPago: boolean }[] {
    const cuotasRequest: any = [];
    for (const cuota of this.cuotas) {
      cuotasRequest.push({
        numeroFolio: cuota.folio,
        fechaVencimiento: cuota.fechaVencimientoOriginal,
        intencionPago: false
      });
    }
    return cuotasRequest;
  }
}
