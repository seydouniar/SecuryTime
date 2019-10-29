import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Agent, AgentReponse } from '../modeles/agent';
import { Observable, Subject } from 'rxjs';
import { Site, SiteReponse } from '../modeles/site';
import { Client, ClientResponse } from '../modeles/client';
import { resolve } from 'url';
@Injectable()
export class AgentServices{
    private listAgent: Agent[]=[];
    private siteList: Site[] = []
    agentSubject = new Subject<Agent[]>();
    siteSubject = new Subject<Site[]>();

    REG_SERVER = "http://localhost:3003";

    constructor(private http: HttpClient){

    }
    emitAgents(){
        this.agentSubject.next(this.listAgent.slice());
    }
    emitSite(){
        this.siteSubject.next(this.siteList.slice());
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
        return new Promise((resolve,reject)=>{
            this.http.get<Agent[]>(this.REG_SERVER+'/agents').toPromise().then((data: Agent[])=>{
               this.listAgent = data
               this.emitAgents();
               resolve(this.listAgent)
            }).catch(err=>reject(err))

        })
    }
   

    getAgentById(id: number) {
        const agent = this.listAgent.find(
            (s)=>{
                return s.id === id;
            }
        );

        return agent;
    }

    getSiteById(id: number) {
        const site = this.siteList.find(
            (s)=>{
                return s.id === id;
            }
        );

        return site;
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
        return new Promise((resolve,reject)=>{
            this.http.get<Site[]>(this.REG_SERVER+'/sites').toPromise().then(data=>{
                this.siteList = data
                this.emitSite()
                resolve(this.siteList)
            }).catch(err=>reject(err))
        })
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