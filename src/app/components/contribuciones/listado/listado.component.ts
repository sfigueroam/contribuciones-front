import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Contribution, Property, Quote} from '../../../modulos/modelo';
import {ContributionsService} from '../../../services/contributions.service';
import {DetallePagoComponent} from '../../modal/detalle-pago/detalle-pago.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado-desarrollo.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, AfterViewInit {

  properties: Property[];
  showAll: boolean;


  @ViewChild('tapTarget')
  propertyAdd: ElementRef;

  @ViewChildren('tabs')
  tabList: QueryList<ElementRef>;


  @ViewChild('detallePago')
  detallePago: DetallePagoComponent;

  constructor(private propertiesService: ContributionsService) {
    this.showAll = true;
    this.properties = this.propertiesService.getContributions();
    console.log(propertiesService.getBienesRaices());
  }

  changeQuotes(all: boolean) {
    this.showAll = all;
    for (const p of this.properties) {
      if (this.showAll) {
        p.showAll();
      } else {
        p.hideExpired();
      }
    }
  }

  total(): number {
    let _total = 0;
    for (const p of this.properties) {
      _total += p.selectedTotal();
    }
    return _total;
  }

  quoteIcon(q: Quote): string {
    return q.selected ? 'check_box' : 'check_box_outline_blank';
  }

  selectQuote(q: Quote): void {
    q.selected = !q.selected;
  }

  ngAfterViewInit() {
    // M.AutoInit();
    /*const instance = M.TapTarget.init(this.propertyAdd.nativeElement);
    // instance.open();
    for (const e of this.tabList.toArray()) {
      M.Tabs.init(e.nativeElement);
    }*/
  }

  ngOnInit() {

  }

  getYears(c: Contribution) {
    return Array.from(c.quotes.keys());
  }

  openDialog(){
    this.detallePago.showDialog();
  }

}
