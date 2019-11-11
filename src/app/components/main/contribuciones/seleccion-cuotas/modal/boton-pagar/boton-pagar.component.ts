import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {DeviceDetectService} from '../../../../../../services/device-detect.service';
import {UserDataService} from '../../../../../../user-data.service';

@Component({
  selector: 'app-boton-pagar',
  templateUrl: './boton-pagar.component.html',
  styleUrls: ['./boton-pagar.component.scss']
})
export class BotonPagarComponent implements OnInit {


  @Input()
  total: number;

  @Input()
  codigos: string;

  urlPagoTgr: string;
  
  canal: string;
  reg: string;
  
  
  
  
  constructor(public deviceDetectService: DeviceDetectService,
              public userdataservice: UserDataService) {
  }



  ngOnInit() {
    this.canal = '';
    this.reg = '';
      if (this.userdataservice.conex_usuario == "") {
        this.reg = 'SC';
      }
      if (this.userdataservice.conex_usuario == "ClaveTesoreria"){
        this.reg = 'CT';
      }
      if (this.userdataservice.conex_usuario == "ClaveUnica"){
        this.reg = 'CU';
      }
      if (this.deviceDetectService.isDeviceDesktop){
        this.canal = '30D' + this.reg; 
      }
      if (this.deviceDetectService.isDeviceMobile){
        this.canal = '30M' + this.reg; 
      }
      if (this.deviceDetectService.isDeviceSmartTv){
        this.canal = '30S' + this.reg;
      }
      if (this.deviceDetectService.isDeviceTablet){
        this.canal = '30T' + this.reg;
      }
    
    this.urlPagoTgr = environment.pago.url;
    
  }

}
