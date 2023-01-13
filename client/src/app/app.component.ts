import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
  }

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

}
