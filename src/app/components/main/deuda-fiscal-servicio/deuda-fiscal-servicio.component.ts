import { Component, OnInit, Input } from '@angular/core';
import { DFServicio } from '../../../domain/DFServicio';


@Component({
  selector: 'app-deuda-fiscal-servicio',
  templateUrl: './deuda-fiscal-servicio.component.html',
  styleUrls: ['./deuda-fiscal-servicio.component.scss']
})

export class DeudaFiscalServicioComponent implements OnInit {


  @Input() servicio: DFServicio;

  selectedIcon: string;


  constructor() { }


  ngOnInit() {
  }

}
