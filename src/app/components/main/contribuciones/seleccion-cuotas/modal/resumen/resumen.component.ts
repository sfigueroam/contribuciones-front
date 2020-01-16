import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
// import {CANT_PROPIEDADES} from '../../../agregar/nueva/modal/dialog-agregar-propiedad/dialog-agregar-propiedad.component';
import {Propiedad} from '../../../../../../domain/Propiedad';
import {environment} from '../../../../../../../environments/environment';
import {filter, tap} from 'rxjs/operators';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {ContribucionesService} from '../../../../../../services/contribuciones.service';
import {UserDataService} from '../../../../../../user-data.service';

export const LIST_PROPIEDADES = new InjectionToken<number>('lista_propiedades');
export const MULTI_AR_CODIGOS = new InjectionToken<number>('multiAR_Resumen');
export const CODIGO_LIST_PROPIEDADES = new InjectionToken<number>('codigo_lista_propiedades');
export const TOTAL_PROPIEDADES = new InjectionToken<number>('total_propiedades');
export const CONDONACION_PROPIEDADES = new InjectionToken<number>('condonacion_propiedades');
export const EXISTE_VENCIDAS = new InjectionToken<number>('existe_vencidas');

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  propiedades: Propiedad[];
  codigos: string;
  total: number;
  condonacion: number;
  existeVencidas: boolean;
  multiARString: string;
  cidUnico: string;
  canal: string;
  urlPagoTgr: string;

  constructor(
    private dialog: MdlDialogReference,
    private router: Router,
    private contribuciones: ContribucionesService,
    private userdataservice: UserDataService,
    @Inject(LIST_PROPIEDADES) propiedades: Propiedad[],
    @Inject(MULTI_AR_CODIGOS) multiARString: string,
    @Inject(CODIGO_LIST_PROPIEDADES) codigos: string,
    @Inject(TOTAL_PROPIEDADES) total: number,
    @Inject(CONDONACION_PROPIEDADES) condonacion: number,
    @Inject(EXISTE_VENCIDAS) existeVencidas: boolean,

  ) {

    this.propiedades = propiedades;
    this.codigos = codigos;
    this.total = total;
    this.condonacion = condonacion;
    this.existeVencidas = existeVencidas;
    this.multiARString = multiARString;

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.dialog.hide())
    ).subscribe();

  }

  ngOnInit() {
    this.canal = this.userdataservice.canal;
    this.urlPagoTgr = environment.pago.url;
    this.obtieneCidUnico();
  }


  volver(): void {
    this.dialog.hide();
  }
  public obtieneCidUnico(){
    this.contribuciones.postMultiaR(this.multiARString).subscribe(
      (data) => {
        console.log("data", data);
        this.cidUnico = 'on, ' + data.codigoBarra + ', ';
        console.log("this.cidUnico resumen", this.cidUnico);
      }, error => {
        console.log("error", error);
      }
      );
  };
}
