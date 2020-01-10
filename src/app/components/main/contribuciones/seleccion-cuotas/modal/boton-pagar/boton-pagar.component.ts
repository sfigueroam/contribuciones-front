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
  
  @Input()
  multiAR_Resumen: string;

  urlPagoTgr: string;
  
  canalRecibido: string;
  reg: string;
  multiAR: string;
  
  
  
  
  constructor(public userdataservice: UserDataService) {
  }


  ngOnInit() {
    
    this.canalRecibido = this.userdataservice.canal;

    // console.log("códigos para pago", this.codigos);
    // this.urlPagoTgr = environment.pago.url;
    
  }
  pagar(){
    this.multiAR = JSON.stringify(this.multiAR_Resumen);
    console.log("multiAr", this.multiAR);
    console.log("MultiARString", this.multiAR_Resumen);
    }
}
