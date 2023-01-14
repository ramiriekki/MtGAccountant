import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  title = 'client';
  showFiller = false;

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch(Error) {
  //     return null;
  //   }
  // }

}
