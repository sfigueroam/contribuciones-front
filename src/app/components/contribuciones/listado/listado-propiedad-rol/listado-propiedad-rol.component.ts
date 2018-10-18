import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rol} from '../../../../domain/Rol';

@Component({
  selector: 'app-listado-propiedad-rol',
  templateUrl: './listado-propiedad-rol.component.html',
  styleUrls: ['./listado-propiedad-rol.component.scss']
})
export class ListadoPropiedadRolComponent implements OnInit {

  @Input()
  rol: Rol;

  @Output()
  onResize: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  activateTab(year: number) {
    this.onResize.emit();
  }
}
