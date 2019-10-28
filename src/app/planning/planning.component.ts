import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentServices } from '../services/agent.service';
import { Agent } from "../modeles/agent";
import { Site } from '../modeles/site';
import { EventServices } from '../services/event.services';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  listSites: Site[];
  listAgent: Agent[];
  isSiteShow: boolean = false;
  constructor(private router: Router, private eventServices: EventServices,
    private agentServices: AgentServices) { }

  ngOnInit() {
    //this.router.navigate(['/planning/calendar'])
    this.getAllSites();
    this.getListAgent();
    this.getEvents();
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
    this.agentServices.getSites().subscribe((data: Site[])=>{
      this.listSites = data
      console.log(this.listSites);
      
    })
  }

  getListAgent() {
    this.agentServices.getAgents().subscribe((data: Agent[]) => {
      this.listAgent = data;
      console.log(data);

    })
  }

  getEvents(){
    this.eventServices.getEvents().then(data=>{
      console.log(data);
    }).catch(err=>console.log(err))
  }
}
