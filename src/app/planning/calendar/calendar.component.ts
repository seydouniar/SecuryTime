import { Component, ViewChild, OnInit, ElementRef, Input, OnDestroy, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { FormGroup} from '@angular/forms';
import { Agent } from 'src/app/modeles/agent';
import { Site } from 'src/app/modeles/site';
import { EventServices } from 'src/app/services/event.services';
import { Event } from 'src/app/modeles/event';
import { Subscription, from } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DialogEventSelectComponent } from './dialog-event-select/dialog-event-select.component';
import { DialogEventEditComponent } from './dialog-event-edit/dialog-event-edit.component';
import { PopoverService } from 'src/app/services/popover.service';
import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template
  @ViewChild('serviceModale', { static: false }) modal: ElementRef; // the #calendar in the template
  @ViewChild('external', {static: false, read: ElementRef}) external: ElementRef;
  @ViewChild('popoverElementRef', { static:false,read: ViewContainerRef }) popoverElementRef: ViewContainerRef;

  @Input() agents: Agent[];
  @Input() sites: Site[];
  @Input() isEditable: boolean = false;
  @Input() showAll: string = 'tous'
  site:Site;
  agent:Agent;
  events = [];
  options: any;
  closeResult: string;
  refreshEvents;
  calendarEvents: any = []

 

  eventSubcription: Subscription;
  serviceForm: FormGroup;
  calendarPlugins = [bootstrapPlugin,interactionPlugin, dayGridPlugin, timeGrigPlugin, listPlugin]; // important!
  day;
  header = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridMonth,timeGridWeek,timeGridDay,listMonth',
        };
  constructor(public dialog: MatDialog, private eventServices: EventServices, public popoverService: PopoverService) { }

  ngOnInit() {
    this.eventSubcription = this.eventServices.eventSubject.subscribe((data) => {
      this.events = data;
    });
    this.options = {
      editable: true,
      theme: 'bootstrap', // default view, may be bootstrap
      header: {
        left: 'prev,next,today',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      locales: [frLocale],
      // add other plugins
      plugins: [bootstrapPlugin, interactionPlugin, dayGridPlugin, timeGrigPlugin, listPlugin]
    };

    
    
    this.getEvents();

  }


  ngOnDestroy() {
    this.eventSubcription.unsubscribe();
  }

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.render();
    if(this.isEditable){
      
      new Draggable(this.external.nativeElement,{
        itemSelector: '.fc-event',
        eventData: (event1) => {
          this.calendarEvents = calendarApi.getEvents();
          const indexDrag = parseInt(event1.getAttribute("value"))
          
          this.getIndex(indexDrag);
          return {
            title: event1.innerText,
            duration: "02:00",
          }
        }
      });
    }
    calendarApi.setOption('addEventSource',this.refreshEvents)

  }

 
// calendar events
  handleDateClick(arg) { // handler method
    console.log(arg.dateStr);
  }

  eventDrag(ev){
    console.log(ev);
    
    const  newevent = new Event(ev.event.start.toISOString(),ev.event.end.toISOString(),null,null,ev.event.id);
    this.eventServices.updateEvent(newevent).then((data)=>{
      this.getEvents();
    }).catch(err=>console.log(err)
    );
  }

  eventResize(ev){
    const  newevent = new Event(ev.event.start.toISOString(),ev.event.end.toISOString(),null,null,ev.event.id);
    this.eventServices.updateEvent(newevent).then((data)=>{
      this.getEvents();
    }).catch(err=>console.log(err)
    );
  }
  eventRender(ev){
    this.popoverService.showPopover(this.popoverElementRef, ev);
  }

  eventMouseOut(ev){
    this.popoverElementRef.clear();
  }
  // event click
  eventClick(ev) {
    console.log(ev.event.start.toISOString());
    this.openDialogEdit(ev)
  }

  dateClick(ev) {
    console.log(ev);
  }

  updatHeader() {

  }

  updateEvent() {

  }

  eventDragStop(ev){
    const  newevent = new Event(ev.event.start.toISOString(),ev.event.end.toISOString(),null,null,ev.event.id);
    this.eventServices.updateEvent(newevent).then((data)=>{
      this.getEvents();
    }).catch(err=>console.log(err)
    );
    
    
  }

  getIndex(i:number){
    if(this.showAll==='site'){
      this.site = this.sites[i];
    }else if(this.showAll==='agent'){
      this.agent = this.agents[i]
    }
    
  }

  eventReceive(ev){
    
    if(this.showAll==='site'){
      const  newevent = new Event(ev.event.start.toISOString(),ev.event.end.toISOString(),this.site.id)
      this.eventServices.addEvent(newevent).then((data)=>{

      }).catch(err=>console.log(err)
      );
    }else if(this.showAll==='agent'){
      console.log(this.agent.id);
      
      const day=ev.event.start.toISOString().split('T',2)[0];
      const dayEvents = this.filterEventByDay(day)
      if(dayEvents.length==0){
        this.getEvents();
        return alert("Aucun site n'est plannifier à cette date")
        
      }if(dayEvents.length == 1){
        console.log(dayEvents);
        
        this.eventServices.addAgentEvent({id:dayEvents[0].id,id_agent:this.agent.id}).then(
          ()=>{
            this.getEvents();
          }
        ).catch(err=>console.log(err)
        );
        return alert("modification agent avec success");
      }

      this.openDialog(this.filterEventByDay(day))
      
      console.log(dayEvents);
      
      
    }
  }

 
  

  dayRender(ev) {
    if (ev.e1) {
      ev.e1.addEventListener('dblclick', () => {
      alert('double click');
    });
    }
  }

  
  getEvents() {
    this.eventServices.getEvents().then((data: Event[]) => {
      // console.log(data);
      this.calendarComponent.getApi().removeAllEvents()
      this.events=data;
      const arrayEvent = [];
      this.events.forEach(elt=>{
        const d = new Date (elt.debut);
        const f = new Date(elt.fin);

        if (!isNaN(d.valueOf()) && !isNaN(f.valueOf())) {
          if(!elt.agent){
            const  event = ({
              id: elt.id,
              title: elt.site.dataSite.nom,
              start: d,
              color: '#aa0000',
              end: f,
            });
            arrayEvent.push(event);
          }else{
            const  event = ({
              id:elt.id,
              title: elt.agent.nom + " - " + elt.site.dataSite.nom,
              start: d,
              color:this.getRandomColor(),
              end: f,
            });
            arrayEvent.push(event);
            
          }    
        }
      }); 
     
      this.calendarComponent.getApi().addEventSource(arrayEvent)
      
    }).catch(err => console.log(err)
    );
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
   }

   filterEventByDay(day):any[]{
    
    return this.calendarEvents.filter(
      ev=>ev.start.toISOString().split('T',2)[0].indexOf(day)>-1)
   }
  
   openDialog(events:any[]): void {
    const dialogRef = this.dialog.open(DialogEventSelectComponent, {
      width: '40%',
      data: events
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.eventServices.addAgentEvent({id:result.id,id_agent:this.agent.id}).then(
        ()=>{
          this.getEvents();   
          alert("modification agent avec success");
        }
      ).catch(err=>console.log(err)
      );
    });
     
  }

  openDialogEdit(event): void {
    const dialogRef = this.dialog.open(DialogEventEditComponent, {
      width: '60%',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      
    });
     
  }
}
