import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Agent } from 'src/app/modeles/agent';
import { Site } from 'src/app/modeles/site';
import { EventServices } from 'src/app/services/event.services';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  
  @ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template
  @ViewChild('serviceModale', { static: false }) modal: ElementRef; // the #calendar in the template

  @Input() agents: Agent[];
  @Input() sites: Site[];
  events:Event[];
  serviceForm: FormGroup;
  calendarPlugins = [interactionPlugin,dayGridPlugin, timeGrigPlugin, listPlugin]; // important!
  isModalShow: boolean = false;
  header = {
        left: 'prev,next today',
        center: 'title',
    right: 'dayGridMonth,timeGridMonth,timeGridWeek,timeGridDay,listMonth'
      }
  constructor(private formBuilder: FormBuilder,private eventServices: EventServices) { }

  ngOnInit(){
    this.initForm();
  }
  
  handleDateClick(arg) { // handler method
    console.log(arg.dateStr);
  }

  ngAfterViewInit() {
    let calendarApi = this.calendarComponent.getApi();
    
    // call a method on the Calendar object
    calendarApi.setOption('locale','fr')
    calendarApi.render();
  }
  initForm(){
    this.serviceForm = this.formBuilder.group({
      djour:['',Validators.required],
      dheure: ['', Validators.required], 
      fjour: ['', Validators.required],
      fheure: ['', Validators.required]
    })
  }
  addEvent(){
    const formValue = this.serviceForm.value;
    let d = new Date(formValue['djour'] + 'T'+formValue['dheure']+':00');
    let f = new Date(formValue['fjour'] + 'T' + formValue['fheure'] + ':00');

    if (!isNaN(d.valueOf()) && !isNaN(f.valueOf())){
      this.calendarComponent.getApi().addEvent({
        title: 'site nom',
        start: d,
        end: f,
      })
    }
    console.log(formValue);
    this.serviceForm.reset();
    
  }


}
