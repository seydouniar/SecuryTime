import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevisComponent } from './devis/devis.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { FacturationComponent } from './facturation/facturation.component';
import { AgencesComponent } from './agences/agences.component';
import { AuthComponent } from './auth/auth.component';
import { NewCompteComponent } from './new-compte/new-compte.component';
import { GuardService } from './services/guard.service';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './planning/planning.component';
import { NewAgentComponent } from './new-agent/new-agent.component';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { NewSiteComponent } from './new-site/new-site.component';
import { SiteListComponent } from './site-list/site-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { CalendarComponent } from './planning/calendar/calendar.component';
import { PlanningHomeComponent } from './planning/planning-home/planning-home.component';
import { AgentPlanningComponent } from './planning/agent-planning/agent-planning.component';
import { SitePlanningComponent } from './planning/site-planning/site-planning.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'devis', canActivate:[GuardService],component: DevisComponent},
  { path: 'intervention', canActivate: [GuardService],component: InterventionsComponent},
  { path: 'facturation', canActivate: [GuardService],component: FacturationComponent},
  { path: 'agences', canActivate: [GuardService],component: AgencesComponent},
  { path: 'connexion', component: AuthComponent},
  { path: 'planning', component: PlanningComponent,children:[
    
    { path: 'acceuil',component:PlanningHomeComponent},
    { path: 'agents-planning', component: AgentPlanningComponent},
    { path: 'sites-planning', component:SitePlanningComponent},
    { path: '',redirectTo:'acceuil',pathMatch:'full'},
    { path: '**',redirectTo:'acceuil'},

  ]},
  { path: 'les-sites', component: SiteListComponent},
  { path: 'les-agent', component: AgentListComponent},
  { path: 'agent-details/:id', component:AgentDetailsComponent},
  { path: 'inscription', component: NewCompteComponent},
  { path: 'newagent', component: NewAgentComponent},
  { path: 'newsite', component: NewSiteComponent},
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
