import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login.model';
import { AlertifyService } from '../../../core/services/alertify.service';
import { ErrorCodes } from '../../../core/enums/error-code.enum';
import { TokenService } from 'src/app/core/services/token.service';

enum FormControlNames {
  EMAIL_ADDRESS = 'email',
  PASSWORD = 'password'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorEvent = false;
  loginForm: FormGroup;
  errorEmail = false;
  errorPassword = false;
  loginError = false;
  accountNotActive = false;
  errorCodes = ErrorCodes;
  formControlNames = FormControlNames;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private userAuth: LoginRequest;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertify: AlertifyService,
    private translate: TranslateService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      [FormControlNames.EMAIL_ADDRESS]: ['', [Validators.required, Validators.email]],
      [FormControlNames.PASSWORD]: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getSuccessLoginRedirectUrl(): string {

    if (this.tokenService.isToken()) {
      if (this.tokenService.getDecodedToken()[`Permissions`] === 'Admin') {
        return '/order/orders-list';
      }

      if (this.tokenService.getDecodedToken()[`Permissions`] === 'Standard') {
        return 'user/orders/' + this.tokenService.getDecodedToken().sub[3];
      }
    }
    return '/auth/login';
  }
  onFormSubmit() {
    if (this.loginForm.valid) {
      this.errorEvent = false;
      this.errorEmail = false;
      this.accountNotActive = false;
      this.errorPassword = false;
      this.loginError = false;
      this.userAuth = this.loginForm.value;
      this.authService
        .login(this.userAuth)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.router.navigate([this.getSuccessLoginRedirectUrl()]);
          this.translate
            .get('alertify.success.welcome')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(translation => {
              this.alertify.success(translation);
            });
        }, error => {
          this.errorEvent = true;
          if (error.error.type === 'error') {
            this.loginError = true;
          } else {
            if (error.error.error.errorCode === this.errorCodes.WrongPassword) {
              this.errorPassword = true;
            } else if (error.error.error.errorCode === this.errorCodes.WrongEmail) {
              this.errorEmail = true;
            } else if (error.error.error.errorCode === this.errorCodes.AccountNotActive) {
              this.accountNotActive = true;
            } else {
              this.loginError = true;
            }
          }
        });
    }
  }
}
