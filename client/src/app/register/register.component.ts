import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../server.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    login_name: '',
    email: '',
    password: '',
  };
  submitted = false;

  constructor(private serverService: ServerService) { }
  ngOnInit(): void {}

  registerUser(): void {
    const data = {
      login_name: this.user.login_name,
      email: this.user.email,
      password: this.user.password
    };

    this.serverService.registerUser(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}
