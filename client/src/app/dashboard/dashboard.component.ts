import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    protected _unsubscribe$: Subject<void> = new Subject();
    isDashboard!: boolean;
    user: any;
    role!: string | null;
    isProgLoading: boolean = true;
    isTopCardLoading: boolean = true;
    routerEvent: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private loaderService: LoaderService
    ) {
        router.events.subscribe((val) => {
            this.isDashboard = this.isAtDashboard();
        });

        this.routerEvent = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.isProgLoading = true;
                this.isTopCardLoading = true;
            }
        });
    }

    ngOnInit(): void {
        this.isDashboard = this.isAtDashboard();
        this.getUser();
        this.role = localStorage.getItem('role');
        this.isProgLoading = true;
        this.isTopCardLoading = true;

        this.loaderService.progLoad
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((emitedValue) => {
                this.isProgLoading = emitedValue;
            });
        this.loaderService.topCardLoad
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((emitedValue) => {
                this.isTopCardLoading = emitedValue;
            });
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
        this.routerEvent.unsubscribe();
    }

    private isAtDashboard(): boolean {
        return this.router.url == '/dashboard';
    }

    getUser(): void {
        this.userService
            .getUser()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((user) => (this.user = user));
    }

    isAdmin(): boolean {
        if (this.user?.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }
}
