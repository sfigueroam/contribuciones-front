import {RequestService} from './request.service';
import {environment} from '../../environments/environment';
import {TipoRecaptcha} from '../enum/TipoRecaptcha.enum';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor(private requestService: RequestService) {

  }

  public validaRecaptcha(tokenCaptcha: string, tipo: TipoRecaptcha): Promise<{}> {

    const body = {
      token: tokenCaptcha
    };

    let captcha: {url: string, method: string};

    if (tipo === TipoRecaptcha.V2) {
      captcha = environment.recaptcha.v2;
    } else {
      captcha = environment.recaptcha.v3;
    }

    const service = {
      url: captcha.url,
      body: body,
      method: captcha.method
    };

    return this.requestService.validaRecaptcha(service);
  }

}


