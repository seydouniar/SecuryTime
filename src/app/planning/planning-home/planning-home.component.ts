import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning-home',
  templateUrl: './planning-home.component.html',
  styleUrls: ['./planning-home.component.scss']
})
export class PlanningHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoCalendar(){
    this.router.navigate(['/planning/calendar'])
  }
}
