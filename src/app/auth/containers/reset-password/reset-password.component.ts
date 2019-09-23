import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ResetRequest } from '../../models/reset-password.model';
import { matchPassword } from '../../../utils/validators/match-password';
import { AlertifyService } from '../../../core/services/alertify.service';
import { ErrorCodes } from '../../../core/enums/error-code.enum';

enum FormControlNames {
  PASSWORD = 'password',
  PASSWORD_AGAIN = 'passwordagain'
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetForm: FormGroup;
  invalidCredentials = false;
  resetError = false;
  submitted = false;
  formControlNames = FormControlNames;
  errorCodes = ErrorCodes;
  pathString: string;
  token: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private resetAuth: ResetRequest;

  constructor(
    location: Location,
    private alertify: AlertifyService,
    private resetService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) {
    this.pathString = location.path();
  }

  ngOnInit() {
    const indexNumber = this.pathString.indexOf('=');
    this.token = this.pathString.substring(indexNumber + 1);

    this.resetForm = this.formBuilder.group({
      [FormControlNames.PASSWORD]: ['', [Validators.required, Validators.minLength(6)]],
      [FormControlNames.PASSWORD_AGAIN]: ['', [Validators.required]]
    },
      {
        validator: abstractControl => matchPassword(
          abstractControl,
          FormControlNames.PASSWORD,
          FormControlNames.PASSWORD_AGAIN
        )
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.resetForm.valid) {
      this.invalidCredentials = false;
      this.resetError = false;
      this.resetAuth = {
        newPassword: this.resetForm.value[FormControlNames.PASSWORD],
        token: this.token
      };
      this.resetService
        .reset(this.resetAuth)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.router.navigate(['/']);
          this.translate
            .get('alertify.success.user.reset')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(
              translation => {
                this.alertify.success(translation);
              });
        }, error => {
          if (error.error.error.errorCodes === this.errorCodes.UserNotFound) {
            this.invalidCredentials = true;
          } else {
            this.resetError = true;
          }
        });
    }
  }
}
