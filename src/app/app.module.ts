import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import {MzButtonModule, MzInputModule, MzNavbarModule} from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    MzNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
