import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UploadImageComponent } from '../dialog/upload-image/upload-image.component';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    protected unsubscribe$ = new Subject<void>();
    user: any;
    ImageUrl: any;

    constructor(private userService: UserService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.getUser();
        //this.getUserImage(this.user.username)
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public getUser(): void {
        this.userService.getUser().subscribe((user) => {
            this.user = user;
            this.getUserImage(user.username);
        });
    }

    public getUserImage(username: string): void {
        this.userService
            .getUserImage(username)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((imageUrl) => {
                this.createImageFromBlob(imageUrl);
            });
    }

    handleChangePasswordAction() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '550px';
        this.dialog.open(ChangePasswordComponent, dialogConfig);
    }

    handleUploadImageAction() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '550px';
        this.dialog.open(UploadImageComponent, dialogConfig);
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                this.ImageUrl = reader.result;
            },
            false
        );

        if (image) {
            reader.readAsDataURL(image);
        }
    }
}
