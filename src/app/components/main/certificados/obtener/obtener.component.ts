import {Component, OnInit} from '@angular/core';
import {CertificadosService} from '../../../../services/certificados.service';

@Component({
  selector: 'app-obtener',
  templateUrl: './obtener.component.html',
  styleUrls: ['./obtener.component.scss']
})
export class ObtenerComponent implements OnInit {

  rolesId: number[];

  constructor(private certificados: CertificadosService) {
  }

  ngOnInit() {
    this.rolesId = this.certificados.roles;
  }
}
