import { Injectable } from '@angular/core';
import {DeviceDetectService} from '../app/services/device-detect.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  nombre_usuario: string;
  //javier
  deudaNoLiquidable: boolean;
  conex_usuario: string;
  
  constructor(public deviceDetectService: DeviceDetectService) { }

      // detectaConexion():string{
      // detectaConexion(){
      // if (this.conex_usuario == "") {
      //   this.reg = 'SC';
      // }
      // if (this.conex_usuario == "ClaveTesoreria"){
      //   this.reg = 'CT';
      // }
      // if (this.conex_usuario == "ClaveUnica"){
      //   this.reg = "CU";
      // }
      // if (this.deviceDetectService.isDeviceDesktop){
      //   this.canal = "30D" + this.reg; 
      // }
      // if (this.deviceDetectService.isDeviceMobile){
      //   this.canal = "30M" + this.reg; 
      // }
      // if (this.deviceDetectService.isDeviceSmartTv){
      //   this.canal = "30S" + this.reg;
      // }
      // if (this.deviceDetectService.isDeviceTablet){
      //   this.canal = "30T" + this.reg;
      // }
      // return this.canal;
    // }
  
    

}
