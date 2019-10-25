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
    
}
