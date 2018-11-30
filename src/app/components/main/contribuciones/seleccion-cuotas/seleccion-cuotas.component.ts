import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {Propiedad} from '../../../../domain/Propiedad';
import {DetallePagoComponent} from '../../../modal/detalle-pago/detalle-pago.component';
import {ContributionsService} from '../../../../services/contributions.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {ResumenCuotas} from '../../../../domain/ResumenCuotas';
import {UserService} from '../../../../services/user.service';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seleccion-cuotas',
  templateUrl: './seleccion-cuotas.component.html',
  styleUrls: ['./seleccion-cuotas.component.scss']
})
export class SeleccionCuotasComponent implements OnInit {

  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;

  propiedades: Propiedad[] = [];

  tipo = TipoCuota;
  seleccionada: TipoCuota;

  total: number;
  complete: boolean;

  rolesSugeridos = 0;
  ocultarAlertaSugeridas = false;

  constructor(private router: Router,
              private user: UserService,
              private contributions: ContributionsService,
              private sugeridas: ContribucionesSugeridasService,
              private mdlSnackbarService: MdlSnackbarService) {
  }

  ngOnInit() {
    this.complete = false;
    this.seleccionada = TipoCuota.TODAS;

    this.user.getRolesNoAsociados().then(
      (props: Propiedad[]) => this.rolesSugeridos = props.length,
      (err) => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles sugeridos');
      }
    );

    this.user.getBienesRaices().then(
      (propiedades) => {
        this.propiedades = propiedades;
        this.contributions.cargarRoles().then(
          () => {
            this.complete = true;
            this.calcularTotal();
            for (const p of this.propiedades) {
              p.changeStream.subscribe(
                () => {
                  this.calcularTotal();
                }
              );
            }
          },
          err => {
            console.log(err);
            this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles');
          }
        );
      },
      err => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al cargar las propiedades');
      }
    );
  }

  private calcularTotal() {
    let total = 0;
    for (const p of this.propiedades) {
      total += p.total;
    }
    this.total = total;
  }

  gotoSugeridas() {
    this.router.navigate(['/main/contribuciones/agregar/sugeridas']);
  }

  onChange() {
    this.recalcularTipo();
  }

  seleccionar(tipo: TipoCuota): void {
    for (const propiedad of this.propiedades) {
      propiedad.seleccionar(tipo);
    }
    this.recalcularTipo();
  }

  summary() {
    this.detallePago.showDialog(this.propiedades);
  }

  pay() {

  }

  private recalcularTipo() {
    const result = new ResumenCuotas();
    for (const propiedad of this.propiedades) {
      const resumen = propiedad.resumen();
      result.total += resumen.total;
      result.seleccionadas += resumen.seleccionadas;
      result.vencidas += resumen.vencidas;
      result.vencidasSeleccionadas += resumen.vencidasSeleccionadas;
    }
    this.seleccionada = result.tipo();
  }
}
