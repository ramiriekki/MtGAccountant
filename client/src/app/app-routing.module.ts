import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './home/home.component';
import { SetsComponent } from './sets/sets.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'cards', component: CardsComponent},
  {path: 'cards/:card', component: CardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sets', component: SetsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
