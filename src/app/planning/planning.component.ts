import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentServices } from '../services/agent.service';
import { Agent } from "../modeles/agent";
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  
  isSiteShow: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/planning/les-agent'])
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
      this.router.navigate(['/planning/les-agent'])
    }else{
      this.isSiteShow = true;
      this.router.navigate(['/planning/les-sites'])
    }
  }
}
