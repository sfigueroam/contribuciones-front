import {Component, Input, OnInit} from '@angular/core';
import {CertificadoDeuda} from '../../../../../domain/CertificadoDeuda';
import {PitUtils} from '../../../../../pit-utils';

@Component({
  selector: 'app-certificado-deuda',
  templateUrl: './certificado-deuda.component.html',
  styleUrls: ['./certificado-deuda.component.scss']
})
export class CertificadoDeudaComponent implements OnInit {

  @Input()
  info: CertificadoDeuda;
  rol: { comuna: string, rol: string, subrol: string };

  constructor() {
  }

  ngOnInit() {
    this.rol = PitUtils.separaRol(+this.info.rutRol);
  }

}
