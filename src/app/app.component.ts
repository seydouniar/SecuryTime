import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SecuryTime';
  isAuth: boolean;
  constructor(private authService: AuthService){

  }

  ngOnInit(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    })
  }

  onSignOut(){
    this.authService.signOut();
  }
}
