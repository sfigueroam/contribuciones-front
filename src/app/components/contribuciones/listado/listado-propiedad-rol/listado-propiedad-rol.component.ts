import {Component, Input, OnInit} from '@angular/core';
import {Rol} from '../../../../domain/Rol';

@Component({
  selector: 'app-listado-propiedad-rol',
  templateUrl: './listado-propiedad-rol.component.html',
  styleUrls: ['./listado-propiedad-rol.component.scss']
})
export class ListadoPropiedadRolComponent implements OnInit {

  @Input()
  rol: Rol;

  constructor() { }

  ngOnInit() {
  }
}
