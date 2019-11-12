import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  nombre_usuario: string;
  deudaNoLiquidable: boolean;
  conex_usuario: string;
  canal: string;
  
  constructor() { }

    

}
