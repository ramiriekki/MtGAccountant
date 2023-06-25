import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    //path: '', component: ChatComponent,
    path: '', component: ChatMenuComponent, children:
      []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
