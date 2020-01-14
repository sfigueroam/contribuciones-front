import {Component, Input, OnInit} from '@angular/core';
import {Propiedad} from '../../../../../../domain/Propiedad';
import {environment} from '../../../../../../../environments/environment';
import {UserDataService} from '../../../../../../user-data.service';
import {ContribucionesService} from '../../../../../../services/contribuciones.service';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {
  MULTI_AR_CODIGOS,
  CODIGO_LIST_PROPIEDADES,
  CONDONACION_PROPIEDADES,
  EXISTE_VENCIDAS,
  LIST_PROPIEDADES,
  ResumenComponent,
  TOTAL_PROPIEDADES
} from '../resumen/resumen.component';

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
  
  propiedades: Propiedad[] = [];
  multiARString2: string;
  listaContribuciones: string;
  condonacion: number;
  existeVencidas = false;
  
  
  
  constructor(public userdataservice: UserDataService,
              public contribucionesservice: ContribucionesService,
              private dialogService: MdlDialogService,) {
  }


  ngOnInit() {
    
    this.canalRecibido = this.userdataservice.canal;

    // console.log("códigos para pago", this.codigos);
    this.urlPagoTgr = environment.pago.url;

  }
  //JMS : prueba sin promesa
  pagar(){
    this.multiAR = this.userdataservice.multiAR_Cid;
    this.contribucionesservice.postMultiaR(this.multiAR).subscribe(
      (data) => {
        this.cidUnico = 'on, ' + data.codigoBarra;
        console.log("this.cidUnico", this.cidUnico);
      });
    // Incorporación del pago
    this.pagoString = this.cidUnico + ',' + this.canalRecibido
    this.contribucionesservice.postPago(this.pagoString).subscribe();
    this.openDialogResumen();
  };
  // Abrir díalogo de resumen para el pago
    private openDialogResumen() {
    const pDialog = this.dialogService.showCustomDialog({
      component: ResumenComponent,
      clickOutsideToClose: true,
      providers: [
        {provide: LIST_PROPIEDADES, useValue: this.propiedades},
        {provide: MULTI_AR_CODIGOS, useValue: this.multiARString2},
        {provide: CODIGO_LIST_PROPIEDADES, useValue: this.listaContribuciones},
        {provide: TOTAL_PROPIEDADES, useValue: this.total},
        {provide: CONDONACION_PROPIEDADES, useValue: this.condonacion},
        {provide: EXISTE_VENCIDAS, useValue: this.existeVencidas}
      ],
      classes: 'dialogo-resumen-deudas',
      isModal: true
    });
  }
 
  
  
}
