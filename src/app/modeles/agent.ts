export interface Agent{
    id:number;
    matricule:number;
    nom:string;
    genre:string; 
    adresse:any; 
    contacts:any;
    cartes: any;
}

export interface AgentReponse{
    success:boolean;
}