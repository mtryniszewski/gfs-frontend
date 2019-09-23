import { FabricArchivesComponent } from './components/fabric-archives/fabric-archives.component';
import { LoggedInGuard } from './../core/guards/logged-in.guard';
import { AdminGuard } from './../core/guards/admin.guard';
import { NgModule } from '@angular/core';
import { ProducerArchivesComponent } from './components/producer-archives/producer-archives.component';
import { UserArchivesComponent } from './components/user-archives/user-archives.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'producers-list',
    component: ProducerArchivesComponent,
    canActivate: [AdminGuard, LoggedInGuard]
  },
  {
    path: 'fabrics-list',
    component: FabricArchivesComponent,
    canActivate: [AdminGuard, LoggedInGuard]
  },
  {
    path: 'users-list',
    component: UserArchivesComponent,
    canActivate: [AdminGuard, LoggedInGuard]
  },
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivesRoutingModule { }
