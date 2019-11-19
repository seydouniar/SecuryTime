import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentServices } from 'src/app/services/agent.service';
import { Site } from 'src/app/modeles/site';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit,OnDestroy {
  listSites: Site[];
  siteSubcription : Subscription;
  constructor(private agentServices: AgentServices) { }

  ngOnInit() {
    this.getAllSites();
    this.siteSubcription = this.agentServices.siteSubject.subscribe((data:Site[])=>{
      this.listSites = data;
    })
  }

  ngOnDestroy(){
    this.siteSubcription.unsubscribe()
  }

  getAllSites(){
    this.agentServices.getSites().then((data: Site[])=>{
      this.listSites = data
      console.log(this.listSites);
      
    }).catch(err=>console.log(err)
    )
  }
}
