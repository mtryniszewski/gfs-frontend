import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AlertifyService } from './../../../core/services/alertify.service';
import { Location } from '@angular/common';
import { ActivateAccountRequest } from './../../models/activate-account.model';
import { ErrorCodes } from './../../../core/enums/error-code.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit, OnDestroy {

  errorEvent = false;
  userNotFoundError = false;
  activateError = false;
  errorCodes = ErrorCodes;
  pathString: string;
  token: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private activate: ActivateAccountRequest;

  constructor(
      location: Location,
      private alertify: AlertifyService,
      private activateService: AuthService,
      private router: Router,
      private translate: TranslateService
  ) {
    this.pathString = location.path();
  }

  ngOnInit() {
    const indexNumber = this.pathString.indexOf('=');
    this.token = this.pathString.substring(indexNumber + 1);
    this.activate = {
      accountActivationToken: this.token
    };
    this.activateService
    .activateAccount(this.activate)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
           this.translate
      .get('alertify.success.user.activatedAccount')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        translation => {
          this.alertify.success(translation);
        });
    }, error => {
      this.errorEvent = true;
      if (error.error.error.errorCode === this.errorCodes.UserNotFound) {
        this.userNotFoundError = true;
      } else {
          this.activateError = true;
      }
    }
  );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
