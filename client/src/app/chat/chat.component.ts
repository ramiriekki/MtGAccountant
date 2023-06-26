import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
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
  messageForm!: FormGroup

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
  }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: new FormControl(),
    })
    this.getCard()
  }

  getCard(): void{
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.chatService.getChat(id).subscribe(chat => this.chatData = chat)
  }

  sendMessage():void {
    console.log(this.messageForm);
    let message: Message = {
      content: this.messageForm.value.message,
      timeSent: new Date,
      chatId: this.route.snapshot.paramMap.get('id')
    }

    this.chatService.sendMessage(message)
  }

}
