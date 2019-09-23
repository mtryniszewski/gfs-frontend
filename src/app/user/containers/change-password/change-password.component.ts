import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorCodes } from 'src/app/core/enums/error-code.enum';
import { EditPasswordRequest } from '../../models/user.model';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { UserService } from '../../services/user.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { matchPassword } from 'src/app/utils/validators/match-password';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { parseErrorResponse } from 'src/app/utils/functions/parse-error-response';

enum FormControlNames {
  OLD_PASSWORD = 'oldPassword',
  NEWPASSWORD = 'newPassword',
  REPEAT_PASSWORD = 'repeatPassword'
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  static ModalName = 'changePassword';
  destroy$: Subject<boolean> = new Subject<boolean>();
  modalName = ChangePasswordComponent.ModalName;
  passwordForm: FormGroup;
  formControlNames = FormControlNames;
  editPasswordError = false;
  invalidCredentials = false;
  errorCodes = ErrorCodes;
  userId: string;

  private editPasswordAuth: EditPasswordRequest;

  constructor(
    private alertify: AlertifyService,
    private userService: UserService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group(
      {
        [FormControlNames.OLD_PASSWORD]: [
          '',
          [Validators.required, Validators.minLength(6)]
        ],
        [FormControlNames.NEWPASSWORD]: [
          '',
          [Validators.required, Validators.minLength(6)]
        ],
        [FormControlNames.REPEAT_PASSWORD]: [
          '',
          [Validators.required, Validators.minLength(6)]
        ]
      },
      {
        validator: abstractControl =>
          matchPassword(
            abstractControl,
            FormControlNames.NEWPASSWORD,
            FormControlNames.REPEAT_PASSWORD
          )
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onEditPasswordSubmit() {
    if (this.passwordForm.valid) {
      this.invalidCredentials = false;
      this.editPasswordError = false;
      this.editPasswordAuth = new EditPasswordRequest();
      {
        this.editPasswordAuth.id = this.userId;
        this.editPasswordAuth.oldPassword = this.passwordForm.value.oldPassword;
        this.editPasswordAuth.newPassword = this.passwordForm.value.newPassword;
      }
      this.userService
        .changePassword(this.editPasswordAuth)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.translate
              .get('alertify.success.user.changedPassword')
              .pipe(takeUntil(this.destroy$))
              .subscribe(translation => {
                this.alertify.success(translation);
              });
            this.authService.logout();
          },
          (errorResponse: HttpErrorResponse) => {
            const response = parseErrorResponse(errorResponse);
            if (response.error && response.error.errorCode === this.errorCodes.WrongPassword) {
              this.invalidCredentials = true;
            } else {
              this.editPasswordError = true;
            }
          }
        );
    }
  }

  closeModal() {
    this.modalService.close(this.modalName);
  }
}

