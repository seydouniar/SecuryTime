import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentServices } from 'src/app/services/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent implements OnInit {
  agentForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private agentService:AgentServices,private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.agentForm = this.formBuilder.group({
      matricule:['',Validators.required],
      genre: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      code_postale:['',],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      contacts: ['', Validators.required]
    })
  }
  onSaveNewAgent(){
    const formValue = this.agentForm.value;
      
    this.agentService.Ajouter(formValue).subscribe(
      (data)=>{
        this.router.navigate(['/planning']);
      }
    );
  }
}
