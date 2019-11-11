import { Injectable } from '@angular/core';
import {DeviceDetectService} from '../app/services/device-detect.service';

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
