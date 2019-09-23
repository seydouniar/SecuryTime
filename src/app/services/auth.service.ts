import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  DbUser = firebase.database().ref('Users');

  users:any[]=[
    {login:"seydou",pass:"aaaaa"},
    {login:"jhonny",pass:"1233"}
];

signIn(login: string, pass: string) {
  return new Promise(
    (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(login,pass).then(
        ()=>{
          resolve()
        }, error=>reject(error)
      )
    }
  );
}

signUp(login: string, pass: string,data:any){
  return new Promise(
    (resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(login, pass).then(
        () => {
          this.DbUser.child(firebase.auth().currentUser.uid).set({data}).then(
            ()=>{
              resolve()
            },err=>reject(err)
          )
        }, error => reject(error)
      )
    }
  );
}

  signOut() {
    return new Promise(
      (resolve,reject)=>{
        firebase.auth().signOut().then(
          ()=>resolve(),
          err=>reject(err)
        );
      }
    );
  }
login(login:string,pass:string){
  return new Promise((resolve,reject)=>{
    for(let user of this.users){
      if (user.login === login && user.pass === pass) {
        resolve(user);
        break;
      } 
    }
   
  })
}

}