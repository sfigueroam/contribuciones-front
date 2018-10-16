import {Injectable} from '@angular/core';
import {Contribution, Expiration, Property, Quote} from '../modulos/modelo';
import {Dummy} from '../modulos/Dummy';
import {Rol} from '../domain/Rol';
import {Cuota} from '../domain/Cuota';
import {Propiedades} from '../domain/Propiedades';

@Injectable({
  providedIn: 'root'
})
export class ContributionsService {

  dummy: Dummy = new Dummy()

  propiedades: Propiedades[];
  constructor() {
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

  getBienesRaices(): Propiedades[] {

    this.propiedades = [];

    let bienesRaices =  this.getBienRaiz().curout;

    // Recorre los roles
    for (let i = 0; i < bienesRaices.length; i++) {
      let prop: Propiedades = new Propiedades();
      let rol: Rol = new Rol(bienesRaices[i]);
      let deudas = this.getDeudas(rol.rol).listaDeudaRol;
      let cuotasTmp: Cuota[] = [];
      let year: number = -1;

      // Recorre las Cuotas
      for (let j = 0; j < deudas.length; j ++){
        let cuota: Cuota = new Cuota(deudas[j]);
        if(year !== -1 && year !== cuota.fechaVencimiento.getFullYear()){
          rol.pushCuota(cuotasTmp, year);
          cuotasTmp = [];
        }
        cuotasTmp.push(cuota);
        year = cuota.fechaVencimiento.getFullYear();
        if(j+1 === deudas.length){
          rol.pushCuota(cuotasTmp, year);
        }
      }
      prop.addRol(rol);
      this.propiedades.push(prop);
    }

    return this.propiedades;
  }

  private getBienRaiz(): any {
    return this.dummy.getBienRaiz();
  }

  private getDeudas(rol: number): any {
    return this.dummy.getDeudas(rol);
  }

}


