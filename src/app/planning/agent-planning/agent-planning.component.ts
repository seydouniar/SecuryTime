import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentServices } from 'src/app/services/agent.service';
import { Agent } from 'src/app/modeles/agent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agent-planning',
  templateUrl: './agent-planning.component.html',
  styleUrls: ['./agent-planning.component.scss']
})
export class AgentPlanningComponent implements OnInit,OnDestroy{
  listAgent: Agent[]
  agentSubscription : Subscription;
  constructor(private agentServices: AgentServices) { }

  ngOnInit() {
    this.agentSubscription = this.agentServices.agentSubject.subscribe((data)=>{
      this.listAgent = data;
    });
    this.getAgents();
  }

  ngOnDestroy(){
    this.agentSubscription.unsubscribe();
  }

  getAgents(){
    this.agentServices.getAgents().then((data: Agent[])=>{
      this.listAgent = data;
      console.log(this.listAgent);
      
    }).catch(err=>console.log(err)
    );
  }


}
