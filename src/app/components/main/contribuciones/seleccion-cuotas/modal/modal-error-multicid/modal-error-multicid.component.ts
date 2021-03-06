import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-modal-error-multicid',
  templateUrl: './modal-error-multicid.component.html',
  styleUrls: ['./modal-error-multicid.component.css']
})
export class ModalErrorMulticidComponent implements OnInit {

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
