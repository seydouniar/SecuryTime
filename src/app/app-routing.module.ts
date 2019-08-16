import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevisComponent } from './devis/devis.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { FacturationComponent } from './facturation/facturation.component';
import { AgencesComponent } from './agences/agences.component';
import { AuthComponent } from './auth/auth.component';
import { NewCompteComponent } from './new-compte/new-compte.component';

const routes: Routes = [
  {path: 'devis', component: DevisComponent},
  {path: 'intervention', component: InterventionsComponent},
  {path: 'facturation', component: FacturationComponent},
  {path: 'agences', component: AgencesComponent},
  { path: 'connexion', component: AuthComponent},
  {path: 'inscription', component: NewCompteComponent},
  {path: '', component: InterventionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
