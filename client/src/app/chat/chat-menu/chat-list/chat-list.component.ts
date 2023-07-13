import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Chat } from 'src/app/models/Chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit, OnDestroy {
    chats: Chat[] = [];
    private subscription: Subscription | undefined;
    protected _unsubscribe$: Subject<void> = new Subject();

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        this.getAllChats();
        this.subscribeToSharedArray();
    }

    ngOnDestroy(): void {
        this.subscription!.unsubscribe();
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    getAllChats(): void {
        this.chatService
            .getAllChats()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((chats) => (this.chats = chats));
    }

    remove(id: string): void {
        this.chatService.removeChat(id);
        this.chats = this.chats.filter((chat) => chat._id !== id);
    }

    isOwnedByCurrentUser(chat: Chat): boolean {
        return chat.owner.email == localStorage.getItem('user');
    }

    private subscribeToSharedArray(): void {
        this.subscription = this.chatService.dataArray$.subscribe((chats) => {
            this.chats = chats;
        });
    }
}
