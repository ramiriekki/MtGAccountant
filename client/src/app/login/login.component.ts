import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-comstants';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide = true
  loginForm: any = FormGroup
  responseMessage: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
    ){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
        password:[null, [Validators.required]]
      })
  }

  handleSubmit(){
    let user

    this.ngxService.start()
    let formData = this.loginForm.value
    let data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe((response:any) => {
      this.ngxService.stop()
      this.dialogRef.close()
      localStorage.setItem('token', response.token) 
      localStorage.setItem('user', this.getDecodedAccessToken(response.token).sub) 

      user = this.getDecodedAccessToken(response.token).sub
      console.log(user)

      this.router.navigate(['/dashboard']) // TODO /dashboard
      //this.router.navigateByUrl(`/dashboard`);
    }, (error) => {
      if(error.error?.message){
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError
      }

      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
