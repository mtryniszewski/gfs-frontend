
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RestService } from '../../core/services/rest.service';
import { LoginRequest, TokenRequest } from '../models/login.model';
import { TokenService } from '../../core/services/token.service';
import { ForgotPasswordRequest } from '../models/forgot-password.model';
import { RegisterRequest } from '../models/register.model';
import { ResetRequest } from '../models/reset-password.model';
import { ActivateAccountRequest } from '../models/activate-account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private restService: RestService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  login(userAuth: LoginRequest): Observable<TokenRequest> {
    return this.restService.post<LoginRequest, TokenRequest>('/auth/login', userAuth, false)
      .pipe(
        tap(
          (resp: TokenRequest) => {
            this.tokenService.setToken(resp.data.token.toString());
          }
        )
      );
  }

  reset(resetAuth: ResetRequest): Observable<void> {
    return this.restService.patch<ResetRequest, void>('/User/resetpassword', resetAuth, false);
  }

  forgotPassword(userMail: ForgotPasswordRequest): Observable<void> {
    return this.restService.post<ForgotPasswordRequest, void>('/user/forgotpassword', userMail, false);
  }

  register(registerUser: RegisterRequest): Observable<void> {
    return this.restService.post<RegisterRequest, void>('/user', registerUser, false);
  }


activateAccount(activateAccount: ActivateAccountRequest): Observable<void> {
  return this.restService.post<ActivateAccountRequest, void>('/user/activateaccount', activateAccount, false);
}
  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/#/auth/login']);
  }
}
