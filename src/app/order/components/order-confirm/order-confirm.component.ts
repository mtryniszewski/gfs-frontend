import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from './../../../core/services/alertify.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { Order } from './../../models/order.model';
import { OrderRequest } from './../../models/order-request.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { ModalService } from '../../../core/services/modal.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit, OnDestroy {

  static ModalName = 'confirmOrder';
  modalName = OrderConfirmComponent.ModalName;
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

  confirmOrder() {
    this.orderService
    .confirmOrder(this.orderId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.translate
      .get('alertify.success.order.confirmed')
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
