import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public request(servicio: { url: string, path: string, method: string }, body?): Promise<{}> {
    const params = {
      'path': servicio.path
    };
    return new Promise((resolve, reject) => {
      this.http.request(servicio.method,
        servicio.url,
        {
          body: body,
          params: params,
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
