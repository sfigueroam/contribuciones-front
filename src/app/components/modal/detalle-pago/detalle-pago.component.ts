import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Propiedad} from '../../../domain/Propiedad';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.scss']
})
export class DetallePagoComponent implements OnInit {

  @ViewChild('dialog')
  dialog: ElementRef;

  propiedades: Propiedad[];

  total: number;
  condonacion: number;

  constructor() {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }

  showDialog(propiedades: Propiedad[]): void {
    this.propiedades = [];
    this.total = 0;
    this.condonacion = 0;
    for (const propiedad of propiedades) {
      if (propiedad.tieneCuotasSeleccionadas()) {
        this.propiedades.push(propiedad);
      }
      this.total += propiedad.calcularTotalCondonado();
      this.condonacion += propiedad.calcularCondonacion();
    }
    this.dialog.nativeElement.showModal();
  }

  siguiente() {

  }
}
