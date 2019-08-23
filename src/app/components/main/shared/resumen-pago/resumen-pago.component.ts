import { Component, OnInit, Input } from '@angular/core';
import { DFResumen } from '../../../../domain/DFResumen';

@Component({
  selector: 'app-resumen-pago',
  templateUrl: './resumen-pago.component.html',
  styleUrls: ['./resumen-pago.component.scss']
})
export class ResumenPagoComponent implements OnInit {

  @Input() total: number;
  
  @Input() condonacion: number;

  @Input() existeVencidas: boolean;

  @Input() complete: boolean;

  @Input() resumen: DFResumen;


  constructor() { }

  ngOnInit() { }

}
