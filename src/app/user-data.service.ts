import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  nombre_usuario: string;
  //javier
  deudaNoLiquidable: boolean;
  conex_usuario: string;
  sinClave: boolean = false;
  claveTgr: boolean = false;
  claveUnica: boolean = false;
  
  constructor() { }
  
  conexion_Usuario(){
    
    if (this.conex_usuario == "") {
      this.sinClave = true;
      return this.sinClave;
      console.log("sin clave" || this.sinClave);
    }
    if (this.conex_usuario == "ClaveTesoreria"){
      this.claveTgr = true;
      return this.claveTgr;
      console.log("sin clave" || this.claveTgr);
    }
    if (this.conex_usuario == "ClaveUnica"){
      this.claveUnica = true;
      return this.claveUnica;
      console.log("sin clave" || this.claveUnica);
    }
    
  }
    

}
