import { FabricService } from './../../../fabric/services/fabric.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FabricRequest } from 'src/app/fabric/models/fabric-request.model';
import { Subject } from 'rxjs';
import { Fabric } from 'src/app/fabric/models/fabric.model';
import { Page, DefaultPages } from 'src/app/shared/models/page.model';
import { ModalService } from 'src/app/core/services/modal.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-furniture-fabric-preview',
  templateUrl: './new-furniture-fabric-preview.component.html',
  styleUrls: ['./new-furniture-fabric-preview.component.scss']
})
export class NewFurnitureFabricPreviewComponent implements OnInit, OnDestroy {

  static ModalName = 'newFurnitureFabricPreview';
  modalName = NewFurnitureFabricPreviewComponent.ModalName;
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
