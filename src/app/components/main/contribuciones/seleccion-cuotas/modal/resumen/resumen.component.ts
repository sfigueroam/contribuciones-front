import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
import {CANT_PROPIEDADES} from '../../../agregar/nueva/modal/dialog-agregar-propiedad/dialog-agregar-propiedad.component';
import {Propiedad} from '../../../../../../domain/Propiedad';
import {environment} from '../../../../../../../environments/environment';
import {DeviceDetectService} from '../../../../../../services/device-detect.service';
import {filter, tap} from 'rxjs/operators';
import {NavigationStart, Router, RouterEvent} from '@angular/router';

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

  constructor(
    private dialog: MdlDialogReference,
    private deviceDetectService: DeviceDetectService,
    private router: Router,
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
  }


  volver(): void {
    this.dialog.hide();
  }
}
