import { AdminGuard } from './../core/guards/admin.guard';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './containers/users-list/users-list.component';
import { EditProfileComponent } from './containers/edit-profile/edit-profile.component';
import { LoggedInGuard } from '../core/guards/logged-in.guard';
import { UserOrdersListComponent } from './containers/user-orders-list/user-orders-list.component';

const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'orders/:id',
    component: UserOrdersListComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
