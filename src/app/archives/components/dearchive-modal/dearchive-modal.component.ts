import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from './../../../core/services/alertify.service';
import { UserService } from './../../../user/services/user.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProducerService } from 'src/app/producer/services/producer.service';
import { FabricService } from 'src/app/fabric/services/fabric.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { Producer } from './../../../producer/models/producer.model';
import { UserIdRequest, User } from './../../../user/models/user.model';
import { ProducerRequest } from './../../../producer/models/producer-request.model';
import { FabricRequest } from 'src/app/fabric/models/fabric-request.model';
import { Fabric } from './../../../fabric/models/fabric.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dearchive-modal',
  templateUrl: './dearchive-modal.component.html',
  styleUrls: ['./dearchive-modal.component.scss']
})
export class DearchiveModalComponent implements OnInit, OnDestroy {

  static ModalName = 'dearchiveModal';
  modalName = DearchiveModalComponent.ModalName;
  fabricId: FabricRequest;
  producerId: ProducerRequest;
  userId: UserIdRequest;
   errorEvent = false;
  currentFabric: Fabric;
  currentProducer: Producer;
  currentUser: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService,
    private fabricService: FabricService,
    private producerService: ProducerService,
    private userService: UserService,
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

  loadFabric(fabric: Fabric) {
    this.fabricId = new FabricRequest();
    {
      this.fabricId.id = fabric.id;
    }
    this.currentFabric = fabric;
  }
  loadProducer(producer: Producer) {
    this.producerId = new ProducerRequest();
    {
      this.producerId.id = producer.id;
    }
    this.currentProducer = producer;
  }
  loadUser(user: User) {
    this.userId = new UserIdRequest();
    {
      this.userId.id = user.id;
    }
    this.currentUser = user;
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
  dearchiveFabric() {
    this.fabricService
    .dearchiveFabric(this.fabricId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.translate
      .get('alertify.success.fabric.dearchived')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(translation => {
        this.alertify.success(translation);
      });
      this.errorEvent = false;
      this.eventBus.publish<FabricRequest>(this.fabricId);
      this.closeModal();
    },
    () => {
      this.errorEvent = true;
    });
  }
  dearchiveUser() {
    this.userService
    .dearchiveUser(this.userId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.translate
      .get('alertify.success.user.dearchived')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(translation => {
        this.alertify.success(translation);
      });
      this.errorEvent = false;
      this.eventBus.publish<UserIdRequest>(this.userId);
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

