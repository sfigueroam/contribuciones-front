import { Component, OnInit } from '@angular/core';
import { DeudaFiscalService } from '../../../services/deuda-fiscal.service';
import { DFServicio } from '../../../domain/DFServicio';
import { DFDeuda } from '../../../domain/DFDeuda';




@Component({
  selector: 'app-deuda-fiscal',
  templateUrl: './deuda-fiscal.component.html',
  styleUrls: ['./deuda-fiscal.component.scss']
})
export class DeudaFiscalComponent implements OnInit {

  
  private listDeuda : DFDeuda[];

  private listServicio : DFServicio[];



  constructor( private _deudaFiscalService: DeudaFiscalService ) {

    this.listDeuda = _deudaFiscalService.getListDeuda();

    this.listServicio = _deudaFiscalService.getListServicio();

  }

  ngOnInit() {
  }


}
