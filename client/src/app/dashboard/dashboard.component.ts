import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isDashboard!: boolean

  constructor(private router: Router) { 
    router.events.subscribe((val) => {
      // console.log(this.isDashboard);
      
      this.isDashboard = this.isAtDashboard()
    })

    
  }

  ngOnInit(): void {
    // console.log(this.router.url);
    // console.log(this.isAtDashboard());
    this.isDashboard = this.isAtDashboard()
  }

  private isAtDashboard(): boolean{
    if(this.router.url == '/dashboard'){
      return true
    } else {
      // console.log("is not dash");
      
      return false
    }
  }

}
