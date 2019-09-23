import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { ActivateAccountComponent } from './containers/activate-account/activate-account.component';
@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ActivateAccountComponent
  ]
})

export class AuthModule { }
