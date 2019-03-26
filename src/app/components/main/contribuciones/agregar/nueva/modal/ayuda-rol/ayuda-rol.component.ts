import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';

@Component({
  selector: 'app-ayuda-rol',
  templateUrl: './ayuda-rol.component.html',
  styleUrls: ['./ayuda-rol.component.scss']
})
export class AyudaRolComponent implements OnInit {

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
