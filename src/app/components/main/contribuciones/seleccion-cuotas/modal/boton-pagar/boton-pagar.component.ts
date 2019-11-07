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
  
  conex: string;
  canal: string;
  form: string = "30";
  desktop: boolean = false;
  tablet: boolean = false;
  smartTv: boolean = false;
  mobile: boolean = false;
  
  
  
  constructor(public deviceDetectService: DeviceDetectService,
              public userdataservice: UserDataService) {
  }



  ngOnInit() {
    this.conex = this.userdataservice.reg;
    this.desktop = this.deviceDetectService.device.desktop;
    this.tablet = this.deviceDetectService.device.tablet;
    this.smartTv = this.deviceDetectService.device.smartTv;
    this.mobile = this.deviceDetectService.device.mobile;
    // if (this.desktop) {
    //   this.canal = this.form + "30D" + this.conex;
    // }
    // if (this.tablet) {
    //   this.canal = this.form + "30T" + this.conex;
    // }
    // if (this.smartTv) {
    //   this.canal = this.form + "30S" + this.conex;
    // }
    // if (this.mobile) {
    //   this.canal = this.form + "30M" + this.conex;
    // }
    
    this.urlPagoTgr = environment.pago.url;
    
  }

}
