import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {DeviceDetectService} from '../../../../../../services/device-detect.service';

@Component({
  selector: 'app-boton-pagar',
  templateUrl: './boton-pagar.component.html',
  styleUrls: ['./boton-pagar.component.scss']
})
export class BotonPagarComponent implements OnInit {


  @Input()
  total: number;

  @Input()
  codigos: number;

  urlPagoTgr: string;

  constructor(public deviceDetectService: DeviceDetectService) {
  }

  ngOnInit() {
    this.urlPagoTgr = environment.pago.url;
  }

}
