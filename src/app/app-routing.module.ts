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
import { NewAgentComponent } from './planning/new-agent/new-agent.component';
import { AgentDetailsComponent } from './planning/agent-details/agent-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'devis', canActivate:[GuardService],component: DevisComponent},
  { path: 'intervention', canActivate: [GuardService],component: InterventionsComponent},
  { path: 'facturation', canActivate: [GuardService],component: FacturationComponent},
  { path: 'agences', canActivate: [GuardService],component: AgencesComponent},
  { path: 'connexion', component: AuthComponent},
  { path: 'planning', component: PlanningComponent},
  { path: 'inscription', component: NewCompteComponent},
  { path: 'newagent', component: NewAgentComponent},
  { path: 'agent-details/:id', component:AgentDetailsComponent},
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
