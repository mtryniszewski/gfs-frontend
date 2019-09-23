import { takeUntil } from 'rxjs/operators';
import { AlertifyService } from './../../../core/services/alertify.service';
import { ModalService } from './../../../core/services/modal.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { Producer } from './../../models/producer.model';
import { element } from 'protractor';
import { ProducerRequest } from './../../models/producer-request.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectSubscriber, Subject } from 'rxjs/internal/Subject';
import { ProducerService } from '../../services/producer.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-archive-producer',
  templateUrl: './archive-producer.component.html',
  styleUrls: ['./archive-producer.component.scss']
})
export class ArchiveProducerComponent implements OnInit, OnDestroy {

  static ModalName = 'archive-producer';
  modalName = ArchiveProducerComponent.ModalName;
  producerId: ProducerRequest;
  errorEvent = false;
  currentProducer: Producer;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService,
    private producerService: ProducerService,
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

  loadProducer(producer: Producer) {
    this.producerId = new ProducerRequest();
    {
      this.producerId.id = producer.id;
    }
    this.currentProducer = producer;
  }

  archiveProducer() {
    this.producerService
    .archiveProducer(this.producerId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.translate
      .get('alertify.success.producer.archived')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(translation => {
        this.alertify.success(translation);
      });
      this.errorEvent = false;
      this.eventBus.publish<ProducerRequest>(this.producerId);
      this.closeModal();
    },
    () => {
      this.errorEvent = true;
    });
  }
  dearchiveProducer() {
    this.producerService
    .dearchiveProducer(this.producerId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.translate
      .get('alertify.success.producer.dearchived')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(translation => {
        this.alertify.success(translation);
      });
      this.errorEvent = false;
      this.eventBus.publish<ProducerRequest>(this.producerId);
      this.closeModal();
    },
    () => {
      this.errorEvent = true;
    });
  }
  closeModal() {
    this.modalService.close(this.modalName);
}
}
