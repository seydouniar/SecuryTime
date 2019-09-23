export interface Agent{
    matricule:number;
    nom:string;
    genre:string; 
    adresse:string; 
    code_postale:number; 
    ville:string;
    pays:string;
    contacts:any;
}

export interface AgentReponse{
    success:boolean;
}