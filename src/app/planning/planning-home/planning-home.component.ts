import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/modeles/agent';
import { Subscription } from 'rxjs';
import { Site } from 'src/app/modeles/site';
import { AgentServices } from 'src/app/services/agent.service';

@Component({
  selector: 'app-planning-home',
  templateUrl: './planning-home.component.html',
  styleUrls: ['./planning-home.component.scss']
})
export class PlanningHomeComponent implements OnInit, OnDestroy {

  listAgent: Agent[]
  angentSubscription : Subscription;
  listSite: Site[];
  siteSubscription : Subscription;
  constructor(private router: Router, private agentServices: AgentServices) { }

  ngOnInit() {
    this.angentSubscription = this.agentServices.agentSubject.subscribe((data)=>{
      this.listAgent = data;
    });
    this.siteSubscription = this.agentServices.siteSubject.subscribe((data)=>{
      this.listSite = data;
    });
    this.getAgents();
    this.getSites();
  }

  ngOnDestroy() {
    this.angentSubscription.unsubscribe();
    this.siteSubscription.unsubscribe();
  }

  gotoCalendar(){
    this.router.navigate(['/planning/calendar'])
  }

  getSites(){
    this.agentServices.getSites().then((data: Site[])=>{
     this.listSite = data;
     console.log(this.listSite);
    }).catch(err=>console.log(err)
    );
  }

  getAgents(){
    this.agentServices.getAgents().then((data: Agent[])=>{
      this.listAgent = data;
      console.log(this.listAgent);
      
    }).catch(err=>console.log(err)
    );
  }
}
