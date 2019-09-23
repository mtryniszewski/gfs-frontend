import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ForgotPasswordRequest } from '../../models/forgot-password.model';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../core/services/alertify.service';
import { ErrorCodes } from '../../../core/enums/error-code.enum';

enum FormControlNames {
  EMAIL_ADDRESS = 'email',
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  errorEvent = false;
  forgotPassForm: FormGroup;
  formControlNames = FormControlNames;
  wrongLogin = false;
  forgotError = false;
  errorCode = ErrorCodes;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private userMail: ForgotPasswordRequest;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.forgotPassForm = this.formBuilder.group({
      [FormControlNames.EMAIL_ADDRESS]: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.forgotPassForm.valid) {
      this.errorEvent = false;
      this.wrongLogin = false;
      this.forgotError = false;
      this.userMail = this.forgotPassForm.value;
      this.authService
        .forgotPassword(this.userMail)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.router.navigate(['/login']);
          this.translate
            .get('alertify.success.mailSent')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(
              translation => {
                this.alertify.success(translation);
              });
        }, error => {
          this.errorEvent = true;
          if (error.error.error.errorCode === this.errorCode.UserNotFound) {
            this.wrongLogin = true;
          } else {
            this.forgotError = true;
          }

        });
    }
  }
}
