import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SetsComponent } from '../sets/sets.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { SetComponent } from '../set/set.component';
import { CardsComponent } from '../cards/cards.component';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';
import { ResultsComponent } from '../results/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AdminComponent } from '../admin/admin.component';
import { QuickMoveComponent } from '../shared/quick-move/quick-move.component';
import { SortTabsComponent } from '../shared/sort-tabs/sort-tabs.component';
import { BinderModifyComponent } from '../set/binder-modify/binder-modify.component';
import { TopCardComponent } from './top-card/top-card.component';
import { ProgressListComponent } from './progress-list/progress-list.component';
import { RouteReuseStrategy } from '@angular/router';
import { mtgRouteResuseStrategy } from '../strategies/mtgRouteReuseStrategy';
import { ChatComponent } from '../chat/chat.component';
import { UploadImageComponent } from '../dialog/upload-image/upload-image.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    SetsComponent,
    DashboardComponent,
    SetComponent,
    CardsComponent,
    CardComponent,
    SearchComponent,
    ResultsComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AdminComponent,
    QuickMoveComponent,
    SortTabsComponent,
    BinderModifyComponent,
    TopCardComponent,
    ProgressListComponent,
    UploadImageComponent,
    MainNavigationComponent,
    //ChatComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
