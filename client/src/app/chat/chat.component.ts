import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../models/Chat';
import { ChatService } from '../services/chat.service';
@Component({
 selector: 'app-chat',
 templateUrl: './chat.component.html',
 styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newMessage: string | undefined;
  chatData!: Chat;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
  ){
  }

  ngOnInit() {
    this.getCard()
  }

  getCard(): void{
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.chatService.getChat(id).subscribe(chat => this.chatData = chat)
  }

}
