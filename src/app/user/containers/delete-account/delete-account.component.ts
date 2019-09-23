import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertifyService } from './../../../core/services/alertify.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalComponent } from './../../../shared/components/modal/modal.component';
import { UserService } from './../../services/user.service';
import { Subject } from 'rxjs/internal/Subject';
import { UserIdRequest, User } from 'src/app/user/models/user.model';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit, OnDestroy {

  static ModalName = 'deleteAccount';
  modalName = DeleteAccountComponent.ModalName;
  userId: string;
  request: UserIdRequest;
  errorEvent = false;
  currentUser: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService,
    private userService: UserService,
    private modalService: ModalService,
    private alertify: AlertifyService,
    private translate: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  deleteAccount() {
    this.request = new UserIdRequest();
    this.request.id = this.userId;
    this.userService
      .deleteAccount(this.request)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.user.deletedAccount')
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(translation => {
            this.alertify.success(translation);
          });
        this.errorEvent = false;
        this.eventBus.publish<UserIdRequest>(this.request);
        this.closeModal();
        this.authService.logout();
      }, () => {
        this.errorEvent = true;
      });
  }

  closeModal() {
    this.modalService.close(this.modalName);
  }
}
