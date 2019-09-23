import { takeUntil, take } from 'rxjs/operators';
import { AlertifyService } from './../../../core/services/alertify.service';
import { OrderService } from './../../services/order.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { OrderRequest } from './../../models/order-request.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../models/order.model';
import { Subject } from 'rxjs';
import { ModalService } from '../../../core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-archive',
  templateUrl: './order-archive.component.html',
  styleUrls: ['./order-archive.component.scss']
})
export class OrderArchiveComponent implements OnInit, OnDestroy {

  static ModalName = 'archiveOrder';
  modalName = OrderArchiveComponent.ModalName;
  orderId: OrderRequest;
  errorEvent = false;
  currentOrder: Order;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService,
    private orderService: OrderService,
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

  loadOrder(order: Order) {
    this.orderId = new OrderRequest();
    {
      this.orderId.id = order.id;
    }
    this.currentOrder = order;
  }
  archiveOrder() {
    this.orderService
    .archiveOrder(this.orderId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.translate
      .get('alertiy.success.order.archived')
    .pipe(
      takeUntil(this.destroy$)
    )
  .subscribe(translation => {
    this.alertify.success(translation);
  });
  this.errorEvent = false;
  this.eventBus.publish<OrderRequest>(this.orderId);
  this.closeModal();
      }, () => {
        this.errorEvent = true;
      });
      }
      closeModal() {
        this.modalService.close(this.modalName);
      }
}
