import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListadoComponent} from './components/contribuciones/listado/listado.component';
import {CertificadosComponent} from './components/certificados/certificados/certificados.component';
import {LandingComponent} from './components/landing/landing.component';
import {MenuComponent} from './components/menu/menu.component';
import {PagarComponent} from './components/contribuciones/pagar/pagar.component';
import {PropiedadesComponent} from './components/contribuciones/propiedades/propiedades/propiedades.component';
import {AgregarNuevaComponent} from './components/contribuciones/propiedades/agregar-nueva/agregar-nueva.component';
import {SugeridasComponent} from './components/contribuciones/propiedades/sugeridas/sugeridas.component';
import {ConfirmacionComponent} from './components/certificados/confirmacion/confirmacion.component';
import {OopsComponent} from './components/oops/oops.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent,

  },
  {
    path: 'oops',
    component: OopsComponent,

  },
  {
    path: 'main',
    component: MenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'contribuciones',
        pathMatch: 'full'
      },
      {
        path: 'contribuciones',
        component: ListadoComponent,
      },
      {
        path: 'contribuciones/pagar',
        component: PagarComponent
      },
      {
        path: 'contribuciones/propiedades',
        component: PropiedadesComponent,
        children: [
          {
            path: 'agregar',
            component: AgregarNuevaComponent
          },
          {
            path: 'sugeridas',
            component: SugeridasComponent
          }
        ]
      },
      {
        path: 'certificados',
        component: CertificadosComponent
      },
      {
        path: 'certificados/confirmacion',
        component: ConfirmacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
