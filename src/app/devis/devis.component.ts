import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {

  users:any = [];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:3003/users").subscribe(
      data=>{
        this.users = data
        console.log(data);
        
      }
    )
  }

}
