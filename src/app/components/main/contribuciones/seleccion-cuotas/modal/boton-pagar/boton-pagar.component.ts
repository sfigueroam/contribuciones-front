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
  promesa: any;
  
  
  
  constructor(public userdataservice: UserDataService,
              public contribucionesservice: ContribucionesService) {
  }


  ngOnInit() {
    
    this.canalRecibido = this.userdataservice.canal;

    // console.log("códigos para pago", this.codigos);
    // this.urlPagoTgr = environment.pago.url;

  }
  //JMS : prueba sin promesa
  pagar(){
    this.multiAR = this.userdataservice.multiAR_Cid;
    this.contribucionesservice.postMultiaR(this.multiAR).subscribe(
      (data) => {
        this.cidUnico = data;
        console.log("data dentro subscribe", data);
        console.log("this.cidUnico", this.cidUnico);
      });
  }
  
  
//  pagar(){
//    this.multiAR = this.userdataservice.multiAR_Cid;
//    // this.canalRecibido = this.userdataservice.canal;
//    console.log("multi ar por servicio", this.multiAR);
//  
//    this.promesa = Promise.resolve(this.contribucionesservice.getMultiAR(this.multiAR));
//    this.promesa.then(function(value){
//      // let cidUnico3 = value;
//      // console.log("cidUnico3", this.cidUnico3);
//      // this.userdataservice.cidUnico = value;
//      console.log("value2", value.codigoBarra);
//      
//      
//      return value;
//    });
//    setTimeout(function(){
//        console.log("promesa", this.promesa);
//    })
//
//  };
  
  
  // JMS: prueba con suscribe
  
  
}
