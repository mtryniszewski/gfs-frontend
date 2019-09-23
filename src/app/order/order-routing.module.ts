import { OrderAdminDetailsComponent } from './components/order-admin-details/order-admin-details.component';
import { AdminGuard } from './../core/guards/admin.guard';
import { LoggedInGuard } from './../core/guards/logged-in.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { StandardGuard } from '../core/guards/standard.guard';
import { NewFurnitureComponent } from './components/new-furniture/new-furniture.component';

const routes: Routes = [
  {
    path: 'orders-list',
    component: OrdersListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/new-furniture',
    component: NewFurnitureComponent,
    canActivate: [StandardGuard]
  },
  {
    path: 'details/:id',
    component: OrderAdminDetailsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '',
    redirectTo: 'orders-list',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
