import { Component, OnInit, Input } from '@angular/core';
import { ResumenCuotas } from 'src/app/domain/ResumenCuotas';

@Component({
  selector: 'app-resumen-pago',
  templateUrl: './resumen-pago.component.html',
  styleUrls: ['./resumen-pago.component.scss']
})
export class ResumenPagoComponent implements OnInit {

  @Input() existeVencidas: boolean;

  @Input() condonacion: number;

  @Input() complete: boolean;

  @Input() resumen: ResumenCuotas;

  constructor() { }

  ngOnInit() {
  }

}
