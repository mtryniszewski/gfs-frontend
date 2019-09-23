import { UserRole } from './../../../core/enums/user-role.enum';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from './../../../core/services/alertify.service';
import { ModalService } from './../../../core/services/modal.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserIdRequest } from '../../models/user.model';
import { Subject } from 'rxjs';
import { EventBusService } from '../../../core/services/event-bus.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit, OnDestroy {


  static ModalName = 'user-permissions';
  userRoles: UserRole;
  modalName = UserPermissionsComponent.ModalName;
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
  grantUser() {
    this.userService
      .grantUser(this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.user.granted')
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
  revokeUser() {
    this.userService
      .revokeUser(this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.user.revoked')
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
