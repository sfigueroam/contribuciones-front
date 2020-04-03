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
  
  mensajeCovid;
  
  constructor() { }

    

setMensaje(){
  console.log('entre a setear el mensaje');
  this.mensajeCovid = true;
}

getMensaje(){
  return this.mensajeCovid;
}


}
