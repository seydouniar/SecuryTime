import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AgentServices } from '../services/agent.service';
import { Agent } from "../modeles/agent";
import { Site } from '../modeles/site';
import { EventServices } from '../services/event.services';
import { Subscription } from 'rxjs';
import { Event } from '../modeles/event';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit,OnDestroy {
  listSites: Site[];
  listAgent: Agent[];
  angentSubscription: Subscription
  siteSubscription: Subscription

  isSiteShow: boolean = false;
  constructor(private router: Router, private eventServices: EventServices,
    private agentServices: AgentServices) { }

  ngOnInit() {
    //this.router.navigate(['/planning/calendar'])
    this.angentSubscription=this.agentServices.agentSubject.subscribe(
      (data)=>{
        this.listAgent = data
      }
    );
    this.siteSubscription=this.agentServices.siteSubject.subscribe(
      (data)=>{
        this.listSites = data
      }
    );
    this.getAllSites();
    this.getListAgent();
    this.getEvents();
  }


  ngOnDestroy(){
    this.angentSubscription.unsubscribe();
    this.siteSubscription.unsubscribe();
  }
   //ajout des agents
  gotoNewAgent(){
    this.router.navigate(['/newagent']);
  }
 
  gotoNewSite(){
    this.router.navigate(['/newsite']);
  }
  
  switchSiteAgents(){
    if(this.isSiteShow){
      this.isSiteShow = false;
    }else{
      this.isSiteShow = true;
    }
  }

  getAllSites(){
    this.agentServices.getSites().then((data: Site[])=>{
      this.listSites = data
      console.log(this.listSites);
      
    }).catch(err=>console.log(err)
    )
  }

  getListAgent() {
    this.agentServices.getAgents().then((data: Agent[]) => {
      this.listAgent = data;
      console.log(data);

    }).catch(err=>console.log(err)
    )
  }

  getEvents(){
    this.eventServices.getEvents().then((data:Event[])=>{
      console.log(data);
    }).catch(err=>console.log(err))
  }
}
