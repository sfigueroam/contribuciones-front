import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {Propiedad} from '../../../domain/Propiedad';
import {ContributionsService} from '../../../services/contributions.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, AfterViewInit {

  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;

  propiedades: Propiedad[] = [];

  private masonryOptions: any;
  private scrollAnimationOptions: any;

  constructor(private contributionsService: ContributionsService) {
    this.masonryOptions = {
      // ['append', 'prepend', 'add']
      addStatus: 'append',
      transitionDuration: '0.4s'
    };

    this.scrollAnimationOptions = {
      // ["effect-1","effect-2","effect-3","effect-4","effect-5","effect-6","effect-7","effect-8"]
      animationEffect: 'effect-1', // String: (default: 'effect-1')
      // Integer: Minimum and a maximum duration of the animation
      minDuration: 0,
      maxDuration: 0,
      // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
      // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport.
      // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
      viewportFactor: 0
    };
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.propiedades = this.contributionsService.getBienesRaices();
  }

  openDialog() {
    this.detallePago.showDialog();
  }
}
