import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {RequestService} from './request.service';

@Injectable({
  providedIn: 'root'
})
export class CertificadosService {

  roles: number[];
  ano: number;

  certificadoDeuda = false;
  historialPago = false;

  constructor(private requestService: RequestService) {
  }

  private getBienRaiz(rut: number): Promise<{}> {
    const obtenerBienRaizAsociado = Object.assign({}, environment.servicios.obtenerBienRaizAsociado);
    obtenerBienRaizAsociado.path = obtenerBienRaizAsociado.path + '/' + rut;
    return this.requestService.request(obtenerBienRaizAsociado);
  }
}
