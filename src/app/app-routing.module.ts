import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {SeleccionCuotasComponent} from './components/main/contribuciones/seleccion-cuotas/seleccion-cuotas.component';
import {AgregarNuevaComponent} from './components/main/contribuciones/agregar/nueva/agregar-nueva.component';
import {SugeridasComponent} from './components/main/contribuciones/agregar/sugeridas/sugeridas.component';
import {CertificadosComponent} from './components/certificados/certificados/certificados.component';
import {AgregarComponent} from './components/main/contribuciones/agregar/agregar.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/contribuciones/seleccionar-cuotas',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'logout',
    redirectTo: '/main/contribuciones/seleccionar-cuotas',
    pathMatch: 'full'
  }, {
    path: 'main/contribuciones',
    component: MainComponent,
    children: [
      {
        path: 'seleccionar-cuotas',
        data: {index: 0},
        component: SeleccionCuotasComponent
      }, {
        path: 'agregar',
        data: {index: 0},
        component: AgregarComponent,
        children: [
          {
            path: 'sugeridas',
            component: SugeridasComponent
          }, {
            path: 'nueva',
            component: AgregarNuevaComponent
          },
        ]
      }, {
        path: 'certificados',
        data: {index: 1},
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
