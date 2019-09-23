import { FabricRequest } from './../../models/fabric-request.model';
import { Fabric } from './../../models/fabric.model';
import { ModalService } from './../../../core/services/modal.service';
import { DefaultPages, Page } from './../../../shared/models/page.model';
import { Subject } from 'rxjs/internal/Subject';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fabric-preview',
  templateUrl: './fabric-preview.component.html',
  styleUrls: ['./fabric-preview.component.scss']
})
export class FabricPreviewComponent implements OnInit, OnDestroy {

  static ModalName = 'fabricPreview';
  modalName = FabricPreviewComponent.ModalName;
fabricId: FabricRequest;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private fabric: Fabric;
  private pages: Page = DefaultPages;

  constructor(
    private modalService: ModalService
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
    this.fabric = fabric;
  }

  closeModal() {
    this.modalService.close(this.modalName);
  }
}
