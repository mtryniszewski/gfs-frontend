import { UserArchiveComponent } from './../user-archive/user-archive.component';
import { ModalService } from './../../../core/services/modal.service';
import { UserActivateComponent } from './../user-activate/user-activate.component';
import { PageSizeService } from './../../../core/services/page-size.service';
import { Page, IChangePagination } from './../../../shared/models/page.model';
import { Subject } from 'rxjs';
import { User, UserIdRequest } from './../../models/user.model';
import { UserRole } from './../../../core/enums/user-role.enum';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { EventBusService } from '../../../core/services/event-bus.service';
import { UserPermissionsComponent } from '../user-permissions/user-permissions.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  @ViewChild('activateUser') activateUser: UserActivateComponent;
  @ViewChild('archiveUser') archiveUser: UserArchiveComponent;
  @ViewChild('permissionsUser') permissionsUser: UserPermissionsComponent;

  userRole = UserRole;
  users: User[];
  totalCount: number;
  searchText: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userSearch = new FormControl();
  searchQuery = '';

  private pages: Page;

  constructor(
    private userService: UserService,
    private pageSizeService: PageSizeService,
    private modalService: ModalService,
    private eventBus: EventBusService
  ) { }

  ngOnInit() {
    this.userSearch.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(newValue => {
        this.searchQuery = newValue;
        this.onSearch();
      });
    this.reloadPages();
    this.loadUsers();
    this.eventBus
      .of(UserIdRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadUsers();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  openArchiveModal(user: User) {
    this.modalService.open(UserArchiveComponent.ModalName);
    this.archiveUser.loadUser(user);
  }
  openActivateModal(user: User) {
    this.modalService.open(UserActivateComponent.ModalName);
    this.activateUser.loadUser(user);
  }
  openPermissionsModal(user: User) {
    this.modalService.open(UserPermissionsComponent.ModalName);
    this.permissionsUser.loadUser(user);
  }
  onPaginationChange($event: IChangePagination) {
    this.pages.page = $event.pageIndex;
    this.pages.pageSize = $event.pageSize;
    if (this.searchQuery === null || this.searchQuery === '') {
      this.loadUsers();
    } else {
      this.loadSearchUsers();
    }
  }

  private onSearch() {
    this.reloadPages();
    this.loadSearchUsers();
  }

  private loadSearchUsers() {
    this.userService
      .getSearchUsers(this.pages, this.searchQuery)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.users = res.data.items;
        this.totalCount = res.data.total;
      });
  }

  private loadUsers() {
    this.userService
      .getUsers(this.pages)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.users = res.data.items;
        this.totalCount = res.data.total;
      });
  }
  private reloadPages() {
    this.pages = this.pageSizeService.reloadPages();
  }

  hasUsers(): boolean {
    if (this.users && this.users.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
