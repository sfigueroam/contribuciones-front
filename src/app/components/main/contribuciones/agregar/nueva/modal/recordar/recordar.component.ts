import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

export const CANT_PROPIEDADES_SELEC = new InjectionToken<number>('cant_propiedades_selec');

@Component({
  selector: 'app-recordar',
  templateUrl: './recordar.component.html',
  styleUrls: ['./recordar.component.scss']
})
export class RecordarComponent implements OnInit {

  cantPropiedades: number;

  constructor(
    private dialog: MdlDialogReference,
    private router: Router,
    @Inject(CANT_PROPIEDADES_SELEC) cantPropiedades: number,
  ) {
    this.cantPropiedades = cantPropiedades;

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

  agregar() {
    this.dialog.hide('agregar');

  }
}
