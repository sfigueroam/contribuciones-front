import {DeviceDetectService} from './../services/device-detect.service';
import {UserDataService} from './../user-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanalServiceService{

  conex_usuario : string;
  reg : string;

  constructor(private deviceDetectService: DeviceDetectService,
              private userdataservice: UserDataService){
              }
    
  
    detectaConexion():void{
      this.conex_usuario = this.userdataservice.conex_usuario;
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
