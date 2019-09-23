import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agent, AgentReponse } from '../modeles/agent';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

@Injectable()
export class AgentServices{
    
    REG_SERVER = "http://localhost:3003";
    agentSubject = new BehaviorSubject(false);
    constructor(private http: HttpClient){

    }

    Ajouter(agent: Agent): Observable<AgentReponse>{   
        return this.http.post<AgentReponse>(this.REG_SERVER + "/agents/new", agent).pipe(tap((res:AgentReponse)=>{
            if(res.success){    
                this.agentSubject.next(true);
            }
            
        }));       
    }
}