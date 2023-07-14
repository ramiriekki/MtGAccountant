import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat, ChatForm } from '../models/Chat';
import { Message } from '../models/Message';
import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private dataArraySubject: BehaviorSubject<Chat[]> = new BehaviorSubject<
        Chat[]
    >([]);
    private createdChatSubject: Subject<Chat> = new Subject<Chat>();
    createdChat$: Observable<Chat> = this.createdChatSubject.asObservable();
    dataArray$ = this.dataArraySubject.asObservable();

    url = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private logger: LoggerService
    ) {}

    getAllChats(): Observable<Chat[]> {
        return this.httpClient.get<Chat[]>(this.url + '/api/chat/all');
    }

    createNewChat(chatData: ChatForm): void {
        this.httpClient
            .post<Chat>(this.url + `/api/chat/new`, chatData, {
                headers: new HttpHeaders().set(
                    'Content-Type',
                    'application/json'
                ),
            })
            .subscribe(
                (createdChat: Chat) => {
                    this.createdChatSubject.next(createdChat);
                },
                (error) => {
                    this.logger.error(error);
                }
            );
    }

    getChat(id: string) {
        return this.httpClient.get<Chat>(this.url + `/api/chat/get?id=${id}`);
    }

    sendMessage(message: Message) {
        try {
            return this.httpClient
                .post(this.url + `/api/chat/registerMessage`, message, {
                    headers: new HttpHeaders().set(
                        'Content-Type',
                        'application/json'
                    ),
                })
                .subscribe();
        } catch (error: any) {
            this.logger.error(error);
            return null;
        }
    }

    removeChat(id: string) {
        try {
            return this.httpClient
                .delete(this.url + `/api/chat/remove?id=${id}`, {
                    headers: new HttpHeaders().set(
                        'Content-Type',
                        'application/json'
                    ),
                })
                .subscribe();
        } catch (error: any) {
            this.logger.error(error);
            return null;
        }
    }

    addToSharedArray(newChat: Chat) {
        const currentArray = this.dataArraySubject.value;
        const updatedArray = [...currentArray, newChat];
        this.dataArraySubject.next(updatedArray);
    }
}
