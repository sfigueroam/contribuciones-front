import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {Propiedad} from '../../../domain/Propiedad';
import {ContributionsService} from '../../../services/contributions.service';
import {TipoCuota} from '../../../domain/TipoCuota';
import {ListadoPropiedadComponent} from './listado-propiedad/listado-propiedad.component';
import {Rol} from '../../../domain/Rol';
import {MdlSnackbarService} from '@angular-mdl/core';

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
  cantidadRolesNoAsociados: number;

  mostrarAlerta: boolean;
  mostrarDelete: boolean;
  pagarInactivo: boolean;
  mostrarSugerenciaCondonacion: boolean;

  block: boolean;
  cantPropiedades: number;

  constructor(private contributionsService: ContributionsService, private mdlSnackbarService: MdlSnackbarService) {
    this.mostrarAlerta = false;
    this.mostrarDelete = false;
    this.pagarInactivo = true;
    this.block = false;
    this.mostrarSugerenciaCondonacion = true;
    this.cantPropiedades = 0;
    this.cantidadRolesNoAsociados = 0;

  }

  ngOnInit() {

    this.onBlock();
    this.cargarRolesNoAsociado();
    this.contributionsService
      .getBienesRaices()
      .then((propiedades) => {
        this.propiedades = propiedades;
        this.obtenerRoles().then(() => {
          this.offBlock();
        });
      });

    this.seleccionada = TipoCuota.TODAS;
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

  private listaRolesDesasociar(): Rol[] {
    const propiedadComponentArray = this.propiedadComponentList.toArray();
    let roles: Rol[] = [];
    for (const propiedadComponent of propiedadComponentArray) {
      const rolesDesasociar = propiedadComponent.getRolesDesasociar();
      roles = roles.concat(rolesDesasociar);
    }

    return roles;
  }

  private eliminar(roles: Rol[]): void {

    for (const rol of roles) {
      this.propiedades = this.propiedades.filter((propiedad: Propiedad) => {
        propiedad.desasociarRol(rol);
        if (propiedad.roles.length === 0) {
          return false;
        }
        return true;
      });
    }
    this.desasociarRoles(roles).then(() => {
      for (const propiedadesComponent of this.propiedadComponentList.toArray()) {
        propiedadesComponent.updateTipoTotal();
      }
      this.actualizarListaRoles(true);

    });

  }

  desasociar() {
    this.mostrarDelete = false;
    const timeOut = 5000;
    let cancelar = false;
    const roles = this.listaRolesDesasociar();

    let snackbar = this.mdlSnackbarService.showSnackbar({
      message: 'Desasociando ' + roles.length + ' rol(es)',
      action: {
        handler: () => {
          cancelar = true;
          this.mdlSnackbarService.showToast('Cancelado...', 3000);
          this.show();
        },
        text: 'Cancelar'
      }
    });

    snackbar.subscribe((bar) => {
      setTimeout(
        () => {
          if (!cancelar) {
            bar.hide();
            this.eliminar(roles);
          }
        },
        timeOut);
    });

  }


  private actualizarListaRoles(force?: boolean) {

    this.cargarRolesNoAsociado(force);


  }

  private desasociarRoles(roles: Rol[]): Promise<{}> {

    this.contributionsService.propiedades = this.propiedades;

    return new Promise((resolve, reject) => {
      let prom: Promise<{}>[] = [];
      for (const rol of roles) {
        prom.push(this.contributionsService.desasociarRol(rol));
      }
      Promise.all(prom).then(() => {
        resolve();
      });
    });
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

  obtenerRoles(): Promise<{}> {

    return this.contributionsService.getObtenerRoles(this.propiedades, this);

  }

  /*
    getPropiedadComponent(rolId: number): ListadoPropiedadRolComponent {
      for (const propiedadesComponent of this.propiedadComponentList.toArray()) {
        const rolComponent = propiedadesComponent.getRolComponent(rolId);
        return rolComponent;
      }
    }
  */
  actualizar(rolId: number): void {
    for (const propiedadesComponent of this.propiedadComponentList.toArray()) {
      propiedadesComponent.actualizarRol(rolId);
    }

  }

  private cargarRolesNoAsociado(force?: boolean): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      this.contributionsService
        .getRolesNoAsociados(force).then((data) => {
        if (data) {
          if (data.length > 0) {
            if (force === undefined || !force) {
              this.mostrarAlerta = true;
            }
            this.cantidadRolesNoAsociados = data.length;
          } else {
            this.mostrarAlerta = false;
          }
        }
        resolve();
      });
    });
  }


  public onWith(): void {
    this.onBlock();
    if (this.propiedadComponentList) {
      this.propiedadComponentList.forEach(
        (rolComponent) => rolComponent.onWait()
      );
    }
  }

  seleccionar(tipo: TipoCuota): void {
    this.onWith();
    if (this.propiedadComponentList) {
      this.reliquidar(tipo, this.propiedadComponentList.toArray(), 0).then(() => {
        this.offBlock();
      });
    }
    this.seleccionada = tipo;
  }


  private reliquidar(tipo: TipoCuota, listadoPropiedadComponents: ListadoPropiedadComponent[], index: number): Promise<{}> {
    if (index === (listadoPropiedadComponents.length - 1)) {
      return listadoPropiedadComponents[index].seleccionar(tipo);
    } else {
      return listadoPropiedadComponents[index].seleccionar(tipo).then(() => {
        return this.reliquidar(tipo, listadoPropiedadComponents, (index + 1));
      });
    }
  }


  onBlock(): void {
    this.block = true;
  }

  offBlock(): void {
    this.block = false;
  }

  openDialog() {
    this.detallePago.showDialog(this.propiedades);
  }

  blockPayment(block: boolean): void {
    if (block) {
      this.onBlock();
    } else {
      this.offBlock();
    }
  }

  private show() {
    const propiedadComponentArray = this.propiedadComponentList.toArray();
    for (const propiedadComponent of propiedadComponentArray) {
      propiedadComponent.show();
    }
  }
}
