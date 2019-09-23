import { Order } from './../../models/order.model';
import { OrderService } from './../../services/order.service';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderArchiveComponent } from '../order-archive/order-archive.component';
import { OrderConfirmComponent } from '../order-confirm/order-confirm.component';
import { FormControl } from '@angular/forms';
import { Page, IChangePagination } from '../../../shared/models/page.model';
import { PageSizeService } from '../../../core/services/page-size.service';
import { ModalService } from '../../../core/services/modal.service';
import { EventBusService } from '../../../core/services/event-bus.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { OrderRequest } from '../../models/order-request.model';
import { OrderEditComponent } from '../order-edit/order-edit.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {


  orders: Order[];
  totalCount: number;
  searchQuery = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  orderSearch = new FormControl();

  private pages: Page;

  constructor(
    private orderService: OrderService,
    private pageSizeService: PageSizeService,
    private modalService: ModalService,
    private eventBus: EventBusService
  ) { }

  ngOnInit() {
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
      .getAllSearchOrders(this.pages, this.searchQuery)
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
      .getAllOrders(this.pages)
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

}

