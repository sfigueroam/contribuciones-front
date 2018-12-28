import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtCognitoService} from './jwt-cognito.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private jwtCognito: JwtCognitoService) { }

  public request(servicio: { url: string, path: string, method: string }, body?): Promise<{}> {
    console.log(this.jwtCognito.jwt);
    const params = {
      'path': servicio.path
    };

    return new Promise((resolve, reject) => {
      this.http.request(servicio.method,
        servicio.url,
        {
          body: body,
          params: params,
          responseType: 'json',
          headers: new HttpHeaders({
            Authorization: 'Bla'
          }),
        }
      ).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log('Error', err);
          reject();
        }
      );
    });
  }

  public requestElastic(servicio: { url: string, body: any, method: string }): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.request(servicio.method,
        servicio.url,
        {
          body: servicio.body,
          responseType: 'json'
        }
      ).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log('Error', err);
          reject();
        }
      );
    });
  }
}
