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
  listAgent: Agent[];
  constructor(private router: Router,private agentservices:AgentServices) { }

  ngOnInit() {
    this.getListAgent();
  }


   //ajout des agents
  gotoNewAgent(){
    this.router.navigate(['/newagent']);
  }
 
  getListAgent(){
    this.agentservices.getAgents().subscribe((data: Agent[])=>{
      this.listAgent = data;
      console.log(data);
      
    })
  }

  getAgentInfo(i: number){
    this.router.navigate(['/agent-details',this.listAgent[i].id]);
  }
}
