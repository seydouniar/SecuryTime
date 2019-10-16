import { Component, OnInit } from '@angular/core';
import { AgentServices } from 'src/app/services/agent.service';
import { Agent } from 'src/app/modeles/agent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {
  listAgent: Agent[]
  constructor(private agentservices:AgentServices,private router: Router) { }

  ngOnInit() {
    this.getListAgent();
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
