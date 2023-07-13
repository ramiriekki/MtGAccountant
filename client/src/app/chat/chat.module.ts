import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { ChatListComponent } from './chat-menu/chat-list/chat-list.component';
import { ChatFormComponent } from './chat-menu/chat-form/chat-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        ChatComponent,
        ChatListComponent,
        ChatMenuComponent,
        ChatFormComponent,
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
            extend: true,
        }),
    ],
})
export class ChatModule {}

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
