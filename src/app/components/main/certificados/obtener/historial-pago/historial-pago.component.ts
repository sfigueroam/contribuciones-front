import {Component, Input, OnInit} from '@angular/core';
import {HistorialPago} from '../../../../../domain/HistorialPago';
import {PitUtils} from '../../../../../pit-utils';

@Component({
  selector: 'app-historial-pago',
  templateUrl: './historial-pago.component.html',
  styleUrls: ['../bootstrap-3-grid.css', './historial-pago.component.scss', '../certificados.scss']
})
export class HistorialPagoComponent implements OnInit {

  @Input()
  info: HistorialPago[];
  rol: { comuna: string, rol: string, subrol: string };
  fechaEmision: Date;

  constructor() {
    this.fechaEmision = new Date();
  }

  ngOnInit() {
    if(this.info && this.info.length > 0){
      this.rol = PitUtils.separaRol(this.info[0].formulario.rutRol);
    }
  }
}
