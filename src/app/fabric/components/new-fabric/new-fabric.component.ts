import { SimpleProducer } from './../../../producer/models/producer.model';
import { ProducerService } from './../../../producer/services/producer.service';
import { Page, DefaultPages } from './../../../shared/models/page.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AlertifyService } from './../../../core/services/alertify.service';
import { TranslateService } from '@ngx-translate/core';
import { FabricService } from './../../services/fabric.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { Subject } from 'rxjs/internal/Subject';
import { ErrorCodes } from './../../../core/enums/error-code.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewFabricRequest } from '../../models/fabric-request.model';
import { ModalService } from '../../../core/services/modal.service';
import { Producer } from 'src/app/producer/models/producer.model';

enum FormControlNames {
  NAME = 'name',
  PRODUCER_CODE = 'producerCode',
  PRODUCER = 'producer',
  THICKNESS = 'thickness',
  IMAGE_URL = 'imageUrl'
}

@Component({
  selector: 'app-new-fabric',
  templateUrl: './new-fabric.component.html',
  styleUrls: ['./new-fabric.component.scss']
})
export class NewFabricComponent implements OnInit, OnDestroy {

  static ModalName = 'newFabric';
  errorEvent = false;
  modalName = NewFabricComponent.ModalName;
  newFabricForm: FormGroup;
  formControlNames = FormControlNames;
  errorCodes = ErrorCodes;
  name = '';
  producerCode = '';
  producer = '';
  thickness = 0;
  imageUrl = '';
producers: SimpleProducer[];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private fabricRequest: NewFabricRequest;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private eventBus: EventBusService,
    private fabricService: FabricService,
    private producerService: ProducerService,
    private translate: TranslateService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadProducers();
    this.newFabricForm = this.formBuilder.group({
      [FormControlNames.NAME]: [null, [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      [FormControlNames.PRODUCER_CODE]: [null, [Validators.required]],
      [FormControlNames.PRODUCER]: [null, [Validators.required]],
      [FormControlNames.THICKNESS]: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
      [FormControlNames.IMAGE_URL]: [null]
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.newFabricForm.valid) {
      this.errorEvent = false;
      this.setFabric();
      this.fabricService.newFabric(this.fabricRequest)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.translate
            .get('alertify.success.fabric.created')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(translation => {
              this.alertify.success(translation);
            });
          this.eventBus.publish<NewFabricRequest>(this.fabricRequest);
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

  setFabric() {
    this.fabricRequest = new NewFabricRequest();
    this.fabricRequest.name = this.newFabricForm.value[FormControlNames.NAME];
    this.fabricRequest.producerCode = this.newFabricForm.value[FormControlNames.PRODUCER_CODE];
    this.fabricRequest.producerId = this.newFabricForm.value[FormControlNames.PRODUCER];
    this.fabricRequest.thickness = this.newFabricForm.value[FormControlNames.THICKNESS];
    this.fabricRequest.imageUrl = this.newFabricForm.value[FormControlNames.IMAGE_URL];

  }

  closeModal() {
    this.setForm();
    this.modalService.close(this.modalName);
  }

  private setForm() {
    this.newFabricForm.setValue({
      [FormControlNames.NAME]: null,
      [FormControlNames.PRODUCER]: null,
      [FormControlNames.PRODUCER_CODE]: null,
      [FormControlNames.THICKNESS]: null,
      [FormControlNames.IMAGE_URL]: null
    });
  }
  private loadProducers() {
    const pages: Page = DefaultPages;
    this.producerService
      .getSimpleProducers(pages)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.producers = res.data.items;
      });
  }
}
