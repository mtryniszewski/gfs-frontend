import { LoggedInGuard } from './../core/guards/logged-in.guard';
import { HelpComponent } from './help/help.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component'
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
