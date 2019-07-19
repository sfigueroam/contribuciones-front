import {Component, OnInit, InjectionToken, Inject} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

export const CANT_PROPIEDADES = new InjectionToken<number>('cant_propiedades');

@Component({
  selector: 'app-dialog-agregar-propiedad',
  templateUrl: './dialog-agregar-propiedad.component.html',
  styleUrls: ['./dialog-agregar-propiedad.component.scss']
})
export class DialogAgregarPropiedadComponent implements OnInit {


  cantPropiedades: number;

  constructor(
    private dialog: MdlDialogReference,
    private router: Router,
    @Inject(CANT_PROPIEDADES) cantPropiedades: number,
  ) {
    this.cantPropiedades = cantPropiedades;

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.dialog.hide())
    ).subscribe();
  }

  ngOnInit() {
  }

  continuar(): void {
    this.dialog.hide();
  }

  exit(){
    this.dialog.hide();
    this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
  }
}
