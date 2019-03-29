import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';

@Component({
  selector: 'app-ayuda-direccion',
  templateUrl: './ayuda-direccion.component.html',
  styleUrls: ['./ayuda-direccion.component.scss']
})
export class AyudaDireccionComponent implements OnInit {

  constructor(
    private dialog: MdlDialogReference,
  ) {
  }

  ngOnInit() {
  }


  volver(): void {
    this.dialog.hide();
  }
}
