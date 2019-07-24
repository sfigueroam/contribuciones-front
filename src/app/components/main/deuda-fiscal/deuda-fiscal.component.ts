import { Component, OnInit } from '@angular/core';
import { DeudaFiscalService } from '../../../services/deuda-fiscal.service';


@Component({
  selector: 'app-deuda-fiscal',
  templateUrl: './deuda-fiscal.component.html',
  styleUrls: ['./deuda-fiscal.component.scss']
})
export class DeudaFiscalComponent implements OnInit {

  listado: any[];

  constructor( private deudaFiscalService: DeudaFiscalService ) {

    this.listado = deudaFiscalService.getListado();

  }

  ngOnInit() {
  }

}
