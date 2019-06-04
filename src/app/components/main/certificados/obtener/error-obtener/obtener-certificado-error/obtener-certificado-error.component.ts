import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import {MdlSnackbarService} from '@angular-mdl/core';

@Component({
  selector: 'app-obtener-certificado-error',
  templateUrl: './obtener-certificado-error.component.html',
  styleUrls: ['./obtener-certificado-error.component.css']
})
export class ObtenerCertificadoErrorComponent implements OnInit {
    mdlSnackbarService: any;

  constructor(private router: Router) { }

  ngOnInit() {
    //this.mdlSnackbarService.showToast('Ocurrió un error al obtener el certificado de deuda', environment.snackbarTime);
    this.router.navigate(['/main/contribuciones/certificados/']);
  }
}
