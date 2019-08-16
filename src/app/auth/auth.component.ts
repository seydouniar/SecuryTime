import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userForm: FormGroup;
  mode: string = 'connexion';
  constructor(private authService: AuthService, 
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.userForm = this.formBuilder.group(
      {
        login: ['',Validators.required],
        pass: ['', Validators.required]}
    );
  }

  switchConn() {
    if(this.mode === 'connexion') {
      this.mode = 'inscrire';
    } else {
      this.mode = 'connexion';
    }
  }
  onSubmitForm() {
    const formValue = this.userForm.value;
    console.log(formValue['login'], formValue['pass']);
    this.authService.login(formValue['login'], formValue['pass']).then(
      (user)=>{
        this.router.navigate(['/intervention']);
        
      },
      err=>{console.log(err);
      }
    );
  }

}
