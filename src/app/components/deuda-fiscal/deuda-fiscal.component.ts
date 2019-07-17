import { Component, OnInit } from '@angular/core';
import { DeudaFiscalService } from '../../services/deuda-fiscal.service';

@Component({
  selector: 'app-deuda-fiscal',
  templateUrl: './deuda-fiscal.component.html',
  styleUrls: ['./deuda-fiscal.component.css']
})
export class DeudaFiscalComponent implements OnInit {

  listadoDeuda: any[];

  constructor( private deudaFiscalService: DeudaFiscalService ) {

    this.listadoDeuda = deudaFiscalService.getListado();

  }

  ngOnInit() {
  }

}
