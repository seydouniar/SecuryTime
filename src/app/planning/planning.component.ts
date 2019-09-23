import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

   //ajout des agents
  gotoNewAgent(){
    this.router.navigate(['/newagent']);
  }

  //  to do
  /**
   * ajout des sites
   * ajout des clients
   * ajout sous traitants
   * planifications
   * tri par agent
   * tri site
   * controle de planification
   */

}
