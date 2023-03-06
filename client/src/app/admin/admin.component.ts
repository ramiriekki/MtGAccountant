import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'status', 'role', 'actions'];
  users: any[] = []
  userStatus: string = ""

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void{
    this.userService.getAllUsers().subscribe(users => this.users = users)
  }

  changeStatus(email: string, status: string): void {
    if (status === "true") {
      this.userStatus = "false"
    } else {
      this.userStatus = "true"
    }

    let data = {
      email: email,
      status: this.userStatus
    }

    this.userService.changeStatus(data).subscribe()
    // This is needed for updating the view
    for (const element of this.users) {
      if(element.email == email){
        element.status = this.userStatus
      }
    }
  }
}
