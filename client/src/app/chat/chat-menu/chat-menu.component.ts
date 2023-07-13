import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat-menu',
    templateUrl: './chat-menu.component.html',
    styleUrls: ['./chat-menu.component.css'],
})
export class ChatMenuComponent implements OnInit {
    isCommunityView: boolean = true;

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            this.isCommunityView = this.isAtCommunityView();
        });
    }

    ngOnInit(): void {
        this.isCommunityView = this.isAtCommunityView();
    }

    isAtCommunityView(): boolean {
        return this.router.url === '/dashboard/community';
    }
}
