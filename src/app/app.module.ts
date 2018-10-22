import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {ListadoComponent} from './components/contribuciones/listado/listado.component';
import {AppRoutingModule} from './app-routing.module';
import {CertificadosComponent} from './components/certificados/certificados/certificados.component';
import localeEs from '@angular/common/locales/es-CL';
import {registerLocaleData} from '@angular/common';
import {ContributionsService} from './services/contributions.service';
import {PagarComponent} from './components/contribuciones/pagar/pagar.component';
import {RespuestaComponent} from './components/contribuciones/respuesta/respuesta.component';
import {MenuComponent} from './components/menu/menu.component';
import {LandingComponent} from './components/landing/landing.component';
import {DetallePagoComponent} from './components/modal/detalle-pago/detalle-pago.component';
import {AgregarNuevaComponent} from './components/contribuciones/propiedades/agregar-nueva/agregar-nueva.component';
import {SugeridasComponent} from './components/contribuciones/propiedades/sugeridas/sugeridas.component';
import {PropiedadesComponent} from './components/contribuciones/propiedades/propiedades/propiedades.component';
import {ConfirmacionComponent} from './components/certificados/confirmacion/confirmacion.component';
import { ListadoPropiedadComponent } from './components/contribuciones/listado/listado-propiedad/listado-propiedad.component';
import { ListadoPropiedadRolComponent } from './components/contribuciones/listado/listado-propiedad-rol/listado-propiedad-rol.component';
import { LeadingZeroPipe } from './pipe/leading-zero.pipe';
import { MDLInitDirective } from './services/mdlinit.directive';



registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    CertificadosComponent,
    ListadoComponent,
    PagarComponent,
    RespuestaComponent,
    MenuComponent,
    LandingComponent,
    DetallePagoComponent,
    SugeridasComponent,
    AgregarNuevaComponent,
    PropiedadesComponent,
    ConfirmacionComponent,
    ListadoPropiedadComponent,
    ListadoPropiedadRolComponent,
    LeadingZeroPipe,
    MDLInitDirective
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
