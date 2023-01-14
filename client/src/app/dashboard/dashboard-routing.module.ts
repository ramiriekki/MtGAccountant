import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetsComponent } from '../sets/sets.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:
      [
        {path: '', component: SetsComponent}
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
