import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Location } from '@angular/common'
import { filter } from 'rxjs';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  role: any
  user!: any;
  isAuthenticated: boolean = false
  isBaseLocationUrl: boolean = false;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private location: Location
    ){
      router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((val) => {
        console.log(val);
        console.log(this.router.url);
        this.isBaseLocation();
        console.log(this.isBaseLocationUrl);

      });
    }

  ngOnInit(): void {
    // Check on default page if user is signed in (has token).
    // If token exist, reroute the user back to dashboard.
    this.userService.checkToken().subscribe((response: any) => {
      //this.router.navigate(['/dashboard'])
    }, (error: any) => {
      console.log(error);
    })

    this.isBaseLocation()
    this.isLoggedIn()
    this.getUser()

    window.addEventListener('storage', function(e) {



  });
  }

  back(): void {
    if (this.router.url != "/dashboard" && this.router.url != "/home") {
      this.location.back()
    }
  }

  // Create dialog windows
  handleSignupAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(RegisterComponent, dialogConfig)
  }

  handleForgotPasswordAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(ForgotPasswordComponent, dialogConfig)
  }

  handleLoginAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(LoginComponent, dialogConfig)
  }

  handleLogoutAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      dialogRef.close()
      localStorage.clear()
      this.router.navigate(['/'])
      window.location.reload();
    })
  }

  isLoggedIn() {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  isBaseLocation() {
    console.log(this.router.url);

    if (this.router.url != "/home" && this.router.url != "/dashboard") {
      this.isBaseLocationUrl = true;
    } else {
      this.isBaseLocationUrl = false;
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

  title = 'client';
  showFiller = false;
}
