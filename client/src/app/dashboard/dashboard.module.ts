import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SetsComponent } from '../sets/sets.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { SetComponent } from '../set/set.component';
import { CardsComponent } from '../cards/cards.component';
import { CardComponent } from '../card/card.component';


@NgModule({
  declarations: [
    SetsComponent,
    DashboardComponent,
    SetComponent,
    CardsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule

  ]
})
export class DashboardModule { }
