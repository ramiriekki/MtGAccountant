import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
@Component({
 selector: 'app-chat',
 templateUrl: './chat.component.html',
 styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  disabled = true;
  newMessage: string | undefined;
  chatData!: Chat;
  messageForm!: FormGroup
  user: any

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService
  ){
  }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: new FormControl(),
    })
    this.getChat()
    this.getUser()
  }

  getChat(): void {
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.chatService.getChat(id).subscribe(chat => this.chatData = chat)
  }

  sendMessage(): void {

    let message: Message = {
      content: this.messageForm.value.message,
      timeSent: new Date,
      chatId: this.route.snapshot.paramMap.get('id')
    }

    this.chatService.sendMessage(message)
    this.chatData.messages = [...this.chatData.messages!, message];
    this.changeDetectorRef.detectChanges()
  }

  getUser(): void{
    this.userService.getUser().subscribe(user => this.user = user)
  }

}
