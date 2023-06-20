import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Component({
 selector: 'app-chat',
 templateUrl: './chat.component.html',
 styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string | undefined;
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
        JSON.stringify(this.newmessage)
      );
    }
    this.newmessage = "";
  }

  showMessage(message: string) {
    this.greetings.push(message);
  }
}
