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
import * as firebase from "firebase";
import { environment } from "../environments/environment";
import { HomeComponent } from './home/home.component';
import { GuardService } from './services/guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanningComponent } from './planning/planning.component';
import { PriseServiceComponent } from './prise-service/prise-service.component';
import { HttpClientModule } from '@angular/common/http';
import { NewAgentComponent } from './planning/new-agent/new-agent.component';
import { AgentServices } from './services/agent.service';
import { AgentDetailsComponent } from './planning/agent-details/agent-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewSiteComponent } from './planning/new-site/new-site.component';
import { SiteListComponent } from './planning/site-list/site-list.component';
import { AgentListComponent } from './planning/agent-list/agent-list.component';
import { NewClientComponent } from './planning/new-client/new-client.component';
import { CalendarComponent } from './planning/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { EventServices } from './services/event.services';
import { PlanningHomeComponent } from './planning/planning-home/planning-home.component';

@NgModule({
  declarations: [
    AppComponent,
    InterventionsComponent,
    DevisComponent,
    FacturationComponent,
    AgencesComponent,
    AuthComponent,
    NewCompteComponent,
    HomeComponent,
    PlanningComponent,
    PriseServiceComponent,
    NewAgentComponent,
    AgentDetailsComponent,
    NewSiteComponent,
    SiteListComponent,
    AgentListComponent,
    NewClientComponent,
    CalendarComponent,
    PlanningHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule
  ],
  providers: [
    AuthService,
    GuardService,
    AgentServices,
    EventServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
  }
 }
