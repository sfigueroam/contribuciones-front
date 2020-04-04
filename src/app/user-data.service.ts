import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  nombre_usuario: string;
  multiAR_Cid: string;
  conex_usuario: string;
  canal: string;
  cidUnico: any;
  vieneCuoton: boolean = false;
  pagoTotal: boolean = false;
  contador = 0;
  mensajeCovid;
 
  
  constructor() { }

    
setRolBeneficio(){
  this.contador += 1;
}
setContador(){
  this.contador = 0;
}

getEstadoRolBeneficio(){
  return this.contador
}

setMensaje(a:boolean){
  this.mensajeCovid = a;
}

 getMensaje(){
  return this.mensajeCovid;
}


}
