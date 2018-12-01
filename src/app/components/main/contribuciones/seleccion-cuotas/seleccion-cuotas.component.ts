import {Component, OnInit} from '@angular/core';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {Propiedad} from '../../../../domain/Propiedad';
import {ContributionsService} from '../../../../services/contributions.service';
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
    let condonacion = 0;
    for (const p of this.propiedades) {
      total += p.total;
      condonacion += p.condonacion;
    }
    this.total = total;
    this.condonacion = condonacion;
    this.recalcularTipo();
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

  pay() {
    let codigos = '';
    for (const p of this.propiedades) {
      for (const r of p.roles) {
        for (const c of r.cuotas) {
          if (c.intencionPago) {
            if (r.condonacion > 0) {
              codigos += c.liqTotal.codigoBarra + ', ';
            } else {
              codigos += c.liqParcial.codigoBarra + ', ';
            }
          }
        }
      }
    }

    const data = new FormData();
    data.append('listaContribuciones', 'on, ' + codigos);
    data.append('pagar', 'PAGAR');

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
      console.log(this.responseText);
    });

    xhr.open('POST', environment.pago.url);
    xhr.send(data);
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
