import { TokenService } from 'src/app/core/services/token.service';
import { takeUntil } from 'rxjs/operators';
import { AlertifyService } from './../../../core/services/alertify.service';
import { OrderService } from './../../services/order.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewProducerRequest } from 'src/app/producer/models/producer-request.model';
import { TranslateService } from '@ngx-translate/core';
import { NewOrderRequest } from '../../models/order-request.model';

enum FormControlNames {
  DESCRIPTION = 'description'
}

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})


export class NewOrderComponent implements OnInit, OnDestroy {

  static ModalName = 'newOrder';
  errorEvent = false;
  modalName = NewOrderComponent.ModalName;
  newOrderForm: FormGroup;
  formControlNames = FormControlNames;
  description = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private orderRequest: NewOrderRequest;


  constructor(
    private tokenService: TokenService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private eventBus: EventBusService,
    private orderService: OrderService,
    private translate: TranslateService,
    private alertify: AlertifyService

  ) { }

  ngOnInit() {
    this.newOrderForm = this.formBuilder.group({
      [FormControlNames.DESCRIPTION]: [null, [Validators.required, Validators.maxLength(150), Validators.minLength(3)]]
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.newOrderForm.valid) {
      this.errorEvent = false;
      this.setOrder();
      this.orderService.newOrder(this.orderRequest)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.translate
            .get('alertify.success.order.created')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(translation => {
              this.alertify.success(translation);
            });
          this.eventBus.publish<NewOrderRequest>(this.orderRequest);
          this.closeModal();
        },
          error => {
            this.errorEvent = true;
          });
    }
  }

  loadData() {
    this.setForm();
  }

  setOrder() {
    this.orderRequest = new NewOrderRequest();
    this.orderRequest.description = this.newOrderForm.value[FormControlNames.DESCRIPTION];
    this.orderRequest.userId = this.getUserId();
  }


  getUserId(): string {
    return this.tokenService.getDecodedToken().sub[3];
  }

  closeModal() {
    this.setForm();
    this.modalService.close(this.modalName);
  }

  private setForm() {
    this.newOrderForm.setValue({
      [FormControlNames.DESCRIPTION]: null
    });
  }


}
