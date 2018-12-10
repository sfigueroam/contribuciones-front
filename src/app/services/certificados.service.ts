import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {RequestService} from './request.service';
import {HistorialPago} from '../domain/HistorialPago';
import {CertificadoDeuda} from '../domain/CertificadoDeuda';

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

  getHistorialPago(rolId: number, ano: number): Promise<HistorialPago[]> {
    return new Promise<HistorialPago[]>(
      (resolve, reject) => {
        const body = {
          mensajeId: {
            rol: rolId,
            anio: ano,
          },
          encabezado: {
            ambienteOrigen: 'TEST',
            fechaConsulta: '2018-11-29T18:35:39',
            msgDesc: 'InfMov',
            codeNegocio: 'MovRoles',
            fromAddress: 'SII',
            toAddress: 'TESORERIA',
            refAddress: 801,
            idTransaccionConsulta: '1'
          }
        };
        this.requestService.request(environment.servicios.certificadoHistorialPago, body).then(
          (response: { message: HistorialPago[] }) => {console.log(response.message); resolve(response.message !== undefined ? response.message : null)},
          err => reject(err)
        );
      }
    );
  }

  getCertificadoDeuda(rolId: number): Promise<CertificadoDeuda> {
    return new Promise<CertificadoDeuda>(
      (resolve, reject) => {
        this.requestService.request(environment.servicios.certificadoDeudas, {rol: rolId}).then(
          (response: CertificadoDeuda) => resolve(response),
          err => reject(err)
        );
      }
    );
  }
}
