import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/Chat';

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
}
