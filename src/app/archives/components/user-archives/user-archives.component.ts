import { ArchivesService } from './../../services/archives.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserRole } from 'src/app/core/enums/user-role.enum';
import { User, UserIdRequest } from 'src/app/user/models/user.model';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Page, IChangePagination } from 'src/app/shared/models/page.model';
import { PageSizeService } from 'src/app/core/services/page-size.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DearchiveModalComponent } from '../dearchive-modal/dearchive-modal.component';

@Component({
  selector: 'app-user-archives',
  templateUrl: './user-archives.component.html',
  styleUrls: ['./user-archives.component.scss']
})
export class UserArchivesComponent implements OnInit, OnDestroy {

  @ViewChild('dearchiveModal') dearchiveModal: DearchiveModalComponent;

  userRole = UserRole;
  users: User[];
  totalCount: number;
  searchText: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userSearch = new FormControl();
  searchQuery = '';

  private pages: Page;

  constructor(
   // private userService: UserService,
    private archivesService: ArchivesService,
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
  // openArchiveModal(user: User) {
  //   this.modalService.open(UserArchiveComponent.ModalName);
  //   this.archiveUser.loadUser(user);
  // }
  // openActivateModal(user: User) {
  //   this.modalService.open(UserActivateComponent.ModalName);
  //   this.activateUser.loadUser(user);
  // }
  // openPermissionsModal(user: User) {
  //   this.modalService.open(UserPermissionsComponent.ModalName);
  //   this.permissionsUser.loadUser(user);
  // }
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
    this.archivesService
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
    this.archivesService
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

  openDearchiveModal(user: User) {
    this.modalService.open(DearchiveModalComponent.ModalName);
    this.dearchiveModal.loadUser(user);
  }
}

// }
