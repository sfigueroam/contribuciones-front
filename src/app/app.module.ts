import {BrowserModule} from '@angular/platform-browser';
import { LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {ListadoComponent} from './components/contribuciones/listado/listado.component';
import {AppRoutingModule} from './app-routing.module';
import {CertificadosComponent} from './components/certificados/certificados.component';
import { HeaderComponent } from './components/header/header.component';
import localeEs from '@angular/common/locales/es-CL';
import {registerLocaleData} from '@angular/common';
import {ContributionsService} from './services/contributions.service';
import { PagarComponent } from './components/contribuciones/pagar/pagar.component';
import { RespuestaComponent } from './components/contribuciones/respuesta/respuesta.component';
import { MenuComponent } from './components/menu/menu.component';



registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    CertificadosComponent,
    HeaderComponent,
    ListadoComponent,
    PagarComponent,
    RespuestaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    },
    ContributionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
