import {Component, Input, OnInit} from '@angular/core';
import {HistorialPago} from '../../../../../domain/HistorialPago';
import {PitUtils} from '../../../../../pit-utils';

@Component({
  selector: 'app-historial-pago',
  templateUrl: './historial-pago.component.html',
  styleUrls: ['./historial-pago.component.scss']
})
export class HistorialPagoComponent implements OnInit {

  @Input()
  info: HistorialPago;

  rol: { comuna: string, rol: string, subrol: string };
  fechaEmision: Date;

  constructor() {
    this.fechaEmision = new Date();
  }

  ngOnInit() {
    this.rol = PitUtils.separaRol(this.info.formulario.rutRol);
  }
}
