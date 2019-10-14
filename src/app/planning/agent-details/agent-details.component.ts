import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { AgentServices } from 'src/app/services/agent.service';
import { Agent } from 'src/app/modeles/agent';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements OnInit {
  id:string;
  agent: any;
  coucou:string = "coucou"
  constructor(private router: Router,
    private agentServices: AgentServices, 
    private route: ActivatedRoute) {
    
     }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.agent = this.router.getCurrentNavigation().extras.state
    console.log(this.agent)
  }
}
