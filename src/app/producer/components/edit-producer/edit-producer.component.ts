import { element } from 'protractor';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './../../../core/services/modal.service';
import { AlertifyService } from './../../../core/services/alertify.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorCodes } from './../../../core/enums/error-code.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { EditProducerRequest } from '../../models/producer-request.model';
import { ProducerService } from '../../services/producer.service';
import { Producer } from '../../models/producer.model';

enum FormControlNames {
  NAME = 'name',
  CITY = 'city',
  STREET = 'street',
  EMAIL = 'email',
  PHONE = 'phoneNumber'
}

@Component({
  selector: 'app-edit-producer',
  templateUrl: './edit-producer.component.html',
  styleUrls: ['./edit-producer.component.scss']
})
export class EditProducerComponent implements OnInit, OnDestroy {

  static ModalName = 'editProducer';
  formControlNames = FormControlNames;
  modalName = EditProducerComponent.ModalName;
  errorCodes = ErrorCodes;
  editProducerForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  name = '';
  city = '';
  street = '';
  email = '';
  phoneNumber = '';

  private editRequest: EditProducerRequest;
  private producer: Producer;

  constructor(
    private eventBus: EventBusService,
    private formBuilder: FormBuilder,
    private producerService: ProducerService,
    private alertify: AlertifyService,
    private modalService: ModalService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.editProducerForm = this.formBuilder.group({
      [FormControlNames.NAME]: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      [FormControlNames.CITY]: [null, [Validators.required, Validators.maxLength(100)]],
      [FormControlNames.STREET]: [null, [Validators.required, Validators.maxLength(150)]],
      [FormControlNames.EMAIL]: [null, [Validators.required, Validators.email]],
      [FormControlNames.PHONE]: [null, [Validators.maxLength(15)]]
    });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadProducer(producer: Producer) {
    this.producerService
      .getProducer(producer.id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => {
        this.producer = response.data;
        this.setFormValue();
      });

  }
  onFormSubmit() {
    if (this.editProducerForm.valid) {
      this.editRequest = new EditProducerRequest();
      {
        this.editRequest.id = this.producer.id;
        this.editRequest.name = this.editProducerForm.value.name;
        this.editRequest.city = this.editProducerForm.value.city;
        this.editRequest.street = this.editProducerForm.value.street;
        this.editRequest.email = this.editProducerForm.value.email;
        this.editRequest.phoneNumber = this.editProducerForm.value.phoneNumber;
      }
      this.producerService
      .editProducer(this.editRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
        .get('alertify.success.credentialChange')
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          translation => {
            this.alertify.success(translation);
          }
        );
        this.eventBus.publish<EditProducerRequest>(this.editRequest);
        this.closeModal();
           });
    }
  }

  closeModal() {
    this.editProducerForm.reset();
    this.modalService.close(this.modalName);
  }

  private setFormValue() {
    this.editProducerForm.setValue({
      [FormControlNames.NAME]: this.producer.name,
      [FormControlNames.CITY]: this.producer.city,
      [FormControlNames.STREET]: this.producer.street,
      [FormControlNames.EMAIL]: this.producer.email,
      [FormControlNames.PHONE]: this.producer.phoneNumber
    });
  }
}
