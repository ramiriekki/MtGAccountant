import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isDashboard!: boolean
  user: any
  role!: string | null

  constructor(
    private router: Router,
    private userService: UserService
    ) {
    router.events.subscribe((val) => {
      // console.log(this.isDashboard);

      this.isDashboard = this.isAtDashboard()
    })
  }

  ngOnInit(): void {
    // console.log(this.router.url);
    // console.log(this.isAtDashboard());
    this.isDashboard = this.isAtDashboard()
    this.getUser()
    this.role = localStorage.getItem('role')
  }

  private isAtDashboard(): boolean{
    if(this.router.url == '/dashboard'){
      return true
    } else {
      // console.log("is not dash");

      return false
    }
  }

  getUser(): void{
    this.userService.getUser().subscribe(user => this.user = user)
  }

  isAdmin(): boolean {
    if (this.user.role === "admin") {
      return true;
    } else {
      return false
    }
  }

}
