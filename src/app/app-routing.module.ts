import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {SeleccionCuotasComponent} from './components/main/contribuciones/seleccion-cuotas/seleccion-cuotas.component';
import {AgregarNuevaComponent} from './components/main/contribuciones/agregar/nueva/agregar-nueva.component';
import {SugeridasComponent} from './components/main/contribuciones/agregar/sugeridas/sugeridas.component';
import {CertificadosComponent} from './components/certificados/certificados/certificados.component';
import {AgregarComponent} from './components/main/contribuciones/agregar/agregar.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/main/contribuciones/seleccionar-cuotas',
  pathMatch: 'full'
}, {
  path: 'main',
  component: MainComponent,
  children: [
    {
      path: 'contribuciones',
      data: {index: 0},
      children: [
        {
          path: 'seleccionar-cuotas',
          component: SeleccionCuotasComponent
        }, {
          path: 'certificados',
          component: CertificadosComponent
        }, {
          path: 'agregar',
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
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
