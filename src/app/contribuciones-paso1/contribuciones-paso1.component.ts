import {AfterViewInit, Component, OnInit} from '@angular/core';
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
