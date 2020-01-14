import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {UserDataService} from '../../../../../../user-data.service';
import {ContribucionesService} from '../../../../../../services/contribuciones.service';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {PagoComponent} from './modal/pago/pago.component;

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
  pagoString: string;
  
  
  
  constructor(public userdataservice: UserDataService,
              public contribucionesservice: ContribucionesService,
              private dialogService: MdlDialogService,
              ) {
  }


  ngOnInit() {
    
    this.canalRecibido = this.userdataservice.canal;

    // console.log("códigos para pago", this.codigos);
    this.urlPagoTgr = environment.pago.url;

  }
  //JMS : prueba sin promesa
  pagar(){
    this.multiAR = this.userdataservice.multiAR_Cid;
    console.log("multiAR: ", this.multiAR);
    this.contribucionesservice.postMultiaR(this.multiAR).subscribe(
      (data) => {
        this.cidUnico = data.codigoBarra;
        console.log("this.cidUnico: ", this.cidUnico);
      });
    this.userdataservice.cidUnico = this.cidUnico;
    // abrir el modal
    this.dialogAyudaCondonacion();
    // Incorporación del pago
    // this.pagoString = this.cidUnico + ',' + this.canalRecibido
    // this.contribucionesservice.postPago(this.cidUnico, this.canalRecibido).subscribe();
  };
  dialogAyudaCondonacion(): void {
    const pDialog = this.dialogService.showCustomDialog({
      component: PagoComponent,
      clickOutsideToClose: true,
      isModal: true
    });
  }
    
  
  // botonPago(){
    
  // }
 
  
  
}
