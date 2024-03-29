import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Chat, ChatForm } from 'src/app/models/Chat';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-chat-form',
    templateUrl: './chat-form.component.html',
    styleUrls: ['./chat-form.component.css'],
})
export class ChatFormComponent implements OnInit, OnDestroy {
    protected _unsubscribe$: Subject<void> = new Subject();
    chatForm!: FormGroup;
    allUsers: User[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private chatService: ChatService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.chatForm = this.formBuilder.group({
            title: new FormControl(),
            users: new FormControl(),
            private: new FormControl(),
        });
        this.getAllUsers();
        this.subscribeToCreatedChat();
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    onSubmit() {
        let chatData: ChatForm = {
            title: this.chatForm.value.title,
            participants: [],
            isPrivate: this.chatForm.value.private,
        };

        chatData.participants.push(this.chatForm.value.users);
        chatData.participants.push(`${localStorage.getItem('user')}`);

        this.chatService.createNewChat(chatData);
    }

    getAllUsers(): void {
        this.userService
            .getAllMinUsers()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((users) => (this.allUsers = users));
    }

    private subscribeToCreatedChat(): void {
        this.chatService.createdChat$
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((newChat) => {
                this.chatService.addToSharedArray(newChat);
            });
    }
}
