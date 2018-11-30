import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {AppRoutingModule} from './app-routing.module';
import {CertificadosComponent} from './components/certificados/certificados/certificados.component';
import localeEs from '@angular/common/locales/es-CL';
import {registerLocaleData} from '@angular/common';
import {ContributionsService} from './services/contributions.service';
import {PagarComponent} from './components/contribuciones/pagar/pagar.component';
import {RespuestaComponent} from './components/contribuciones/respuesta/respuesta.component';
import {MenuComponent} from './components/menu/menu.component';
import {DetallePagoComponent} from './components/modal/detalle-pago/detalle-pago.component';
import {SugeridasComponent} from './components/main/contribuciones/agregar/sugeridas/sugeridas.component';
import {ConfirmacionComponent} from './components/certificados/confirmacion/confirmacion.component';
import {LeadingZeroPipe} from './pipes/leading-zero.pipe';
import {HttpClientModule} from '@angular/common/http';
import {DISABLE_NATIVE_VALIDITY_CHECKING, MdlModule} from '@angular-mdl/core';
import {PropiedadComponent} from './components/main/contribuciones/agregar/shared/propiedad/propiedad.component';
import {PropiedadRolComponent} from './components/main/contribuciones/agregar/shared/propiedad-rol/propiedad-rol.component';
import {OopsComponent} from './components/oops/oops.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdlSelectModule} from '@angular-mdl/select';
import {MatchSorterPipe} from './pipes/match-sorter.pipe';
import {MainComponent} from './components/main/main.component';
import {SeleccionCuotasComponent} from './components/main/contribuciones/seleccion-cuotas/seleccion-cuotas.component';
import {DireccionCuotasComponent} from './components/main/contribuciones/seleccion-cuotas/direccion-cuotas/direccion-cuotas.component';
import {RolCuotasComponent} from './components/main/contribuciones/seleccion-cuotas/rol-cuotas/rol-cuotas.component';
import {LoginComponent} from './components/login/login.component';
import {AgregarNuevaComponent} from './components/main/contribuciones/agregar/nueva/agregar-nueva.component';
import {AgregarComponent} from './components/main/contribuciones/agregar/agregar.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CertificadosComponent,
    PagarComponent,
    RespuestaComponent,
    MenuComponent,
    DetallePagoComponent,
    SugeridasComponent,
    AgregarNuevaComponent,
    AgregarComponent,
    ConfirmacionComponent,
    LeadingZeroPipe,
    PropiedadComponent,
    PropiedadRolComponent,
    OopsComponent,
    MatchSorterPipe,
    MainComponent,
    SeleccionCuotasComponent,
    DireccionCuotasComponent,
    RolCuotasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdlModule,
    MdlSelectModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    },
    {
      provide: DISABLE_NATIVE_VALIDITY_CHECKING,
      useValue: true
    },
    ContributionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
