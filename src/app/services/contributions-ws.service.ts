import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContributionsWsService {


  constructor(/*private http: HttpClient*/) {
    console.log('Iniciando ContributionsWsService');
  }

  hola(): void{

  }

  /*getBienRaizAsociado(rut: string): void {

    console.log(rut);

    let params = new HttpParams();
    params.set('path', '/ClienteBienRaizWS/api/BienRaiz/asociado/obtener/96597810');


    let option = {
      params: params
    };

    this.http.get('https://dm5ujuys5b.execute-api.us-east-1.amazonaws.com/dev/proxy-private', option
    ).subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }*/
}
