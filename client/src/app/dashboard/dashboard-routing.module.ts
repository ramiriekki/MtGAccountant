import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetComponent } from '../set/set.component';
import { SetsComponent } from '../sets/sets.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:
      [
        {path: 'sets', component: SetsComponent},
        {path: 'sets/:set', component: SetComponent}
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
