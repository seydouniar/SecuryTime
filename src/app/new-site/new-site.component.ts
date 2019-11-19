import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AgentServices } from 'src/app/services/agent.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/modeles/client';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.scss']
})
export class NewSiteComponent implements OnInit {
  clientForm: FormGroup;
  siteForm: FormGroup;
  clients: Client[];
  constructor(private formbuilder: FormBuilder,private agentServices: AgentServices, private router: Router) { }

  ngOnInit() {
    this.onGetClient();
    this.initForm();
    this.initFormClient();
  
  }

  initForm(){
    this.siteForm = this.formbuilder.group({
      data_site: new FormGroup({
        nom: new FormControl('',  Validators.required),
        nom_agence: new FormControl('',  Validators.required),
        responsable: new FormControl('',  Validators.required),
        code_site: new FormControl('',  Validators.required),
        couleur: new FormControl('',  Validators.required),
        email: new FormControl('',  Validators.required),
        tel: new FormControl('',  Validators.required)
      }),
      adresse: new FormGroup({
        voie: new FormControl('',  Validators.required),
        complement: new FormControl(''),
        commune: new FormControl('',  Validators.required),
        ville: new FormControl('',  Validators.required),
        pays: new FormControl('',  Validators.required)
      }),
      id_client: ['',Validators.required]
    })
  }

  initFormClient() {
    this.clientForm = this.formbuilder.group({
    nom: ['', Validators.required],
    code_facture: ['', Validators.required],
    adresse: new FormGroup({
      rue: new FormControl('', Validators.required),
      code_postale: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required)
    }),
    contacts: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', Validators.required),
      fixe: new FormControl('', Validators.required)
    }),
  });
}

  onGetClient(){
    this.agentServices.getClient().subscribe((data:Client[])=>{
      this.clients= data;
      console.log(data);
      
    })
  }
  onSaveNewASite(){
    const formValue = this.siteForm.value
    this.agentServices.addSite(formValue).subscribe((data)=>{
      if(data.success){
        this.router.navigate(['/planning/les-sites'])
      }
      
    })
  }

  onAddClient(){
    const formValue = this.clientForm.value
    this.clients=[]
    this.agentServices.addClient(formValue).subscribe((data)=>{
      if(data.success){
        console.log(data.success);
        this.onGetClient();
      }
    })
  }
}
