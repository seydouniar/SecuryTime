import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AgentServices } from 'src/app/services/agent.service';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.scss']
})
export class NewSiteComponent implements OnInit {
  siteForm: FormGroup;
  constructor(private formbuilder: FormBuilder,private agentServices: AgentServices) { }

  ngOnInit() {
    this.initForm()
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
        complement: new FormControl('',  Validators.required),
        commune: new FormControl('',  Validators.required),
        ville: new FormControl('',  Validators.required),
        pays: new FormControl('',  Validators.required)
      }),
      nom_client: ['']
    })
  }

  onSaveNewASite(){
    const formValue = this.siteForm.value
    this.agentServices.addSite(formValue).subscribe((data)=>{
      console.log(data);
      
    })
  }
}
