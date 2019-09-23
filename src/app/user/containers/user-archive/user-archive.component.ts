import { AlertifyService } from './../../../core/services/alertify.service';
import { ModalService } from './../../../core/services/modal.service';
import { UserService } from './../../services/user.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { UserIdRequest, User } from './../../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-archive',
  templateUrl: './user-archive.component.html',
  styleUrls: ['./user-archive.component.scss']
})
export class UserArchiveComponent implements OnInit, OnDestroy {

  static ModalName = 'user-archive';
  modalName = UserArchiveComponent.ModalName;
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

  archiveUser() {
    this.userService
      .archiveUser(this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.user.archived')
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
  dearchiveUser() {
    this.userService
      .dearchiveUser(this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.user.dearchived')
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
