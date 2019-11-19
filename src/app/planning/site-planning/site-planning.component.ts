import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentServices } from 'src/app/services/agent.service';
import { Subscription } from 'rxjs';
import { Site } from 'src/app/modeles/site';

@Component({
  selector: 'app-site-planning',
  templateUrl: './site-planning.component.html',
  styleUrls: ['./site-planning.component.scss']
})
export class SitePlanningComponent implements OnInit,OnDestroy {

  siteSubscription : Subscription;
  listSite: Site[] ;
  constructor(private agentServices: AgentServices) { }

  ngOnInit() {
    this.siteSubscription = this.agentServices.siteSubject.subscribe((data)=>{
      this.listSite = data;
    });
    this.getSites();
  }

  ngOnDestroy() {
    this.siteSubscription.unsubscribe();
  }

  getSites(){
    this.agentServices.getSites().then((data: Site[])=>{
     this.listSite = data;
     console.log(this.listSite);
    }).catch(err=>console.log(err)
    );
  }


}
