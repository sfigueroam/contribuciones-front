import {Component, OnInit} from '@angular/core';
import {CertificadosService} from '../../../../services/certificados.service';
import {HistorialPago} from '../../../../domain/HistorialPago';
import {MdlSnackbarService} from '@angular-mdl/core';
import {CertificadoDeuda} from '../../../../domain/CertificadoDeuda';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

declare let ga: Function;

@Component({
  selector: 'app-obtener',
  templateUrl: './obtener.component.html',
  styleUrls: ['./bootstrap-3-grid.css', './certificados.scss', './obtener.component.scss']
})
export class ObtenerComponent implements OnInit {

  rolesId: number[];
  ano: number;

  certificadoDeuda = false;
  historialPago = false;

  certificados: { deuda?: CertificadoDeuda, pago?: HistorialPago[] }[];

  cargaFinalizada = false;

  constructor(private service: CertificadosService,
              private mdlSnackbarService: MdlSnackbarService,
              private router: Router) {
  }

  print() {
    window.print();
  }

  ngOnInit() {
    this.rolesId = this.service.roles;
    this.ano = this.service.ano;

    this.certificadoDeuda = this.service.certificadoDeuda;
    this.historialPago = this.service.historialPago;

    if (this.rolesId == null || this.rolesId.length === 0) {
       this.router.navigate(['/centropago/contribuciones/certificados']);
    }

    const promises = [];
    this.certificados = [];
    for (const rolId of this.rolesId) {
      const certificado: { deuda?: CertificadoDeuda, pago ?: HistorialPago[] } = {};
      this.certificados.push(certificado);
      if (this.certificadoDeuda) {
        promises.push(
          this.service.getCertificadoDeuda(rolId).then(
            certificadoDeuda => certificado.deuda = certificadoDeuda,
            err => {
              console.error(err);
              this.mdlSnackbarService.showToast('Ocurrió un error al obtener el certificado de deuda', environment.snackbarTime);
              //inclusión de google analytics en manejo de errores
              /*
              ga('send', 'exception', {
              'exDescription': err.message,
              'exFatal': false
            });*/
  
            }
          )
        );
      }
      if (this.historialPago) {
        promises.push(
    //      try {
            this.service.getHistorialPago(rolId, this.ano).then(
              historialPago => certificado.pago = historialPago,
              err => {
                console.error(err);
                this.mdlSnackbarService.showToast('Ocurrió un error al obtener el historial de pago', environment.snackbarTime);
              }
          )
        );
      }
    }

    Promise.all(promises).then(
      () => this.cargaFinalizada = true,
      err => {
        console.error(err);
        this.cargaFinalizada = true;
      }
    );
  }
  volver(): void{
    this.router.navigate(['/centropago/contribuciones/certificados']);
  }
}
