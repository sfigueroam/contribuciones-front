import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, AfterViewInit {

  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    gutter: 20,
    resize: true,
    initLayout: true,
    fitWidth: true,
    containerStyle: null,
    percentPosition: true,
  };

  constructor() {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  openDialog() {
    this.detallePago.showDialog();
  }
}
