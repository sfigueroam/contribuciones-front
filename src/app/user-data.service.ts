import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  nombre_usuario: string;
  //javier
  deudaNoLiquidable: boolean;
  conex_usuario: string;
  reg: string;
  
  constructor() { }
  
      detectaConexion():void{
      if (this.conex_usuario == "") {
        this.reg = "SC";
      }
      if (this.conex_usuario == "ClaveTesoreria"){
        this.reg = "CT";
      }
      if (this.conex_usuario == "ClaveUnica"){
        this.reg = "CU";
      }
      
    }
  
    

}
