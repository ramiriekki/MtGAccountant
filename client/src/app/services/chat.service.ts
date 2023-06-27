import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllChats(): Observable<Chat[]>{
    return this.httpClient.get<Chat[]>(this.url + "/api/chat/all")
  }

  createNewChat(data: any) {
    try {
      return this.httpClient.post(this.url + `/api/chat/new`, data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe()
    } catch (error) {
      console.log(error);
      return null
    }
  }

  getChat(id: string) {
    return this.httpClient.get<Chat>(this.url + `/api/chat/get?id=${id}`)
  }

  sendMessage(message: Message) {
    try {
      return this.httpClient.post(this.url + `/api/chat/registerMessage`, message, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe()
    } catch (error) {
      console.log(error);
      return null
    }
  }

  removeChat(id: string) {
    try {
      return this.httpClient.delete(this.url + `/api/chat/remove?id=${id}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe()
    } catch (error) {
      console.log(error);
      return null
    }
  }
}
