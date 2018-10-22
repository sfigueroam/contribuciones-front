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

  total: number;

  constructor(private contributionsService: ContributionsService) {
  }

  updateSeleccionadaTotal(): void {
    const result = new Map<TipoCuota, number>();
    const propiedadComponentArray = this.propiedadComponentList.toArray();
    let total = 0;
    for (const propiedadComponent of propiedadComponentArray) {
      total += propiedadComponent.total;
      for (const tipo of propiedadComponent.tipos) {
        if (result.has(tipo)) {
          result.set(tipo, result.get(tipo) + 1);
        } else {
          result.set(tipo, 1);
        }
      }
    }
    this.total = total;

    const tipos = [TipoCuota.TODAS, TipoCuota.NINGUNA, TipoCuota.VENCIDAS, TipoCuota.VIGENTES];
    for (const tipo of tipos) {
      if (result.has(tipo) && result.get(tipo) === propiedadComponentArray.length) {
        this.seleccionada = tipo;
        return;
      }
    }

    this.seleccionada = undefined;
  }

  ngAfterViewInit() {
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
