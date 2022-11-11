import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-client';
  showFiller = false;
  isLoggedIn?: boolean

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.checkUser()
  }

  logOut(): void{
    this.serverService.logout()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
      this.router.navigate(['home']);
  }

  checkUser(){
    console.log(localStorage.getItem('isLoggedIn'))
    let isLoggedIn: boolean
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
    //return isLoggedIn
  }


}
