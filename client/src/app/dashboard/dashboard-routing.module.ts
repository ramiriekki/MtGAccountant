import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetsComponent } from '../sets/sets.component';

const routes: Routes = [
  {path: '', /*component: DashboardComponent, canActivate: [AuthGuard],*/ children:
      [
        // {path: 'collection', component: [component], pathMatch: 'full'},
        // {path: 'account', component: [component]}
        {path: 'dashboard', component: SetsComponent}
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
