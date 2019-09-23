import { FabricService } from './../../services/fabric.service';
import { Subject } from 'rxjs/internal/Subject';
import { Fabric, FabricBasic } from './../../models/fabric.model';
import { FabricRequest } from './../../models/fabric-request.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from '../../../core/services/event-bus.service';
import { ModalService } from '../../../core/services/modal.service';
import { AlertifyService } from '../../../core/services/alertify.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { ProducerRequest } from '../../../producer/models/producer-request.model';

@Component({
  selector: 'app-archive-fabric',
  templateUrl: './archive-fabric.component.html',
  styleUrls: ['./archive-fabric.component.scss']
})
export class ArchiveFabricComponent implements OnInit, OnDestroy {

  static ModalName = 'archiveFabric';
  modalName = ArchiveFabricComponent.ModalName;
  fabricId: FabricRequest;
  errorEvent = false;
  currentFabric: Fabric;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService,
    private fabricService: FabricService,
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

  archiveFabric() {
    this.fabricService
    .archiveFabric(this.fabricId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.translate
      .get('alertify.success.fabric.archived')
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
  closeModal() {
    this.modalService.close(this.modalName);
}
}
