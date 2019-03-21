import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {AppRoutingModule} from './app-routing.module';
import {CertificadosComponent} from './components/main/certificados/certificados.component';
import localeEs from '@angular/common/locales/es-CL';
import {registerLocaleData} from '@angular/common';
import {SugeridasComponent} from './components/main/contribuciones/agregar/sugeridas/sugeridas.component';
import {LeadingZeroPipe} from './pipes/leading-zero.pipe';
import {HttpClientModule} from '@angular/common/http';
import {DISABLE_NATIVE_VALIDITY_CHECKING, MdlModule} from '@angular-mdl/core';
import {PropiedadComponent} from './components/main/shared/propiedad/propiedad.component';
import {PropiedadRolComponent} from './components/main/shared/propiedad-rol/propiedad-rol.component';
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
import {CookieService} from 'ngx-cookie-service';
import {ObtenerComponent} from './components/main/certificados/obtener/obtener.component';
import {CertificadoDeudaComponent} from './components/main/certificados/obtener/certificado-deuda/certificado-deuda.component';
import {HistorialPagoComponent} from './components/main/certificados/obtener/historial-pago/historial-pago.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import {AsociarCorreoComponent} from './components/dialogs/asociar-correo/asociar-correo.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LineaTiempoComponent } from './components/main/contribuciones/linea-tiempo/linea-tiempo.component';
import { DeviceDetectorModule } from 'ngx-device-detector';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CertificadosComponent,
    SugeridasComponent,
    AgregarNuevaComponent,
    AgregarComponent,
    LeadingZeroPipe,
    PropiedadComponent,
    PropiedadRolComponent,
    MatchSorterPipe,
    MainComponent,
    SeleccionCuotasComponent,
    DireccionCuotasComponent,
    RolCuotasComponent,
    LoginComponent,
    ObtenerComponent,
    CertificadoDeudaComponent,
    HistorialPagoComponent,
    AsociarCorreoComponent,
    LineaTiempoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdlModule,
    MdlSelectModule,
    NgxBarcodeModule,
    NgxCaptchaModule,
    DeviceDetectorModule.forRoot(),

  ],
  providers: [
    { provide: 'windowObject', useValue: window},
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    },
    {
      provide: DISABLE_NATIVE_VALIDITY_CHECKING,
      useValue: true
    },
    CookieService
  ],
  entryComponents: [AsociarCorreoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
