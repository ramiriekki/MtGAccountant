import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
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
  isProgLoading: any

  constructor(
    private router: Router,
    private userService: UserService,
    private loaderService: LoaderService,
    ) {
    router.events.subscribe((val) => {
      this.isDashboard = this.isAtDashboard()
    })
  }

  ngOnInit(): void {
    this.isDashboard = this.isAtDashboard()
    this.getUser()
    this.role = localStorage.getItem('role')
    this.isProgLoading = true

    this.loaderService.progLoad.subscribe(emitedValue => {
      this.isProgLoading = emitedValue;
   });
  }

  private isAtDashboard(): boolean{
    if(this.router.url == '/dashboard'){
      return true
    } else {
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

  test(): void {
    console.log("asdsafa");

    console.log(this.isProgLoading);

  }
}
