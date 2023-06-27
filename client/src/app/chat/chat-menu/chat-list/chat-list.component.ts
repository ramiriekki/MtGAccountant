import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/models/Chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = []
  private subscription: Subscription | undefined;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getAllChats()
    this.subscribeToSharedArray();
  }

  getAllChats(): void {
    this.chatService.getAllChats().subscribe(chats => this.chats = chats)
  }

  remove(id: string): void {
    this.chatService.removeChat(id)
    this.chats = this.chats.filter((chat) => chat._id !== id);
  }

  isOwnedByCurrentUser(chat: Chat): boolean {
    if (chat.owner.email == localStorage.getItem('user')) {
      return true;
    }

    return false;
  }

  private subscribeToSharedArray(): void {
    this.subscription =   this.chatService.dataArray$.subscribe(chats => {
      this.chats = chats;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    this.subscription!.unsubscribe();
  }
}
