import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-agregar-propiedad',
  templateUrl: './dialog-agregar-propiedad.component.html',
  styleUrls: ['./dialog-agregar-propiedad.component.scss']
})
export class DialogAgregarPropiedadComponent implements OnInit {


  countPropiedades: number;
  constructor() { }

  ngOnInit() {
  }

  continuar(){

  }

  exit(){

  }
}
