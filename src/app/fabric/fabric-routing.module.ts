import { LoggedInGuard } from './../core/guards/logged-in.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './../core/guards/admin.guard';

import { EditFabricComponent } from './components/edit-fabric/edit-fabric.component';
import { FabricsListComponent } from './components/fabrics-list/fabrics-list.component';
import { NewFabricComponent } from './components/new-fabric/new-fabric.component';

const routes: Routes = [
  {
    path: 'fabrics-list',
    component: FabricsListComponent,
    canActivate: [AdminGuard, LoggedInGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricRoutingModule { }
