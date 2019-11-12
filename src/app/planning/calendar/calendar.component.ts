import { Component, ViewChild, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
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
  @ViewChild('external',{static:false,read:ElementRef}) external: ElementRef;

  @Input() agents: Agent[];
  @Input() sites: Site[];
  events=[];
  options: any;
  eventSubcription: Subscription;
  serviceForm: FormGroup;
  calendarPlugins = [interactionPlugin,dayGridPlugin, timeGrigPlugin, listPlugin]; // important!
  isModalShow: boolean = false;
  isSiteShow: boolean = false;
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
    this.options = {
      editable: true,
      theme: 'standart', // default view, may be bootstrap
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      locales:[frLocale],
      // add other plugins
      plugins: [interactionPlugin, dayGridPlugin, timeGrigPlugin, listPlugin]
    };

    
    this.initForm();
    this.getEvents()

  }

  ngOnDestroy(){
    this.eventSubcription.unsubscribe()
  }
  
  ngAfterViewInit() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.render();

    new Draggable(this.external.nativeElement,{
      itemSelector:'.fc-event',
      eventData: (event1)=>{
        return {
          title: event1.innerText
        }
      }
    });
  }

  switchSiteAgents(){
    if(this.isSiteShow){
      this.isSiteShow = false;
    }else{
      this.isSiteShow = true;
    }
  }
  //calendar events
  handleDateClick(arg) { // handler method
    console.log(arg.dateStr);
  }

  //event click
  eventClick(ev){
    console.log(ev);
    
  }

  dateClick(ev){
    console.log(ev);
    
  }

  updatHeader(){

  }

  updateEvent(){

  }

  eventDragStop(){

  }

  dayRender(ev){
    if(ev.e1){
      ev.e1.addEventListener('dblclick',()=>{
      alert('double click')
    });
    }
    
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

  //from service
  addEvent(){
    const formValue = this.serviceForm.value;
    const d = formValue['djour'] + 'T'+formValue['dheure']+':00';
    const f = formValue['fjour'] + 'T' + formValue['fheure'] + ':00';
    const event = new Event(formValue['agent'],formValue['site'], d, f);
    this.eventServices.addEvent(event).then((data)=>{
      }).catch(err=>{console.log(err)
    })
    this.serviceForm.reset();
    
  }

  getEvents(){
    this.eventServices.getEvents().then((data:Event[])=>{      
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
