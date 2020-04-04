import { Injectable } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';

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
  actualizarMensaje: EventEmitter  = new EventEmitter();
 
  
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
  this.actualizarMensaje.emit(this.mensajeCovid);
}

 getMensaje(){
  return this.mensajeCovid;
}


}
