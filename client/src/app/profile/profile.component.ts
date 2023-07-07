import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  ImageUrl: any

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser()
    //this.getUserImage(this.user.username)
  }

  public getUser(): void{
    this.userService.getUser().subscribe(user => {
      this.user = user
      this.getUserImage(user.username)
    })
  }

  public getUserImage(username: string): void{
    this.userService.getUserImage(username).subscribe(imageUrl => {
      console.log(username);

      this.createImageFromBlob(imageUrl);
      console.log(this.ImageUrl);
    });
  }

  handleChangePasswordAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(ChangePasswordComponent, dialogConfig)
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.ImageUrl = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
