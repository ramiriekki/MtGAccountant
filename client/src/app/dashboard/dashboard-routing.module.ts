import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { CardComponent } from '../card/card.component';
import { CardsComponent } from '../cards/cards.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { SetComponent } from '../set/set.component';
import { SetsComponent } from '../sets/sets.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:
      [
        {path: 'sets', component: SetsComponent},
        {path: 'collection', component: CardsComponent},
        {path: 'search', component: SearchComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'admin-board', component: AdminComponent},
        {path: 'sets/:set', component: SetComponent},
        {path: 'collection/:id', component: CardComponent},
        {path: 'collection/page/:page', component: CardsComponent},
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
