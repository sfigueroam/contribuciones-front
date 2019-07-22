import { Component, OnInit, Input } from '@angular/core';
import { DFFormulario } from '../../../domain/DFFormulario';

@Component({
  selector: 'app-deuda-fiscal-formulario',
  templateUrl: './deuda-fiscal-formulario.component.html',
  styleUrls: ['./deuda-fiscal-formulario.component.scss']
})
export class DeudaFiscalFormularioComponent implements OnInit {

  @Input() formulario: DFFormulario;

  constructor() { }

  ngOnInit() {
  }

}
