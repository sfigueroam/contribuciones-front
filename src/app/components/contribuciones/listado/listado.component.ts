import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {Propiedad} from '../../../domain/Propiedad';
import {ContributionsService} from '../../../services/contributions.service';
import {TipoCuota} from '../../../domain/TipoCuota';
import {ListadoPropiedadComponent} from './listado-propiedad/listado-propiedad.component';
import {HttpClient} from '@angular/common/http';
import {ListadoPropiedadRolComponent} from './listado-propiedad-rol/listado-propiedad-rol.component';

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
  cuotasTotal: number;
  cuotasSeleccionadas: number;

  mostrarAlerta: boolean;
  mostrarDelete: boolean;
  pagarInactivo: boolean;
  mostrarSugerenciaCondonacion: boolean;

  constructor(private contributionsService: ContributionsService) {
    this.mostrarAlerta = false;
    this.mostrarDelete = false;
    this.pagarInactivo = true;
    this.mostrarSugerenciaCondonacion = true;
    // TODO eliminar este workaround para que se muestre la alerta a destiempo
    setTimeout(
      () => {
        this.mostrarAlerta = true;
      },
      1500
    );
  }

  ocultarAlerta(): void {
    this.mostrarAlerta = false;
  }

  activarEliminacion(): void {
    this.mostrarDelete = true;
  }

  cancelarEliminacion(): void {
    this.mostrarDelete = false;
  }

  eliminar(): void {
    this.mostrarDelete = false;
  }

  updateSeleccionadaTotal(): void {

    const result = new Map<TipoCuota, number>();
    const propiedadComponentArray = this.propiedadComponentList.toArray();

    let total = 0;
    let cuotasTotal = 0;
    let cuotasSeleccionadas = 0;
    for (const propiedadComponent of propiedadComponentArray) {
      if (propiedadComponent.total === undefined) {
        break;
      }
      total += propiedadComponent.total;

      for (const tipo of propiedadComponent.tipos) {
        if (result.has(tipo)) {
          result.set(tipo, result.get(tipo) + 1);
        } else {
          result.set(tipo, 1);
        }
      }
      cuotasTotal += propiedadComponent.cuotasTotal;
      cuotasSeleccionadas += propiedadComponent.cuotasSeleccionadas;
    }
    this.total = total;
    this.cuotasSeleccionadas = cuotasSeleccionadas;
    this.pagarInactivo = this.cuotasSeleccionadas === 0;
    this.cuotasTotal = cuotasTotal;

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

  obtenerRoles() {
    this.contributionsService.getObtenerRoles(this.propiedades, this);

  }

  getPropiedadComponent(rolId: number): ListadoPropiedadRolComponent {
    for (const propiedadesComponent of this.propiedadComponentList.toArray()) {
      const rolComponent = propiedadesComponent.getRolComponent(rolId);
      return rolComponent;
    }
  }

  actualizar(rolId: number): void {
    for (const propiedadesComponent of this.propiedadComponentList.toArray()) {
      propiedadesComponent.actualizarRol(rolId);
    }

  }

  ngOnInit() {
    this.contributionsService
      .getBienesRaices()
      .then((propiedades) => {
        this.propiedades = propiedades;

        this.obtenerRoles();
      });

    this.seleccionada = TipoCuota.TODAS;
  }


  public onWith(): void {
    if (this.propiedadComponentList) {
      this.propiedadComponentList.forEach(
        (rolComponent) => rolComponent.onWait()
      );
    }
  }
  seleccionar(tipo: TipoCuota): void {
    this.onWith();
    if (this.propiedadComponentList) {
      this.reliquidar(tipo, this.propiedadComponentList.toArray(), 0);
    }
    this.seleccionada = tipo;
  }


  private reliquidar(tipo: TipoCuota, listadoPropiedadComponents: ListadoPropiedadComponent[], index: number): Promise<{}> {
    if (index >= listadoPropiedadComponents.length) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    } else {
      return new Promise((resolve, reject) => listadoPropiedadComponents[index].seleccionar(tipo).then(() => {
          this.reliquidar(tipo, listadoPropiedadComponents, (index + 1)).then(() => {
            resolve();
          });
        })
      );
    }

  }


  openDialog() {
    this.detallePago.showDialog(this.propiedades);
  }
}
