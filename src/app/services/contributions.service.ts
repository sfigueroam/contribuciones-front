import {Injectable} from '@angular/core';
import {Contribution, Expiration, Property, Quote} from '../modulos/modelo';
import {Dammy} from '../modulos/Dammy';

@Injectable({
  providedIn: 'root'
})
export class ContributionsService {

  constructor(private dammy: Dammy) {
  }

  getContributions(): Property [] {

    let properties = [
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
                  amount: 15000100
                }),
                new Quote({
                  number: 2,
                  expiration: new Expiration({
                    day: 20,
                    month: 11
                  }),
                  amount: 15000200
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
    return properties;

  }

  getBienesRaices(): any{
    console.log(this.dammy.getBienRaiz());
    return "";
  }
}
