import {Component, OnInit} from '@angular/core';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {Propiedad} from '../../../../domain/Propiedad';
import {ContribucionesService} from '../../../../services/contribuciones.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {ResumenCuotas} from '../../../../domain/ResumenCuotas';
import {UserService} from '../../../../services/user.service';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-seleccion-cuotas',
  templateUrl: './seleccion-cuotas.component.html',
  styleUrls: ['./seleccion-cuotas.component.scss']
})
export class SeleccionCuotasComponent implements OnInit {

  propiedades: Propiedad[] = [];

  tipo = TipoCuota;
  seleccionada: TipoCuota;
  cantidadSeleccionadas: number;

  total: number;
  condonacion: number;
  complete: boolean;

  rolesSugeridos = 0;
  ocultarAlertaSugeridas = false;

  listaContribuciones: string;

  urlPagoTgr: string;

  constructor(private router: Router,
              private user: UserService,
              private contribuciones: ContribucionesService,
              private sugeridas: ContribucionesSugeridasService,
              private mdlSnackbarService: MdlSnackbarService) {
  }

  ngOnInit() {
    this.complete = false;
    this.seleccionada = TipoCuota.TODAS;
    this.urlPagoTgr = environment.pago.url;

    this.user.getRolesNoAsociados().then(
      (props: Propiedad[]) => {
        this.rolesSugeridos = 0;
        for (const p of props) {
          this.rolesSugeridos += p.roles.length;
        }
      },
      (err) => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles sugeridos', environment.snackbarTime);
      }
    );

    this.user.getBienesRaices().then(
      (propiedades) => {
        this.propiedades = propiedades;
        this.contribuciones.cargarRoles().then(
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
            this.mdlSnackbarService.showToast('Ocurrió un error al cargar los roles', environment.snackbarTime);
          }
        );
      },
      err => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al cargar las propiedades', environment.snackbarTime);
      }
    );
  }

  private calcularTotal() {
    let total = 0;
    let condonacion = 0;
    for (const p of this.propiedades) {
      total += p.total;
      condonacion += p.condonacion;
    }
    this.total = total;
    this.condonacion = condonacion;
    this.recalcularTipo();

    let codigos = 'on, ';
    for (const p of this.propiedades) {
      for (const r of p.roles) {
        for (const c of r.cuotas) {
          if (c.intencionPago) {
            /*if (c.numeroCuota === '5-1988') {
              console.log(c);
            }
            if (c.liqParcial === undefined) {
              console.log(c);
            }*/
            if (r.condonacion > 0) {
              codigos += c.liqTotal.codigoBarra + ', ';
            } else {
              codigos += c.liqParcial.codigoBarra + ', ';
            }
          }
        }
      }
    }
    this.listaContribuciones = codigos;
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
    this.cantidadSeleccionadas = result.seleccionadas;
  }
}
