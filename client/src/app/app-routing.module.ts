import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SetsComponent } from './sets/sets.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'cards', component: CardsComponent, canActivate: [AuthGuard]},
  {path: 'cards/:card', component: CardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sets', component: SetsComponent, canActivate: [AuthGuard]},
  {path: 'sets/:set', component: CardsComponent, canActivate: [AuthGuard]},
  {path: 'home/register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'home/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
