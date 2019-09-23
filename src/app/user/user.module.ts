import { OrderConfirmComponent } from './../order/components/order-confirm/order-confirm.component';
import { NewOrderComponent } from './../order/components/new-order/new-order.component';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { EditUserComponent } from './containers/edit-user/edit-user.component';
import { EditProfileComponent } from './containers/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserPermissionsComponent } from './containers/user-permissions/user-permissions.component';
import { UserArchiveComponent } from './containers/user-archive/user-archive.component';
import { UserActivateComponent } from './containers/user-activate/user-activate.component';
import { UserOrdersListComponent } from './containers/user-orders-list/user-orders-list.component';
import { OrderArchiveComponent } from '../order/components/order-archive/order-archive.component';
import { OrderEditComponent } from '../order/components/order-edit/order-edit.component';
import { DeleteAccountComponent } from './containers/delete-account/delete-account.component';


@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UsersListComponent,
    EditUserComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    UserArchiveComponent,
    UserActivateComponent,
    UserPermissionsComponent,
    UserOrdersListComponent,
    NewOrderComponent,
    OrderEditComponent,
    OrderArchiveComponent,
    OrderConfirmComponent,
    DeleteAccountComponent
  ]
})
export class UserModule { }
