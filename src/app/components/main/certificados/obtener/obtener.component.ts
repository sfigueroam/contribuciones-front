import {Component, OnInit} from '@angular/core';
import {CertificadosService} from '../../../../services/certificados.service';
import {HistorialPago} from '../../../../domain/HistorialPago';
import {MdlSnackbarService} from '@angular-mdl/core';
import {CertificadoDeuda} from '../../../../domain/CertificadoDeuda';
import {Router} from '@angular/router';

@Component({
  selector: 'app-obtener',
  templateUrl: './obtener.component.html',
  styleUrls: ['./obtener.component.scss']
})
export class ObtenerComponent implements OnInit {

  rolesId: number[];
  ano: number;

  certificadoDeuda = false;
  historialPago = false;

  certificados: { deuda?: CertificadoDeuda, pago?: HistorialPago }[];

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
      // TODO JOSHE HAY QUE DESCOMENTAR ESTO Y BORRAR LAS OTRAS LINEAS DEL IF
      // this.router.navigate(['/main/contribuciones/certificados']);
      this.rolesId = [3700074115];
      this.ano = 2011;
      this.historialPago = true;
    }

    const promises = [];
    this.certificados = [];
    for (const rolId of this.rolesId) {
      const certificado: { deuda?: CertificadoDeuda, pago?: HistorialPago } = {};
      this.certificados.push(certificado);
      if (this.certificadoDeuda) {
        promises.push(
          this.service.getCertificadoDeuda(rolId).then(
            certificadoDeuda => certificado.deuda = certificadoDeuda,
            err => {
              console.log(err);
              this.mdlSnackbarService.showToast('Ocurrió un error al obtener el certificado de deuda');
            }
          )
        );
      }
      if (this.historialPago) {
        promises.push(
          this.service.getHistorialPago(rolId, this.ano).then(
            historialPago => certificado.pago = historialPago,
            err => {
              console.log(err);
              this.mdlSnackbarService.showToast('Ocurrió un error al obtener el historial de pago');
            }
          )
        );
      }
    }

    Promise.all(promises).then(
      () => this.cargaFinalizada = true,
      err => {
        console.log(err);
        this.cargaFinalizada = true;
      }
    );
  }
}
