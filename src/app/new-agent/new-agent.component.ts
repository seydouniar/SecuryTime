import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AgentServices } from 'src/app/services/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent implements OnInit {
  agentForm: FormGroup;
  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder, private agentService: AgentServices, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
      this.agentForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      genre: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
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
      cni: new FormGroup({
        numero: new FormControl('', Validators.required),
        delivre: new FormControl('', Validators.required),
        fin: new FormControl('', Validators.required)
      }),
      carte_agent: new FormGroup({
        numero: new FormControl('', Validators.required),
        delivre: new FormControl('', Validators.required),
        fin: new FormControl('', Validators.required)
      })
    });
  }

  get f() { return this.agentForm.controls; }

  onSaveNewAgent() {
    const formValue = this.agentForm.value;
    console.log(formValue);
    
    this.agentService.Ajouter(formValue).subscribe(
      (data) => {
        if (data.success) {
          this.router.navigate(['/planning']);
        }
      }
    );
  }
}
