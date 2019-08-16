import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users:any[]=[
    {login:"seydou",pass:"aaaaa"},
    {login:"jhonny",pass:"1233"}
];

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