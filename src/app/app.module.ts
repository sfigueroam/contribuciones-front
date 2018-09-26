import {BrowserModule} from '@angular/platform-browser';
import { LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContribucionesPaso1Component} from './contribuciones-paso1/contribuciones-paso1.component';
import {AppRoutingModule} from './app-routing.module';
import {CertificadosComponent} from './certificados/certificados.component';
import { HeaderComponent } from './header/header.component';
import localeEs from '@angular/common/locales/es-CL';
import {registerLocaleData} from '@angular/common';


registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    ContribucionesPaso1Component,
    CertificadosComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
