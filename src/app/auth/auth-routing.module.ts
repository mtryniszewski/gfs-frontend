import { HomeModule } from './../home/home.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { ActivateAccountComponent } from './containers/activate-account/activate-account.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'activate', component: ActivateAccountComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
