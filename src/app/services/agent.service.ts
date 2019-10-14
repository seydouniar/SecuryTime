import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Agent, AgentReponse } from '../modeles/agent';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class AgentServices{
    private listAgent: Agent[];
    agentSubject = new Subject<Agent[]>();

    REG_SERVER = "http://localhost:3003";

    constructor(private http: HttpClient){

    }
    emitAgents(){
        this.agentSubject.next(this.listAgent);
    }
    Ajouter(agent: Agent): Observable <AgentReponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
        })
        };
        console.log(agent);
        
        return this.http.post<AgentReponse>(this.REG_SERVER + "/agents/new", agent, httpOptions);
    }
    getAgents(){
        return this.http.get<Agent[]>(this.REG_SERVER+'/agents')
    }
   

    getAgentById(id: number) {
        const agent = this.listAgent.find(
            (s)=>{
                return s.id === id;
            }
        );

        return agent;
    }
  
}