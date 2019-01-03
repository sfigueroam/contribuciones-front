import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {RequestService} from './request.service';

@Injectable({
  providedIn: 'root'
})
export class RecuperarRolesCorreoService {

  constructor(private requestService: RequestService) {
  }

  enviarMailCodigoVerificacion(correo: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo
        };
        this.requestService.lambda(environment.lambda.enviarMailCodigoVerificacion, body).then(
          (response: ResponseResultado) => resolve(response),
          err => reject(err)
        );
      }
    );
  }

  validarCodigo(correo: string, codigo: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo,
          codigo: codigo
        };
        this.requestService.lambda(environment.lambda.validarCodigo, body).then(
          (response: ResponseResultado) => resolve(response),
          err => reject(err)
        );
      }
    );
  }

  rolesRecuperar(correo: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo
        };
        this.requestService.lambda(environment.lambda.recuperar, body).then(
          (response: ResponseResultado) => resolve(response),
          err => reject(err)
        );
      }
    );
  }

  asociar(correo: string, rol: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo,
          rol: rol
        };
        this.requestService.lambda(environment.lambda.asociar, body).then(
          (response: ResponseResultado) => resolve(response),
          err => reject(err)
        );
      }
    );
  }

  desasociar(correo: string, rol: string): Promise<ResponseResultado> {
    return new Promise<ResponseResultado>(
      (resolve, reject) => {
        const body = {
          correo: correo,
          rol: rol
        };
        this.requestService.lambda(environment.lambda.desasociar, body).then(
          (response: ResponseResultado) => resolve(response),
          err => reject(err)
        );
      }
    );
  }
}

export class ResponseResultado {
  resultado: string;
  descripcion: string;

  ok(): boolean {
    return this.resultado === '1';
  }
}
