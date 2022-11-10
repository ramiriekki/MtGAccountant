import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    login_name: '',
    password: ''
  };
  submitted = false;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    const data = {
      login_name: this.user.login_name,
      email: this.user.email,
      password: this.user.password
    };

    this.serverService.loginUser(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

}
