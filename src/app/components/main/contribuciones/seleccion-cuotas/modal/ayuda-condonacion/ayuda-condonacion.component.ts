import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';

@Component({
  selector: 'app-ayuda-condonacion',
  templateUrl: './ayuda-condonacion.component.html',
  styleUrls: ['./ayuda-condonacion.component.scss']
})
export class AyudaCondonacionComponent implements OnInit {

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
