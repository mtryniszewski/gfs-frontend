import { FabricPreviewComponent } from './../../../fabric/components/fabric-preview/fabric-preview.component';
import { DearchiveModalComponent } from './../dearchive-modal/dearchive-modal.component';
import { ArchivesService } from './../../services/archives.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Fabric } from 'src/app/fabric/models/fabric.model';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Page, IChangePagination } from 'src/app/shared/models/page.model';
import { PageSizeService } from 'src/app/core/services/page-size.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FabricRequest, NewFabricRequest, EditFabricRequest } from 'src/app/fabric/models/fabric-request.model';

@Component({
  selector: 'app-fabric-archives',
  templateUrl: './fabric-archives.component.html',
  styleUrls: ['./fabric-archives.component.scss']
})
export class FabricArchivesComponent implements OnInit, OnDestroy {

  @ViewChild('dearchiveModal') dearchiveModal: DearchiveModalComponent;
  @ViewChild('fabricPreview') fabricPreview: FabricPreviewComponent;


  fabrics: Fabric[];
  totalCount: number;
  searchQuery = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  fabricSearch = new FormControl();

  private pages: Page;

  constructor(
    private pageSizeService: PageSizeService,
    private archivesService: ArchivesService,
    private modalService: ModalService,
    private eventBus: EventBusService
  ) { }

  ngOnInit() {
    this.fabricSearch.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(newValue => {
        this.searchQuery = newValue;
        this.onSearch();
      });

    this.reloadPages();
    this.loadFabrics();

    this.eventBus
      .of(FabricRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadFabrics();
      });
    this.eventBus
      .of(NewFabricRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadFabrics();
      });

    this.eventBus
      .of(EditFabricRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadFabrics();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onPaginationChange($event: IChangePagination) {
    this.pages.page = $event.pageIndex;
    this.pages.pageSize = $event.pageSize;
    if (this.searchQuery === null || this.searchQuery === '') {
      this.loadFabrics();
    } else {
      this.loadSearchFabrics();
    }
  }

  private onSearch() {
    this.reloadPages();
    this.loadSearchFabrics();
  }

  private loadSearchFabrics() {
    this.archivesService.getSearchFabrics(this.pages, this.searchQuery)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.fabrics = res.data.items;
        this.totalCount = res.data.total;
      });
  }

  private loadFabrics() {
    this.archivesService.getFabrics(this.pages)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.fabrics = res.data.items;
        this.totalCount = res.data.total;
      });
  }

  private reloadPages() {
    this.pages = this.pageSizeService.reloadPages();
  }

  hasFabrics(): boolean {
    if (this.fabrics && this.fabrics.length > 0) {
      return true;
    } else {
      return false;
    }
  }


  openDearchiveModal(fabric: Fabric) {
    this.modalService.open(DearchiveModalComponent.ModalName);
    this.dearchiveModal.loadFabric(fabric);
  }

  openFabricPreviewModal(fabric: Fabric) {
    this.modalService.open(FabricPreviewComponent.ModalName);
    this.fabricPreview.loadFabric(fabric);
  }
}
