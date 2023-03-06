import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  role: any
  isAuthenticated: boolean = false

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private location: Location
    ){}

  ngOnInit(): void {
    // Check on default page if user is signed in (has token).
    // If token exist, reroute the user back to dashboard.
    this.userService.checkToken().subscribe((response: any) => {
      this.router.navigate(['/dashboard'])
    }, (error: any) => {
      console.log(error);
    })

    this.isLoggedIn()

    window.addEventListener('storage', function(e) {

  });
  }

  back(): void {
    if (this.router.url != "/dashboard") {
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

  title = 'client';
  showFiller = false;
}
