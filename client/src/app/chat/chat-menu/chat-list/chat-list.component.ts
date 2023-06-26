import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/Chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = []

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getAllChats()
  }

  getAllChats(): void {
    this.chatService.getAllChats().subscribe(chats => this.chats = chats)
  }
}
