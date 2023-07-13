import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'id',
        'username',
        'email',
        'status',
        'role',
        'change_status',
        'remove',
    ];
    users: any[] = [];
    userStatus: string = '';
    private unsubscribe$ = new Subject<void>();

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.getAllUsers();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getAllUsers(): void {
        this.userService
            .getAllUsers()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((users) => (this.users = users));
    }

    changeStatus(email: string, status: string): void {
        this.userStatus = status === 'true' ? 'false' : 'true';

        let data = {
            email: email,
            status: this.userStatus,
        };

        this.userService
            .changeStatus(data)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                // Update the user's status in the local array
                const user = this.users.find(
                    (element) => element.email === email
                );
                if (user) {
                    user.status = this.userStatus;
                }
            });
    }

    // TODO: refresh the data
    removeUser(email: string): void {
        this.userService
            .removeUser(email)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => console.log('Delete successful'));
    }
}
