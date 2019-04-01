import {Component, OnInit} from '@angular/core';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {Propiedad} from '../../../../domain/Propiedad';
import {ContribucionesService} from '../../../../services/contribuciones.service';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {ResumenCuotas} from '../../../../domain/ResumenCuotas';
import {UserService} from '../../../../services/user.service';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {DeviceDetectService} from '../../../../services/device-detect.service';
import {AyudaDireccionComponent} from '../agregar/nueva/modal/ayuda-direccion/ayuda-direccion.component';
import {AyudaCondonacionComponent} from './modal/ayuda-condonacion/ayuda-condonacion.component';
import {CheckboxIcon} from '../../../../domain/CheckboxIcon';
import {ResumenComponent} from './modal/resumen/resumen.component';

@Component({
  selector: 'app-seleccion-cuotas',
  templateUrl: './seleccion-cuotas.component.html',
  styleUrls: ['./seleccion-cuotas.component.scss']
})
export class SeleccionCuotasComponent implements OnInit {

  propiedades: Propiedad[] = [];

  tipo = TipoCuota;
  seleccionada: TipoCuota = this.tipo.TODAS;
  cantidadSeleccionadas: number;

  selectTipo: TipoCuota = this.tipo.TODAS;

  total: number;
  condonacion: number;
  complete: boolean;

  rolesSugeridos = 0;
  ocultarAlertaSugeridas = false;

  listaContribuciones: string;

  urlPagoTgr: string;

  existeVencidas = false;

  selectedIcon: string;

  result: ResumenCuotas;

  constructor(private router: Router,
              private user: UserService,
              private contribuciones: ContribucionesService,
              private sugeridas: ContribucionesSugeridasService,
              private mdlSnackbarService: MdlSnackbarService,
              private deviceDetectService: DeviceDetectService,
              private dialogService: MdlDialogService,) {
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
    const resultados = new ResumenCuotas();
    for (const propiedad of this.propiedades) {
      const resumen = propiedad.resumen();
      resultados.total += resumen.total;
      resultados.seleccionadas += resumen.seleccionadas;
      resultados.vencidas += resumen.vencidas;
      resultados.vencidasSeleccionadas += resumen.vencidasSeleccionadas;
    }
    this.seleccionada = resultados.tipo();
    this.cantidadSeleccionadas = resultados.seleccionadas;
    this.existeVencidas = resultados.vencidas > 0;

    this.result = resultados;

    this.updateIconSeleccion(resultados);
  }

  dialogAyudaCondonacion(): void {
    const pDialog = this.dialogService.showCustomDialog({
      component: AyudaCondonacionComponent,
      clickOutsideToClose: true,
      isModal: true
    });
  }

  //Todo pendiente termianar
  private updateIconSeleccion(result: ResumenCuotas): void {
    /*
    if (this.seleccion === undefined) {
      this.selectedIcon = CheckboxIcon.INDETERMINATE;
    } else if (this.seleccion) {
      this.selectedIcon = CheckboxIcon.SELECTED;
    } else {
      this.selectedIcon = CheckboxIcon.UNSELECTED;
    }*/
  }

  private openDialogResumen() {
    const pDialog = this.dialogService.showCustomDialog({
      component: ResumenComponent,
      clickOutsideToClose: true,
      isModal: true
    });
  }
}
