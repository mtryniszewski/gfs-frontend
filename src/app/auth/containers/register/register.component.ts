import { RegisterRequest } from './../../models/register.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { matchPassword } from '../../../utils/validators/match-password';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../../core/services/alertify.service';
import { ErrorCodes } from '../../../core/enums/error-code.enum';
enum FormControlNames {
  NAME = 'name',
  SURNAME = 'surname',
  EMAIL_ADDRESS = 'email',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  errorEvent = false;
  registerForm: FormGroup;
  invalidCredentials = false;
  registerError = false;
  userExists = false;
  formControlNames = FormControlNames;
  errorCode = ErrorCodes;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private userAuth: RegisterRequest;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      [FormControlNames.NAME]: ['', [Validators.required, Validators.maxLength(20)]],
      [FormControlNames.SURNAME]: ['', [Validators.required, Validators.maxLength(40)]],
      [FormControlNames.EMAIL_ADDRESS]: ['', [Validators.required, Validators.email]],
      [FormControlNames.PASSWORD]: ['', [Validators.required, Validators.minLength(6)]],
      [FormControlNames.REPEAT_PASSWORD]: ['', [Validators.required, Validators.minLength(6)]]
    },
      {
        validator: abstractControl => matchPassword(
          abstractControl,
          FormControlNames.PASSWORD,
          FormControlNames.REPEAT_PASSWORD
        )
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.registerForm.valid) {
      this.errorEvent = false;
      this.invalidCredentials = false;
      this.registerError = false;
      this.userExists = false;
      this.userAuth = {
        email: this.registerForm.value[FormControlNames.EMAIL_ADDRESS],
        surname: this.registerForm.value[FormControlNames.SURNAME],
        name: this.registerForm.value[FormControlNames.NAME],
        password: this.registerForm.value[FormControlNames.PASSWORD],
      };
      this.authService
        .register(this.userAuth)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.router.navigate(['/']);
          this.translate
            .get('alertify.success.registerSuccess')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(
              translation => {
                this.alertify.success(translation);
              });
        },
          error => {
            this.errorEvent = true;
            if (error.error.error.errorCode === this.errorCode.UserExists) {
              this.userExists = true;
            } else {
              this.invalidCredentials = true;
            }
          });
    }

  }

}
