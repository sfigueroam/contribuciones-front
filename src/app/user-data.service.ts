import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  nombre_usuario: string;
  //javier
  deudaNoLiquidable: boolean;
  conex_usuario: string;
  
  
  constructor() { }
  

}
