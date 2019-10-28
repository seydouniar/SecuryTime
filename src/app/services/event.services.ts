import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'url';

@Injectable()
export class EventServices{
    REG_SERVER = "http://localhost:3003";

    constructor(private http: HttpClient) {

    }

    getEvents(){
        return new Promise((resolve,reject)=>{
            this.http.get<Event[]>(this.REG_SERVER+"/events").toPromise().then(
                (data)=>{
                    resolve(data)
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