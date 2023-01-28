import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';

// import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  role: any
  @Output() signChange = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
    ){}

  ngOnInit(): void {
    // Check on default page if user is signed in (has token).
    // If token exist, reroute the user back to dashboard.
    this.userService.checkToken().subscribe((response: any) => {
      this.router.navigate(['/dashboard'])
    }, (error: any) => {
      console.log(error);
    })

    if (localStorage.getItem('user')){
      this.signChange.emit(true);
    } else {
      this.signChange.emit(false);
    }
  }

  // Create dialog windows
  handleSignupAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(RegisterComponent, dialogConfig)
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
    })
  }

  title = 'client';
  showFiller = false;
}
