import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MzButtonModule, MzInputModule, MzNavbarModule} from 'ngx-materialize';
import {MzCardModule} from 'ngx-materialize';
import {ContribucionesPaso1Component} from './contribuciones-paso1/contribuciones-paso1.component';
import {AppRoutingModule} from './/app-routing.module';
import {CertificadosComponent} from './certificados/certificados.component';

@NgModule({
  declarations: [
    AppComponent,
    ContribucionesPaso1Component,
    CertificadosComponent
  ],
  imports: [
    BrowserModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    MzNavbarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
