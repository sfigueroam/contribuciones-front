import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {DeviceDetectService} from '../../../../../../services/device-detect.service';
import {UserDataService} from '../../../../../../user-data.service';
import {CanalServiceService} from 'src/app/services/canal-service.service';

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
  
  constructor(public deviceDetectService: DeviceDetectService,
              public userdataservice: UserDataService,
              public canalService: CanalServiceService) {
  }



  ngOnInit() {

    this.canal = this.canalService.reg;
    //this.urlPagoTgr = environment.pago.url;
    
  }

}
