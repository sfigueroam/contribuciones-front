import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtCognitoService} from './jwt-cognito.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private jwtCognito: JwtCognitoService) {
  }

  public lambda(servicio: { url: string, path: string, method: string }, body?): Promise<{}> {

    return new Promise((resolve, reject) => {
      this.http.request(servicio.method,
        servicio.url + servicio.path,
        {
          body: body,
          responseType: 'json',
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
// JMS: request del servicio que accede a tierra
  public request(servicio: { url: string, method: string }, body?): Promise<{}> {
    let headers = {};
    if (this.jwtCognito.jwt !== undefined) {
      headers = new HttpHeaders({
        Authorization: this.jwtCognito.jwt
      });
    }

    return new Promise((resolve, reject) => {
      this.http.request(servicio.method,
        servicio.url,
        {
          body: body,
          responseType: 'json',
          headers: headers

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
  // JMS: funcion que llama al servicio tierra del back para buscar cuotas
    public request2(servicio: { url: string, method: string }, rol?): Promise<{}> {
    let headers = {};
    if (this.jwtCognito.jwt !== undefined) {
      headers = new HttpHeaders({
        Authorization: this.jwtCognito.jwt
      });
    }

    return new Promise((resolve, reject) => {
      this.http.request(servicio.method,
        servicio.url,
        {
          body: rol,
          responseType: 'json',
          headers: headers

        }
      ).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log('Error', err);
          console.log("error en metodo");
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

  public validaRecaptcha(servicio: { url: string, body: any, method: string }): Promise<{}> {
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
          reject(err.error);
        }
      );
    });
  }

  // public getDeuda(url: string, rol: number): Promise <{}> {
  //   const urlDeuda = url + '/' + rol;
  //   return new Promise((resolve, reject) => {
  //     this.http.request(urlDeuda).subscribe(
  //       data => {
  //         resolve(data);
  //       },
  //       err => {
  //         console.log('Error', err);
  //         reject();
  //       }
  //     );
  //   });
  // }
}

