import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentServices } from 'src/app/services/agent.service';
import { Agent } from 'src/app/modeles/agent';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit,OnDestroy {
  listAgent: Agent[]
  angentSubscription : Subscription;
  constructor(private agentservices:AgentServices,private router: Router) { }

  ngOnInit() {
    this.angentSubscription=this.agentservices.agentSubject.subscribe(
      (data)=>{
        this.listAgent = data
      }
    )
    this.getListAgent();
  }

  ngOnDestroy(){
    this.angentSubscription.unsubscribe()
  }
  getListAgent(){
    this.agentservices.getAgents().then((data: Agent[])=>{
      this.listAgent = data;
      console.log(data);
      
    }).catch(err=>console.log(err)
    )
  }

  getAgentInfo(i: number){
    this.router.navigate(['/agent-details',this.listAgent[i].id]);
  }

}
