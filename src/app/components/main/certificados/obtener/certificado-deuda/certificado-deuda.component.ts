import {Component, Input, OnInit} from '@angular/core';
import {CertificadoDeuda} from '../../../../../domain/CertificadoDeuda';

@Component({
  selector: 'app-certificado-deuda',
  templateUrl: './certificado-deuda.component.html',
  styleUrls: ['./certificado-deuda.component.scss']
})
export class CertificadoDeudaComponent implements OnInit {

  @Input()
  info: CertificadoDeuda;

  constructor() {
  }

  ngOnInit() {
  }

}
