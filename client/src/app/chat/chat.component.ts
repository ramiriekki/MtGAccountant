import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import { MinimalUser } from '../models/User';
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
  ){}

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: new FormControl(),
    })

    this.getChat()
    this.getUser()

    interval(5000).subscribe(() => {
      this.getChat();
  });
  }

  getChat(): void {
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.chatService.getChat(id).subscribe(chat => this.chatData = chat)
  }

  sendMessage(): void {

    let message: Message = {
      content: this.messageForm.value.message,
      timeSent: new Date,
      user: this.user,
      chatId: this.route.snapshot.paramMap.get('id')
    }

    this.chatService.sendMessage(message)
    this.chatData.messages = [...this.chatData.messages!, message];
    this.changeDetectorRef.detectChanges()
  }

  getUser(): void{
    this.userService.getUser().subscribe(user => this.user = user)
  }

  isCurrentUser(user: MinimalUser): boolean {
    if (user.email == localStorage.getItem('user')) {
      return true
    }

    return false
  }

  refresh(): void {
    setTimeout(() => {
      console.log('refresh');

      this.getChat()
      this.chatData.messages = [...this.chatData.messages!];
  }, 2000);
  }

}
