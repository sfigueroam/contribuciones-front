import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {UserDataService} from '../../../../../../user-data.service';
import {ContribucionesService} from '../../../../../../services/contribuciones.service';

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
  multiAR: string;
  cidUnico: any;
  cidUnico1: any;
  cidUnicoString: string;
  
  
  
  
  constructor(public userdataservice: UserDataService,
              public contribucionesservice: ContribucionesService) {
  }


  ngOnInit() {
    
    this.canalRecibido = this.userdataservice.canal;

    // console.log("códigos para pago", this.codigos);
    // this.urlPagoTgr = environment.pago.url;
    
  }
  pagar(){
    this.multiAR = this.userdataservice.multiAR_Cid;
    // this.canalRecibido = this.userdataservice.canal;
    console.log("multi ar por servicio", this.multiAR);
  
    
    // this.cidUnico1 = this.contribucionesservice.getMultiAR(this.multiAR);
    this.cidUnico1 = this.contribucionesservice.getMultiAR(this.multiAR);
    // this.cidUnicoString = JSON.stringify(this.cidUnico1);
    
    this.cidUnico = this.userdataservice.cidUnico;
    console.log("cidUnico desde userdataservice", this.cidUnico);
    console.log("cidunico directo userdataservice", this.userdataservice.cidUnico)
    console.log("cidUnico2", this.cidUnicoString);
  }
  
  
}
