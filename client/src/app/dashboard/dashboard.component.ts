import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  isProgLoading: boolean = true
  isTopCardLoading: boolean = true
  routerEvent: any

  constructor(
    private router: Router,
    private userService: UserService,
    private loaderService: LoaderService,
    ) {
    router.events.subscribe((val) => {
      this.isDashboard = this.isAtDashboard()
    })

    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isProgLoading = true;
        this.isTopCardLoading = true;
      }
    });
  }

  ngOnInit(): void {
    this.isDashboard = this.isAtDashboard()
    this.getUser()
    this.role = localStorage.getItem('role')
    this.isProgLoading = true
    this.isTopCardLoading = true

    this.loaderService.progLoad.subscribe(emitedValue => {
      this.isProgLoading = emitedValue;
    });
    this.loaderService.topCardLoad.subscribe(emitedValue => {
      this.isTopCardLoading = emitedValue;
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
    if (this.user?.role === "admin") {
      return true;
    } else {
      return false
    }
  }

  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }
}
