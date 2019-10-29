import { Component, ViewChild, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
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
import { Event } from 'src/app/modeles/event';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit,OnDestroy {
  
  @ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template
  @ViewChild('serviceModale', { static: false }) modal: ElementRef; // the #calendar in the template

  @Input() agents: Agent[];
  @Input() sites: Site[];
  events=[];
  eventSubcription: Subscription;
  serviceForm: FormGroup;
  calendarPlugins = [interactionPlugin,dayGridPlugin, timeGrigPlugin, listPlugin]; // important!
  isModalShow: boolean = false;
  header = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridMonth,timeGridWeek,timeGridDay,listMonth',
          }
  constructor(private formBuilder: FormBuilder,private eventServices: EventServices) { }

  ngOnInit(){
    this.eventSubcription = this.eventServices.eventSubject.subscribe((data)=>{
      this.events = data
    })
    this.initForm();
    this.getEvents()

  }

  ngOnDestroy(){
    this.eventSubcription.unsubscribe()
  }
  
  handleDateClick(arg) { // handler method
    console.log(arg.dateStr);
  }

  ngAfterViewInit() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.render();
    calendarApi.getAvailableLocaleCodes().forEach(localcode=>{
      localcode='fr'
    })
    calendarApi.setOption('editable',true)
    calendarApi.setOption('navlink',true)
    // call a method on the Calendar object
    calendarApi.setOption('locale','fr')
    
  }
  initForm(){
    this.serviceForm = this.formBuilder.group({
      djour:['',Validators.required],
      dheure: ['', Validators.required], 
      fjour: ['', Validators.required],
      fheure: ['', Validators.required],
      agent: ['',Validators.required],
      site: ['',Validators.required]
    })
  }
  addEvent(){
    const formValue = this.serviceForm.value;
    const d = formValue['djour'] + 'T'+formValue['dheure']+':00';
    const f = formValue['fjour'] + 'T' + formValue['fheure'] + ':00';
    const event = new Event(formValue['agent'],formValue['site'], d, f);
    this.eventServices.addEvent(event).then((data)=>{
      console.log(data);
    }).catch(err=>{console.log(err)
    })
    console.log(formValue);
    this.serviceForm.reset();
    
  }

  getEvents(){
    this.eventServices.getEvents().then((data:Event[])=>{
      console.log(data);
      
      data.forEach(elt=>{
        const d = new Date (elt.debut)
        const f = new Date(elt.fin)
       

        if (!isNaN(d.valueOf()) && !isNaN(f.valueOf())){
          const  event = ({
            title: elt.agent.nom + " - "+elt.site.dataSite.nom,
            start: d,
            color:this.getRandomColor(),
            end: f,
          })
          this.calendarComponent.getApi().addEvent(event)
        }
      })
    }).catch(err=>console.log(err)
    )
  }

  getRandomColor() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
   }
  /**
   * 
   if (!isNaN(d.valueOf()) && !isNaN(f.valueOf())){
      this.calendarComponent.getApi().addEvent({
        title: 'site nom',
        start: d,
        end: f,
      })
    }
   */

}
