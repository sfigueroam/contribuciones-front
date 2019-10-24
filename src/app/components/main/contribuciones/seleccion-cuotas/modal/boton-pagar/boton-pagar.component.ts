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
  user_conex: string;
  sinClave: boolean = false;
  claveTgr: boolean = false;
  claveUnica: boolean = false;

  constructor(public deviceDetectService: DeviceDetectService,
              private userdataservice: UserDataService) {
  }

  ngOnInit() {
    this.user_conex = this.userdataservice.conex_usuario;
    console.log(this.user_conex);
    if (this.user_conex == "") {
      this.sinClave = true;
      console.log("sin clave" || this.sinClave);
    }
    if (this.user_conex == "ClaveTesoreria"){
      this.claveTgr = true;
      console.log("sin clave" || this.claveTgr);
    }
    if (this.user_conex == "ClaveUnica"){
      this.claveUnica = true;
      console.log("sin clave" || this.claveUnica);
    }
    
    //this.urlPagoTgr = environment.pago.url;
    
  }

}
