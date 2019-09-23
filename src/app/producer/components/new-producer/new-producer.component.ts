
import { takeUntil } from 'rxjs/operators';
import { NewProducerRequest } from './../../models/producer-request.model';
import { AlertifyService } from './../../../core/services/alertify.service';
import { TranslateService } from '@ngx-translate/core';
import { ProducerService } from './../../services/producer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorCodes } from '../../../core/enums/error-code.enum';
import { Subscription, Subject } from 'rxjs';
import { ModalService } from '../../../core/services/modal.service';
import { EventBusService } from '../../../core/services/event-bus.service';

enum FormControlNames {
  NAME = 'name',
  CITY = 'city',
  STREET = 'street',
  EMAIL = 'email',
  PHONE = 'phoneNumber'
}

@Component({
  selector: 'app-new-producer',
  templateUrl: './new-producer.component.html',
  styleUrls: ['./new-producer.component.scss']
})
export class NewProducerComponent implements OnInit, OnDestroy {

  static ModalName = 'newProducer';
  errorEvent = false;
  modalName = NewProducerComponent.ModalName;
  newProducerForm: FormGroup;
  formControlNames = FormControlNames;
  errorCodes = ErrorCodes;
  name = '';
  city = '';
  street = '';
  email = '';
  phoneNumber = '';

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private producerRequest: NewProducerRequest;


  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private eventBus: EventBusService,
    private producerService: ProducerService,
    private translate: TranslateService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.newProducerForm = this.formBuilder.group({
      [FormControlNames.NAME]: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      [FormControlNames.CITY]: ['', [Validators.required, Validators.maxLength(100)]],
      [FormControlNames.STREET]: ['', [Validators.required, Validators.maxLength(150)]],
      [FormControlNames.EMAIL]: ['', [Validators.required, Validators.email]],
      [FormControlNames.PHONE]: ['', [Validators.maxLength(15)]]
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.newProducerForm.valid) {
      this.errorEvent = false;
      this.setProducer();
      this.producerService.newProducer(this.producerRequest)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.translate
            .get('alertify.success.producer.created')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(translation => {
              this.alertify.success(translation);
            });
            this.eventBus.publish<NewProducerRequest>(this.producerRequest);
            this.closeModal();
        },
          error => {
            this.errorEvent = true;
          }
        );
    }
  }

  loadData() {
    this.setForm();
  }
  setProducer() {
    this.producerRequest = new NewProducerRequest();
    this.producerRequest.name = this.newProducerForm.value[FormControlNames.NAME];
    this.producerRequest.email = this.newProducerForm.value[FormControlNames.EMAIL];
    this.producerRequest.city = this.newProducerForm.value[FormControlNames.CITY];
    this.producerRequest.street = this.newProducerForm.value[FormControlNames.STREET];
    this.producerRequest.phoneNumber = this.newProducerForm.value[FormControlNames.PHONE];
  }
  closeModal() {
    this.setForm();
    this.modalService.close(this.modalName);
  }

  private setForm() {
    this.newProducerForm.setValue({
      [FormControlNames.NAME]: null,
      [FormControlNames.CITY]: null,
      [FormControlNames.STREET]: null,
      [FormControlNames.EMAIL]: null,
      [FormControlNames.PHONE]: null
    });
  }
}
