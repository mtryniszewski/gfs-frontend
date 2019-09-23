import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './../core/guards/admin.guard';

import { ProducersListComponent } from './components/producers-list/producers-list.component';

const routes: Routes = [
  {
    path: 'producers-list',
    component: ProducersListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: 'producers-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerRoutingModule { }
