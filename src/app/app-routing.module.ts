import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListadoComponent} from './components/contribuciones/listado/listado.component';
import {CertificadosComponent} from './components/certificados/certificados.component';
import {LandingComponent} from './components/landing/landing.component';
import {MenuComponent} from './components/menu/menu.component';

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
        component: ListadoComponent
      },
      {
        path: 'certificados',
        component: CertificadosComponent
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
