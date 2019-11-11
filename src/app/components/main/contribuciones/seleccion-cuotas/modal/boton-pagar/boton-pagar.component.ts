import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
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
  
  canalRecibido: string;
  reg: string;
  
  
  
  
  constructor(public userdataservice: UserDataService) {
  }


  ngOnInit() {
    
    this.canalRecibido = this.userdataservice.canal;
    this.urlPagoTgr = environment.pago.url;
    
  }

}
