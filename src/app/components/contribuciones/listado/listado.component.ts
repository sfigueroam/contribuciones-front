import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ContributionsService} from '../../../services/contributions.service';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {Propiedad} from '../../../domain/Propiedad';
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-listado',
  templateUrl: './listado-desarrollo.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, AfterViewInit{

  properties: Propiedad[] = [];
  showAll: boolean;


  masonryOptions: NgxMasonryOptions = {};

  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;

  constructor(private propertiesService: ContributionsService) {
    console.log("constructor");
    this.showAll = true;

    this.masonryOptions  = {
      transitionDuration: '0.8s',
      gutter: 20,
      resize: true,
      initLayout: true,
      fitWidth: true,
      containerStyle: null,
      percentPosition: true,
    };
  }

  ngOnInit() {
    console.log('ngOnIni');
    this.properties = this.propertiesService.getBienesRaices();
  }

  ngAfterViewInit() {

  }

  openDialog() {
    this.detallePago.showDialog();
  }
}
