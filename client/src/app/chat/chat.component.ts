import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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
  private stompClient: Stomp.Client | undefined;

  constructor(){

  }

  ngOnInit() {
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/testchat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      if (_this.stompClient){
        _this.stompClient.subscribe('/start/initial', function(hello){
          console.log(JSON.parse(hello.body));
          _this.showMessage(JSON.parse(hello.body));
        });
      }
   });
  }

  sendMessage() {
    if(this.stompClient) {
      this.stompClient.send(
        '/current/resume',
        {},
        JSON.stringify(this.newMessage)
      );
    }
    this.newMessage = "";
  }

  showMessage(message: string) {
    this.greetings.push(message);
  }
}
