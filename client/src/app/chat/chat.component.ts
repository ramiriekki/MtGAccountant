import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { interval, Subject, takeUntil } from 'rxjs';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import { MinimalUser } from '../models/User';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
    disabled = true;
    newMessage: string | undefined;
    chatData!: Chat | undefined;
    messageForm!: FormGroup;
    user: any;
    images: any[] = [];
    protected _unsubscribe$: Subject<void> = new Subject();

    constructor(
        private chatService: ChatService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService
    ) {}

    async ngOnInit() {
        this.messageForm = this.formBuilder.group({
            message: new FormControl(),
        });

        await this.getChat().then(() => {});

        interval(5000)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(() => {
                this.getChat();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    async getChat(): Promise<void> {
        const id = String(this.route.snapshot.paramMap.get('id'));
        this.chatService
            .getChat(id)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((chat) => {
                this.chatData = chat;
                this.getUser();
                // this.chatData!.participants.forEach((user) => {
                // });
            });
    }

    sendMessage(): void {
        let message: Message = {
            content: this.messageForm.value.message,
            timeSent: new Date(),
            user: this.user,
            chatId: this.route.snapshot.paramMap.get('id'),
        };

        this.chatService.sendMessage(message);

        if (this.chatData)
            this.chatData.messages = [...this.chatData.messages!, message];
        this.changeDetectorRef.detectChanges();
    }

    getUser(): void {
        this.userService
            .getUser()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((user) => {
                this.user = user;
                this.getUserImage(user.username);
                this.chatData!.participants.forEach((user) => {
                    this.getUserImage(user.username);
                });
            });
    }

    isCurrentUser(user: MinimalUser): boolean {
        return user.email === localStorage.getItem('user');
    }

    public getUserImage(username: string): void {
        this.userService
            .getUserImage(username)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((imageUrl) => {
                this.createImageFromBlob(imageUrl, username);
            });
    }

    createImageFromBlob(image: Blob, username: string) {
        let reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                this.images.push({ image: reader.result, username: username });
            },
            false
        );

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    findUserImage(username: string): string {
        return this.images.find((image) => image.username === username).image;
    }

    // TODO: public endpoint for getting all chats users images to {usename, image} array
}
