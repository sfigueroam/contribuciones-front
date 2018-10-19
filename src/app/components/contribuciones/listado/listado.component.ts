import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {Propiedad} from '../../../domain/Propiedad';
import {ContributionsService} from '../../../services/contributions.service';
import {TipoCuota} from '../../../domain/TipoCuota';
import {ListadoPropiedadComponent} from './listado-propiedad/listado-propiedad.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, AfterViewInit {

  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;
  @ViewChildren(ListadoPropiedadComponent)
  propiedadComponentList: QueryList<ListadoPropiedadComponent>;

  propiedades: Propiedad[] = [];

  tipo = TipoCuota;
  seleccionada: TipoCuota;

  constructor(private contributionsService: ContributionsService) {
  }

  ngAfterViewInit() {
    console.log('propiedadComponentList', this.propiedadComponentList);
  }

  ngOnInit() {
    this.propiedades = this.contributionsService.getBienesRaices();
    this.seleccionada = TipoCuota.TODAS;
  }

  seleccionar(tipo: TipoCuota): void {
    if (this.propiedadComponentList) {
      this.propiedadComponentList.forEach(
        (rolComponent) => rolComponent.seleccionar(tipo)
      );
    }
    this.seleccionada = tipo;
  }

  openDialog() {
    this.detallePago.showDialog();
  }
}
