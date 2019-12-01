import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
//import * as $ from 'jquery';
import { AuthService } from './services/auth.service';

declare var $:any;
window["$"] = $;
window["jQuery"] = $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SecuryTime';
  isAuth: boolean;
  show:boolean = false;
 
  constructor(private authService: AuthService){

  }

  ngOnInit(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    });

    $('[data-toggle="slide-collapse"]').on('click', function() {
      $.navMenuCont = $($(this).data('target'));
      $.navMenuCont.animate({
        'width': 'toggle'
      }, 350);
      $(".menu-overlay").fadeIn(500);
    
    });

    $(".menu-overlay").click(function(event) {
      $(".navbar-toggle").trigger("click");
      $(".menu-overlay").fadeOut(500);
    });

    $('.navbar-nav>li>a').on('click', function(){
      $('.navbar-toggler').click();
    });

    $(document).on('click', function(){
      $('.navbar-collapse').collapse('hide');
    });
    
  }

  toggleCollapse() {
    this.show = !this.show
  }


  onSignOut(){
    this.authService.signOut();
  }
}
