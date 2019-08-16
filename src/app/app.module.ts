import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { DevisComponent } from './devis/devis.component';
import { FacturationComponent } from './facturation/facturation.component';
import { AgencesComponent } from './agences/agences.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { NewCompteComponent } from './new-compte/new-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    InterventionsComponent,
    DevisComponent,
    FacturationComponent,
    AgencesComponent,
    AuthComponent,
    NewCompteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
