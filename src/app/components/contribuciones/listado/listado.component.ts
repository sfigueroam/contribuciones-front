import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Contribution, Property, Quote} from '../../../modulos/modelo';
import {ContributionsService} from '../../../services/contributions.service';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';
import {Propiedades} from '../../../domain/Propiedades';
import {NodeDef} from '@angular/core/src/view';

@Component({
  selector: 'app-listado',
  templateUrl: './listado-desarrollo.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  properties: Propiedades[] = [];
  showAll: boolean;


  @ViewChild('tapTarget')
  propertyAdd: ElementRef;

  @ViewChildren('tabs')
  tabList: QueryList<ElementRef>;


  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;

  constructor(private propertiesService: ContributionsService, private elem: ElementRef) {
    this.showAll = true;
    this.properties = this.propertiesService.getBienesRaices();
    console.log(propertiesService.getBienesRaices());
  }

  ngOnInit() {

  }
  ngAfterViewInit(){
    // you'll get your through 'elements' below code
    /*let elements = this.elem.nativeElement.querySelectorAll('.mdl-checkbox');

    console.log(elements);

    for(let i = 0; i < elements.length; i++ ){
      node: NodeDef = elements[i];
      node.nativeElement.elements.off('click');
    }
*/
  }

  openDialog(){
    this.detallePago.showDialog();
  }

}
