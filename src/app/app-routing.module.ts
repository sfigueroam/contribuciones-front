import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContribucionesPaso1Component} from './contribuciones-paso1/contribuciones-paso1.component';
import {CertificadosComponent} from './certificados/certificados.component';

const routes: Routes = [
  {path: '', redirectTo: '/contribuciones', pathMatch: 'full'},
  {path: 'contribuciones', component: ContribucionesPaso1Component},
  {path: 'certificados', component: CertificadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
