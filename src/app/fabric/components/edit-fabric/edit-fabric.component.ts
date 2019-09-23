import { ProducerService } from './../../../producer/services/producer.service';
import { SimpleProducer } from './../../../producer/models/producer.model';
import { Page, DefaultPages } from './../../../shared/models/page.model';
import { takeUntil } from 'rxjs/operators';
import { FabricService } from './../../services/fabric.service';
import { Fabric } from './../../models/fabric.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorCodes } from '../../../core/enums/error-code.enum';
import { Subject } from 'rxjs';
import { NewFabricRequest, EditFabricRequest } from '../../models/fabric-request.model';
import { EventBusService } from '../../../core/services/event-bus.service';
import { AlertifyService } from '../../../core/services/alertify.service';
import { ModalService } from '../../../core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';

enum FormControlNames {
  NAME = 'name',
  PRODUCER_CODE = 'producerCode',
  PRODUCER = 'producer',
  THICKNESS = 'thickness',
  IMAGE_URL = 'imageUrl'
}

@Component({
  selector: 'app-edit-fabric',
  templateUrl: './edit-fabric.component.html',
  styleUrls: ['./edit-fabric.component.scss']
})
export class EditFabricComponent implements OnInit, OnDestroy {

  static ModalName = 'editFabric';
  errorEvent = false;
  modalName = EditFabricComponent.ModalName;
  editFabricForm: FormGroup;
  formControlNames = FormControlNames;
  errorCodes = ErrorCodes;
  name = '';
  producerCode = '';
  producer = '';
  thickness = 0;
  imageUrl = '';

  producers: SimpleProducer[];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private editRequest: EditFabricRequest;
  private fabric: Fabric;
  private pages: Page = DefaultPages;


  constructor(
    private eventBus: EventBusService,
    private formBuilder: FormBuilder,
    private fabricService: FabricService,
    private producerService: ProducerService,
    private alertify: AlertifyService,
    private modalService: ModalService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadProducers();
    this.editFabricForm = this.formBuilder.group({
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

  loadFabric(fabric: Fabric) {
    this.fabricService
      .getFabric(fabric.id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => {
        this.fabric = response.data;
        this.setFormValue();
      });

  }

  onFormSubmit() {
    if (this.editFabricForm.valid) {
      this.editRequest = new EditFabricRequest();
      {
        this.editRequest.id = this.fabric.id;
        this.editRequest.name = this.editFabricForm.value.name;
        this.editRequest.imageUrl = this.editFabricForm.value.imageUrl;
        this.editRequest.producerCode = this.editFabricForm.value.producerCode;
        this.editRequest.producerId = this.editFabricForm.value.producer;
        this.editRequest.thickness = this.editFabricForm.value.thickness;
      }
      this.fabricService
      .editFabric(this.editRequest)
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
        this.eventBus.publish<EditFabricRequest>(this.editRequest);
        this.closeModal();
           });
    }
  }

  closeModal() {
    this.editFabricForm.reset();
    this.modalService.close(this.modalName);
  }

  private setFormValue() {
    this.editFabricForm.setValue({
      [FormControlNames.NAME]: this.fabric.name,
      [FormControlNames.PRODUCER]: this.fabric.producerId,
      [FormControlNames.PRODUCER_CODE]: this.fabric.producerCode,
      [FormControlNames.THICKNESS]: this.fabric.thickness,
      [FormControlNames.IMAGE_URL]: this.fabric.imageUrl
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
