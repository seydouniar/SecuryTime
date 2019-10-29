import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../modeles/event';
import { AgentServices } from './agent.service';
import { Subject } from 'rxjs';

@Injectable()
export class EventServices{
    REG_SERVER = "http://localhost:3003";

    private eventList: Event[] = [];
    eventSubject = new Subject<Event[]>();

    emitEvent(){
        this.eventSubject.next(this.eventList.slice())
    }
    constructor(private http: HttpClient,private agentServices: AgentServices) {

    }

    getEvents(){
        return new Promise((resolve,reject)=>{
            this.http.get<any[]>(this.REG_SERVER+"/events").toPromise().then(
                (data)=>{
                    this.eventList=[]
                    console.log(data);
                    
                    data.forEach(val=>{
                        let event= new Event(
                            this.agentServices.getAgentById(val.id_agent),
                            this.agentServices.getSiteById(val.id_site),val.debut,val.fin
                        )
                        this.eventList.push(event)
                    })
                    this.emitEvent();
                    resolve(this.eventList)
                }
                
            ).catch(err=>reject(err))
        })
    }

    addEvent(event: Event) {
        return new Promise((revolve,reject) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };

            this.http.post(this.REG_SERVER + "/events/new", event, httpOptions).toPromise().then(
                (data) => {
                    revolve(data);
                }
            ).catch(err=>reject(err));
        })
       
    }



}