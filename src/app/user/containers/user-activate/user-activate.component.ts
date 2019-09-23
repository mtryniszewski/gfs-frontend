import { takeUntil } from 'rxjs/operators';
import { AlertifyService } from './../../../core/services/alertify.service';
import { ModalService } from './../../../core/services/modal.service';
import { UserService } from './../../services/user.service';
import { Subject } from 'rxjs';

import { User, UserIdRequest } from './../../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from '../../../core/services/event-bus.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.scss']
})
export class UserActivateComponent implements OnInit, OnDestroy {

  static ModalName = 'user-activate';
  modalName = UserActivateComponent.ModalName;
  userId: UserIdRequest;
  errorEvent = false;
  currentUser: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService,
    private userService: UserService,
    private modalService: ModalService,
    private alertify: AlertifyService,
    private translate: TranslateService
  ) { }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadUser(user: User) {
    this.userId = new UserIdRequest();
    {
      this.userId.id = user.id;
    }
    this.currentUser = user;
  }
  activateUser() {
    this.userService
      .activateUser(this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.user.activated')
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(translation => {
            this.alertify.success(translation);
          });
        this.errorEvent = false;
        this.eventBus.publish<UserIdRequest>(this.userId);
        this.closeModal();
      }, () => {
        this.errorEvent = true;
      }
      );
  }
  deactivateUser() {
    this.userService
      .deactivateUser(this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.user.deactivated')
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(translation => {
            this.alertify.success(translation);
          });
        this.errorEvent = false;
        this.eventBus.publish<UserIdRequest>(this.userId);
        this.closeModal();
      }, () => {
        this.errorEvent = true;
      }
      );
  }
  closeModal() {
    this.modalService.close(this.modalName);
  }

}
