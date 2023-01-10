import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', /*component: DashboardComponent, canActivate: [AuthGuard],*/ children:
      [
        // {path: 'collection', component: [component], pathMatch: 'full'},
        // {path: 'account', component: [component]}
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
