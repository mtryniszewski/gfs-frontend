import { DeleteAccountComponent } from './../delete-account/delete-account.component';
import { ChangePasswordComponent } from './../change-password/change-password.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditUserRequest } from '../../models/user.model';
import { ErrorCodes } from 'src/app/core/enums/error-code.enum';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from '../../services/user.service';
import { TokenService } from 'src/app/core/services/token.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { parseErrorResponse } from 'src/app/utils/functions/parse-error-response';
import { Router } from '@angular/router';


enum FormControlNames {
  NAME = 'name',
  SURNAME = 'surname',
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit, OnDestroy {

  @ViewChild('changePassword') changePassword: ChangePasswordComponent;
  @ViewChild('deleteAccount') deleteAccount: DeleteAccountComponent;

  destroy$: Subject<boolean> = new Subject<boolean>();
  editForm: FormGroup;
  invalidCredentials = false;
  editUserError = false;
  getUserError = false;
  formControlNames = FormControlNames;
  userAuth: EditUserRequest;
  errorCodes = ErrorCodes;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private modalService: ModalService,
    private translate: TranslateService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.editForm = this.formBuilder.group({
      [FormControlNames.NAME]: [
        '',
        [Validators.required, Validators.maxLength(20)]
      ],
      [FormControlNames.SURNAME]: [
        '',
        [Validators.required, Validators.maxLength(40)]
      ]
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getUserId(): string {
    return this.tokenService.getDecodedToken().sub[3];
  }

  getUser() {
    this.getUserError = false;
    this.userService
      .getUser(this.getUserId())
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        user => {
          this.setFormValue(user.data);
        },
        () => {
          this.getUserError = true;
        }
      );
  }

  onEditUserSubmit() {
    if (this.editForm.valid) {
      this.invalidCredentials = false;
      this.editUserError = false;
      this.userAuth = {
        id: this.getUserId(),
        surname: this.editForm.value[FormControlNames.SURNAME],
        name: this.editForm.value[FormControlNames.NAME]
      };
      this.userService
        .editUser(this.userAuth)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.translate
              .get('alertify.success.credentialChange')
              .pipe(takeUntil(this.destroy$))
              .subscribe(translation => {
                this.alertify.success(translation);
              });
            this.router.navigate(['/user/orders/' + this.getUserId()]);
          },
          (errorResponse: HttpErrorResponse) => {
            const response = parseErrorResponse(errorResponse);
            if (response.error && response.error.errorCode === this.errorCodes.UserNotFound) {
              this.invalidCredentials = true;
            } else {
              this.editUserError = true;
            }
          }
        );
    }
  }

  setFormValue(user: EditUserRequest) {
    this.editForm.setValue({
      [FormControlNames.NAME]: user.name,
      [FormControlNames.SURNAME]: user.surname
    });
  }

  openChangePasswordModal() {
    this.changePassword.userId = this.getUserId();
    this.modalService.open(ChangePasswordComponent.ModalName);
  }

  openDeleteAccountModal() {
    this.modalService.open(DeleteAccountComponent.ModalName);
    this.deleteAccount.userId = this.getUserId();
  }
}
