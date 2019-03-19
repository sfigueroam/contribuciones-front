import {Component, Input, OnInit} from '@angular/core';
import {Rol} from '../../../../domain/Rol';

@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.component.html',
  styleUrls: ['./linea-tiempo.component.scss']
})
export class LineaTiempoComponent implements OnInit {


  @Input()
  buscar: boolean;
  @Input()
  seleccionar: boolean;

  @Input()
  doneBuscar: boolean;
  @Input()
  doneSeleccionar: boolean;


  constructor() { }

  ngOnInit() {
  }

}
