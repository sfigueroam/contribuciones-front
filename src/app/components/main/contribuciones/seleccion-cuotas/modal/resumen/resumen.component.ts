import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

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
