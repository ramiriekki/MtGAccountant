import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { CardsComponent } from '../cards/cards.component';
import { SetComponent } from '../set/set.component';
import { SetsComponent } from '../sets/sets.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:
      [
        {path: 'sets', component: SetsComponent},
        {path: 'collection', component: CardsComponent},
        {path: 'sets/:set', component: SetComponent},
        {path: 'collection/:id', component: CardComponent}
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
