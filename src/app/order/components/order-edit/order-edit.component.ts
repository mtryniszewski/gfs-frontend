import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EditOrderRequest, NewOrderRequest } from '../../models/order-request.model';
import { TokenService } from 'src/app/core/services/token.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { OrderService } from '../../services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { takeUntil } from 'rxjs/operators';
import { Order } from '../../models/order.model';


enum FormControlNames {
  DESCRIPTION = 'description'
}


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit, OnDestroy {

  static ModalName = 'editOrder';
  errorEvent = false;
  modalName = OrderEditComponent.ModalName;
  editOrderForm: FormGroup;
  formControlNames = FormControlNames;
  description = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private orderRequest: EditOrderRequest;
  private order: Order;


  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private eventBus: EventBusService,
    private orderService: OrderService,
    private translate: TranslateService,
    private alertify: AlertifyService

  ) { }

  ngOnInit() {
    this.editOrderForm = this.formBuilder.group({
      [FormControlNames.DESCRIPTION]: [null, [Validators.required, Validators.maxLength(150), Validators.minLength(3)]]
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.editOrderForm.valid) {
      this.errorEvent = false;
      this.orderRequest = new EditOrderRequest(); {
        this.orderRequest.description = this.editOrderForm.value.description;
        this.orderRequest.id = this.order.id;
      }
      this.orderService
        .editOrder(this.orderRequest)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.translate
            .get('alertify.success.credentialChange')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(translation => {
              this.alertify.success(translation);
            });
          this.eventBus.publish<EditOrderRequest>(this.orderRequest);
          this.closeModal();
        });
    }
  }

  loadOrder(order: Order) {
    this.orderService
      .getOrder(order.id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => {
        this.order = response.data;
        this.setForm();
      });
  }



  closeModal() {
    this.editOrderForm.reset();
    this.modalService.close(this.modalName);
  }

  private setForm() {
    this.editOrderForm.setValue({
      [FormControlNames.DESCRIPTION]: this.order.description
    });
  }


}
