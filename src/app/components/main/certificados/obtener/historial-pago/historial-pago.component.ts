import {Component, Input, OnInit} from '@angular/core';
import {HistorialPago} from '../../../../../domain/HistorialPago';

@Component({
  selector: 'app-historial-pago',
  templateUrl: './historial-pago.component.html',
  styleUrls: ['./historial-pago.component.scss']
})
export class HistorialPagoComponent implements OnInit {

  @Input()
  info: HistorialPago;

  constructor() {
  }

  ngOnInit() {
  }

}
