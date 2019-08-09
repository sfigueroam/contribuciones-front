import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { SeleccionCuotasComponent } from './components/main/contribuciones/seleccion-cuotas/seleccion-cuotas.component';
import { AgregarNuevaComponent } from './components/main/contribuciones/agregar/nueva/agregar-nueva.component';
import { SugeridasComponent } from './components/main/contribuciones/agregar/sugeridas/sugeridas.component';
import { CertificadosComponent } from './components/main/certificados/certificados.component';
import { AgregarComponent } from './components/main/contribuciones/agregar/agregar.component';
import { LoginComponent } from './components/login/login.component';
import { ObtenerComponent } from './components/main/certificados/obtener/obtener.component';
import { DeudaFiscalListadoComponent } from './components/main/deuda-fiscal/deuda-fiscal-listado/deuda-fiscal-listado.component';
import { FormContactoComponent } from './components/form-contacto/form-contacto.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/centropago/contribuciones/agregar/nueva',
    pathMatch: 'full'
  }, 
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'logout',
    redirectTo: '/centropago/contribuciones/seleccionar-cuotas',
    pathMatch: 'full'
  }, 
  {
    path: 'centropago/contribuciones',
    component: MainComponent,
    children: [
      {
        path: 'seleccionar-cuotas',
        data: { index: 0 },
        component: SeleccionCuotasComponent
      }, {
        path: 'agregar',
        data: { index: 0 },
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
        data: { index: 1 },
        component: CertificadosComponent
      }
    ]
  }, {
    path: 'centropago/contribuciones/certificados/obtener',
    component: ObtenerComponent
  },
  {
    path: 'centropago/deuda-fiscal',
    component: MainComponent,
    children: [
      {
        path: 'listado',
        component: DeudaFiscalListadoComponent
      }
    ]
  }, 
  {
    path: 'contacto',
    component: FormContactoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
