import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContributionsWsService {


  constructor(private http: HttpClient) {
    console.log('Iniciando ContributionsWsService');
  }


  getBienRaizAsociado(rut: string): Promise<{}> {

    const params = {
      'path': '/ClienteBienRaizWS/api/BienRaiz/asociado/obtener/' + rut
    };
    return this.request("GET", params);
  }

  private request(method, params): Promise<{}>{
    return new Promise((resolve, reject) => {
      this.http.request(method,
        environment.urlWsTierra,
        {
          params: params,
          responseType: 'json',
          withCredentials: true
        }
      ).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log('Error', err);
          reject(err);
        }
      );
    });
  }


}
