import { AdminGuard } from './guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogoutGuard } from './guards/logout.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { StandardGuard } from './guards/standard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './../auth/auth.module#AuthModule',
    canActivate: [LogoutGuard]
  },
  {
    path: 'user',
    loadChildren: './../user/user.module#UserModule',
    canActivate: [LoggedInGuard]
  },
  {
    path: 'order',
    loadChildren: './../order/order.module#OrderModule',
    canActivate: [LoggedInGuard]
  },
  {
    path: 'fabric',
    loadChildren: './../fabric/fabric.module#FabricModule',
    canActivate: [AdminGuard, LoggedInGuard]
  },
  {
    path: 'producer',
    loadChildren: './../producer/producer.module#ProducerModule',
    canActivate: [AdminGuard, LoggedInGuard]
  },
  {
    path: 'archives',
    loadChildren: './../archives/archives.module#ArchivesModule',
    canActivate: [AdminGuard, LoggedInGuard]
  },

  {
    path: 'home',
    loadChildren: './../home/home.module#HomeModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class CoreRoutingModule { }
