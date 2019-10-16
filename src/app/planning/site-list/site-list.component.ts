import { Component, OnInit } from '@angular/core';
import { AgentServices } from 'src/app/services/agent.service';
import { Site } from 'src/app/modeles/site';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  listSites: Site[];
  constructor(private agentServices: AgentServices) { }

  ngOnInit() {
    this.getAllSites();
  }

  getAllSites(){
    this.agentServices.getSites().subscribe((data: Site[])=>{
      this.listSites = data
      console.log(this.listSites);
      
    })
  }
}
