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
