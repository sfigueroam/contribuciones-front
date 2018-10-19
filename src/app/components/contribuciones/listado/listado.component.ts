import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {Propiedad} from '../../../domain/Propiedad';
import {ContributionsService} from '../../../services/contributions.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, AfterViewInit {

  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;

  propiedades: Propiedad[] = [];

  constructor(private contributionsService: ContributionsService) {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.propiedades = this.contributionsService.getBienesRaices();
  }

  openDialog() {
    this.detallePago.showDialog();
  }
}
