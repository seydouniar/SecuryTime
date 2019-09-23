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
  signUpForm: FormGroup;
  message_err='';
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

    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      psw: ['', Validators.required],
      phone: ['',Validators.required],
      street: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      born: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      civilite: ['',Validators.required],
      conf:['',Validators.required]

    })
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
    this.authService.signIn(formValue['login'], formValue['pass']).then(
      (user)=>{
        this.router.navigate(['/home']);
      },
      err=>{this.message_err = err.message + " connexion";
      }
    );
  }

  onSubmitFormSignUp(){
    const formValue = this.signUpForm.value;
    const data = {
      nom: formValue['nom'],
      prenom: formValue['prenom'],
      email: formValue['email'],
      pays: formValue['pays'],
      ville: formValue['ville'],
      street: formValue['street'],
      civilite: formValue['civilite'],
      phone: formValue['phone'],
    }
    if(formValue["psw"] === formValue["conf"]){
      this.authService.signUp(formValue['email'],formValue['psw'],data).then(
        ()=>{
          this.router.navigate(['/home']);
        },err=>{
          this.message_err = err.message + " inscription";
        }
      )
    }else{
      this.message_err = "Mot de passe différent."
    }
  }

}
