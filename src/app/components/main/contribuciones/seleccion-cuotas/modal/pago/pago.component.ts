import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {UserDataService} from '../../../../../../user-data.service';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  
  listaContribuciones: any;
  canalRecibido: string;
  urlPagoTgr: string;

  constructor(
    private dialog: MdlDialogReference,
    private router: Router,
    public userdataservice: UserDataService,
  ) {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.dialog.hide())
    ).subscribe();
  }

  ngOnInit() {
    this.listaContribuciones = 'on, ' + this.userdataservice.cidUnico + ', '
    this.canalRecibido = this.userdataservice.canal;
    this.urlPagoTgr = environment.pago.url;
  }

  volver(): void {
    this.dialog.hide();
  }
}
