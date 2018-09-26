import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Contribution, Expiration, Property, Quote} from '../modelo';
import * as M from 'materialize-css';

@Component({
  selector: 'app-contribuciones-paso1',
  templateUrl: './contribuciones-paso1.component.html',
  styleUrls: ['./contribuciones-paso1.component.scss']
})
export class ContribucionesPaso1Component implements OnInit, AfterViewInit {

  properties: Property[];
  showAll: boolean;
  instance: M;

  @ViewChildren('tabs') viewChildren: QueryList<ElementRef>;

  constructor() {
    this.showAll = true;
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

    //console.log(this.viewChildren);
/*
    var tabs: any = this.viewChildren.toArray();
    for (const p of tabs) {
      for (const c of p.nativeElement.children) {
        let dd = c.classList;
        console.log(dd.length);
        for (const clazz of dd) {
          console.log(clazz);
        }

        if(c.hasChildNodes()){
          console.log(c.children);
        }
      }

      console.log("cambio");
    }
*/

  /*  setTimeout( () => {
      var tabs: any = this.viewChildren.toArray();
      for (const p of tabs) {
        let instance = M.Tabs.getInstance(p.nativeElement);
        instance.destroy();
        console.log(instance);
      }

      M.AutoInit();
    }, 100 );
 */ }

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
    /*var tabs: any = this.viewChildren.toArray();
    var tabsList: any[] = [];
    for (const p of tabs) {
      tabsList.push(p.nativeElement);
      console.log(p.nativeElement);
    }
    this.instance = M.AutoInit();
    //this.instance = M.Tabs.init(tabsList, {});

    console.log(this.instance);*/
    M.AutoInit();
  }

  ngOnInit() {
    this.properties = [
      new Property({
        address: 'Avenida Presidente José Batlle y Ordoñez 3786',
        location: 'Macul',
        contributions: [
          new Contribution({
            icon: 'business',
            name: 'Departamento 74',
            identification: '00395-612',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 15000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 15000
                })
              ])
              .set(2017, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 15000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 15000
                })
              ])
          }),
          new Contribution({
            icon: 'directions_car',
            name: 'Estacionamiento 12',
            identification: '00395-312',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4,
                  }),
                  amount: 5000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11,
                  }),
                  amount: 5000
                })
              ])
          }),
          new Contribution({
            icon: 'layers',
            name: 'Bodega 25',
            identification: '00395-711',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 6000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 6000
                })
              ])
              .set(2017, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 6000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 6000
                })
              ])
          }),
          new Contribution({
            icon: 'business',
            name: 'Departamento 74',
            identification: '00395-624',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 15000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 15000
                })
              ])
          }),
          new Contribution({
            icon: 'directions_car',
            name: 'Estacionamiento 12',
            identification: '00395-312',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 5000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 5000
                })
              ])
          })
        ]
      }),
      new Property({
        address: 'Avenida Presidente José Batlle y Ordoñez 3786',
        location: 'Macul',
        contributions: [
          new Contribution({
            icon: 'business',
            name: 'Departamento 74',
            identification: '00395-684',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 15000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 15000
                })
              ])
              .set(2017, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 15000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 15000
                })
              ])
          }),
          new Contribution({
            icon: 'directions_car',
            name: 'Estacionamiento 12',
            identification: '00395-312',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4,
                  }),
                  amount: 5000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11,
                  }),
                  amount: 5000
                })
              ])
          }),
          new Contribution({
            icon: 'layers',
            name: 'Bodega 25',
            identification: '00395-701',
            quotes: new Map<number, Quote[]>()
              .set(2018, [
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 6000
                })
              ])
              .set(2017, [
                new Quote({
                  number: 1,
                  expiration: new Expiration({
                    day: 20,
                    month: 4
                  }),
                  amount: 6000
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 6000
                })
              ])
          })
        ]
      })
    ];
  }

  getYears(c: Contribution) {
    return Array.from(c.quotes.keys());
  }

}
