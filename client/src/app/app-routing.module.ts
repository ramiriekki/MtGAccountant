import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'user/dashboard/collection', component: CardsComponent},
  //{path: ':user/dashboard/collection', component: CardsComponent},
  {path: 'user', component: CardsComponent},
  {path: 'user/dashboard', component: CardsComponent},
  // {path: 'cards/:card', component: CardComponent},
  // {path: 'home', component: HomeComponent},
  // {path: 'sets', component: SetsComponent, canActivate: [AuthGuard]},
  // {path: 'sets/:set', component: CardsComponent, canActivate: [AuthGuard]},
  // {path: 'home/register', component: RegisterComponent},
  // {path: 'home/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
