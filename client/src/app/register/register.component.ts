import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-comstants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  password = true
  confirmPassword  = true
  signupForm: any = FormGroup
  resposeMessage: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]]
      })
  }

  validateSubmit(){
    if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    } else {
      return false
    }
  }

  handleSubmit(){
    this.ngxService.start()
    let formData = this.signupForm.value
    let data = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    }

    this.userService.signUp(data).subscribe((response: any) => {
      this.ngxService.stop() // Stop the loading circle
      this.dialogRef.close() // Close form popup
      this.resposeMessage = response?.message
      this.snackbarService.openSnackBar(this.resposeMessage, "")
      this.router.navigate(['/'])
    }, (error) => {
      this.ngxService.stop()
      if(error.error?.message){
        this.resposeMessage = error.error?.message
      } else (
        this.resposeMessage = GlobalConstants.genericError
      )
      this.snackbarService.openSnackBar(this.resposeMessage, GlobalConstants.error)
    })
  }
}
