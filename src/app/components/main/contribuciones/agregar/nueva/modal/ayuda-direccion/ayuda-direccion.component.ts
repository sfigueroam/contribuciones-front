import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
import {filter, tap} from 'rxjs/operators';
import {NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-ayuda-direccion',
  templateUrl: './ayuda-direccion.component.html',
  styleUrls: ['./ayuda-direccion.component.scss']
})
export class AyudaDireccionComponent implements OnInit {

  constructor(
    private dialog: MdlDialogReference,
    private router: Router
  ) {

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
