import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Agent, AgentReponse } from '../modeles/agent';
import { Observable, Subject } from 'rxjs';
import { Site, SiteReponse } from '../modeles/site';
import { Client, ClientResponse } from '../modeles/client';
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

    //add site
    addSite(site:Site): Observable<SiteReponse>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
        })
        };
        console.log(site);
        
        return this.http.post<SiteReponse>(this.REG_SERVER + "/sites/new", site, httpOptions);
    }

    getSites() {
        return this.http.get<Site[]>(this.REG_SERVER+'/sites')
    }

    getClient(){
        return this.http.get<Client[]>(this.REG_SERVER+'/clients')
    }

    addClient(client: Client): Observable<ClientResponse>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
        })
        };
        return this.http.post<ClientResponse>(this.REG_SERVER+'/clients/new',client,httpOptions)
    }
  
}