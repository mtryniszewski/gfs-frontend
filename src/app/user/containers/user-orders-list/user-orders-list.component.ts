import { TokenService } from './../../../core/services/token.service';
import { NewOrderComponent } from './../../../order/components/new-order/new-order.component';
import { OrderArchiveComponent } from './../../../order/components/order-archive/order-archive.component';
import { OrderRequest, NewOrderRequest, EditOrderRequest } from './../../../order/models/order-request.model';
import { OrderService } from './../../../order/services/order.service';
import { IChangePagination } from './../../../shared/models/page.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PageSizeService } from './../../../core/services/page-size.service';
import { UserService } from './../../services/user.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Order } from './../../../order/models/order.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Page } from '../../../shared/models/page.model';
import { ModalService } from '../../../core/services/modal.service';
import { EventBusService } from '../../../core/services/event-bus.service';
import { ActivatedRoute } from '@angular/router';
import { OrderConfirmComponent } from '../../../order/components/order-confirm/order-confirm.component';
import { OrderEditComponent } from 'src/app/order/components/order-edit/order-edit.component';
import { UserIdRequest } from '../../models/user.model';

@Component({
  selector: 'app-user-orders-list',
  templateUrl: './user-orders-list.component.html',
  styleUrls: ['./user-orders-list.component.scss']
})
export class UserOrdersListComponent implements OnInit, OnDestroy {

  @ViewChild('newOrder') newOrder: NewOrderComponent;
  @ViewChild('editOrder') editOrder: OrderEditComponent;
  @ViewChild('archiveOrder') archiveOrder: OrderArchiveComponent;
  @ViewChild('confirmOrder') confirmOrder: OrderConfirmComponent;

  orders: Order[];
  userId: string;
  totalCount: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  orderSearch = new FormControl();
  searchQuery = '';
  userName: string;

  private pages: Page;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private pageSizeService: PageSizeService,
    private modalService: ModalService,
    private eventBus: EventBusService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  isAdmin(): boolean {
    if (this.tokenService.getDecodedToken()[`Permissions`] === 'Admin') {
      return true;
    }
    return false;
  }

  getUserData() {
    this.userService
      .getUser(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        user => {
          this.userName = user.data.name + ' ' + user.data.surname;
        }
      );
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  this.getUserData();
    this.orderSearch.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(newValue => {
        this.searchQuery = newValue;
        this.onSearch();
      });
    this.reloadPages();
    this.loadOrders();
    this.eventBus
      .of(OrderRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadOrders();
      });

    this.eventBus
      .of(NewOrderRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadOrders();
      });

    this.eventBus
      .of(EditOrderRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadOrders();
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  onPaginationChange($event: IChangePagination) {
    this.pages.page = $event.pageIndex;
    this.pages.pageSize = $event.pageSize;
    if (this.searchQuery === null || this.searchQuery === '') {
      this.loadOrders();
    } else {
      this.loadSearchOrders();
    }
  }
  private onSearch() {
    this.reloadPages();
    this.loadSearchOrders();
  }
  private loadSearchOrders() {
    this.orderService
      .getUserSearchOrders(this.pages, this.searchQuery, this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.orders = res.data.items;
        this.totalCount = res.data.total;
      });
  }
  private loadOrders() {
    this.orderService
      .getUserOrders(this.pages, this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.orders = res.data.items;
        this.totalCount = res.data.total;
      });
  }
  private reloadPages() {
    this.pages = this.pageSizeService.reloadPages();
  }


  hasOrders(): boolean {
    if (this.orders && this.orders.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  openNewOrderModal() {
    this.modalService.open(NewOrderComponent.ModalName);
  }

  openEditOrderModal(order: Order) {
    this.modalService.open(OrderEditComponent.ModalName);
    this.editOrder.loadOrder(order);
  }

  openArchiveOrderModal(order: Order) {
    this.modalService.open(OrderArchiveComponent.ModalName);
    this.archiveOrder.loadOrder(order);
  }

  openConfirmOrderModal(order: Order) {
    this.modalService.open(OrderConfirmComponent.ModalName);
    this.confirmOrder.loadOrder(order);
  }
}
