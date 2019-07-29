import localeEs from '@angular/common/locales/es-CL';


import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DISABLE_NATIVE_VALIDITY_CHECKING, MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlSelectModule } from '@angular-mdl/select';
import { OrderModule } from 'ngx-order-pipe';
import { TooltipModule } from 'ng2-tooltip-directive';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LightboxModule } from 'ngx-lightbox';


// Servicios
import { CookieService } from 'ngx-cookie-service';
import { UserDataService } from './user-data.service';
import { DeudaFiscalService } from './services/deuda-fiscal.service';


// Pipes
import { LeadingZeroPipe } from './pipes/leading-zero.pipe';
import { MatchSorterPipe } from './pipes/match-sorter.pipe';


// Componentes
import { AppComponent } from './components/app.component';
import { PropiedadComponent } from './components/main/shared/propiedad/propiedad.component';
import { PropiedadRolComponent } from './components/main/shared/propiedad-rol/propiedad-rol.component';
import { SugeridasComponent } from './components/main/contribuciones/agregar/sugeridas/sugeridas.component';
import { CertificadosComponent } from './components/main/certificados/certificados.component';
import { registerLocaleData } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { SeleccionCuotasComponent } from './components/main/contribuciones/seleccion-cuotas/seleccion-cuotas.component';
import { DireccionCuotasComponent } from './components/main/contribuciones/seleccion-cuotas/direccion-cuotas/direccion-cuotas.component';
import { RolCuotasComponent } from './components/main/contribuciones/seleccion-cuotas/rol-cuotas/rol-cuotas.component';
import { LoginComponent } from './components/login/login.component';
import { AgregarNuevaComponent } from './components/main/contribuciones/agregar/nueva/agregar-nueva.component';
import { AgregarComponent } from './components/main/contribuciones/agregar/agregar.component';
import { ObtenerComponent } from './components/main/certificados/obtener/obtener.component';
import { CertificadoDeudaComponent } from './components/main/certificados/obtener/certificado-deuda/certificado-deuda.component';
import { HistorialPagoComponent } from './components/main/certificados/obtener/historial-pago/historial-pago.component';
import { AsociarCorreoComponent } from './components/dialogs/asociar-correo/asociar-correo.component';
import { LineaTiempoComponent } from './components/main/contribuciones/linea-tiempo/linea-tiempo.component';
import { DialogAgregarPropiedadComponent } from './components/main/contribuciones/agregar/nueva/modal/dialog-agregar-propiedad/dialog-agregar-propiedad.component';
import { AyudaDireccionComponent } from './components/main/contribuciones/agregar/nueva/modal/ayuda-direccion/ayuda-direccion.component';
import { AyudaRolComponent } from './components/main/contribuciones/agregar/nueva/modal/ayuda-rol/ayuda-rol.component';
import { AyudaCondonacionComponent } from './components/main/contribuciones/seleccion-cuotas/modal/ayuda-condonacion/ayuda-condonacion.component';
import { ResumenComponent } from './components/main/contribuciones/seleccion-cuotas/modal/resumen/resumen.component';
import { BotonPagarComponent } from './components/main/contribuciones/seleccion-cuotas/modal/boton-pagar/boton-pagar.component';
import { RecordarComponent } from './components/main/contribuciones/agregar/nueva/modal/recordar/recordar.component';
import { DeudaFiscalComponent } from './components/main/deuda-fiscal/deuda-fiscal.component';
import { DeudaFiscalServicioComponent } from './components/main/deuda-fiscal-servicio/deuda-fiscal-servicio.component';
import { DeudaFiscalFormularioComponent } from './components/main/deuda-fiscal-formulario/deuda-fiscal-formulario.component';
import { CentroPagoComponent } from './components/centro-pago/centro-pago.component';


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
    DialogAgregarPropiedadComponent,
    AyudaDireccionComponent,
    AyudaRolComponent,
    AyudaCondonacionComponent,
    ResumenComponent,
    BotonPagarComponent,
    RecordarComponent,
    DeudaFiscalComponent,
    DeudaFiscalServicioComponent,
    DeudaFiscalFormularioComponent,
    CentroPagoComponent,
    
    

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
    LightboxModule,
    OrderModule,
    TooltipModule,
  ],
  providers: [
    [UserDataService],
    {provide: 'windowObject', useValue: window},
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    },
    {
      provide: DISABLE_NATIVE_VALIDITY_CHECKING,
      useValue: true
    },
    CookieService,
    DeudaFiscalService
  ],
  entryComponents: [
    AsociarCorreoComponent,
    DialogAgregarPropiedadComponent,
    AyudaRolComponent,
    AyudaDireccionComponent,
    AyudaCondonacionComponent,
    ResumenComponent,
    RecordarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
