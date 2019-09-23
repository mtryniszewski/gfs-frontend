import { FabricPreviewComponent } from './../fabric-preview/fabric-preview.component';
import { FabricRequest, NewFabricRequest, EditFabricRequest } from './../../models/fabric-request.model';
import { ModalService } from './../../../core/services/modal.service';
import { FabricService } from './../../services/fabric.service';
import { PageSizeService } from './../../../core/services/page-size.service';
import { Page, IChangePagination } from './../../../shared/models/page.model';
import { FormControl } from '@angular/forms';
import { EditFabricComponent } from './../edit-fabric/edit-fabric.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NewFabricComponent } from '../new-fabric/new-fabric.component';
import { ArchiveFabricComponent } from 'src/app/fabric/components/archive-fabric/archive-fabric.component';
import { Fabric } from '../../models/fabric.model';
import { Subject } from 'rxjs';
import { EventBusService } from '../../../core/services/event-bus.service';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fabrics-list',
  templateUrl: './fabrics-list.component.html',
  styleUrls: ['./fabrics-list.component.scss']
})
export class FabricsListComponent implements OnInit, OnDestroy {

  @ViewChild('newFabric') newFabric: NewFabricComponent;
  @ViewChild('editFabric') editFabric: EditFabricComponent;
  @ViewChild('archiveFabric') archiveFabric: ArchiveFabricComponent;
  @ViewChild('fabricPreview') fabricPreview: FabricPreviewComponent;


  fabrics: Fabric[];
  totalCount: number;
  searchQuery = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  fabricSearch = new FormControl();

  private pages: Page;

  constructor(
    private pageSizeService: PageSizeService,
    private fabricService: FabricService,
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
    this.fabricService.getSearchFabrics(this.pages, this.searchQuery)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.fabrics = res.data.items;
        this.totalCount = res.data.total;
      });
  }

  private loadFabrics() {
    this.fabricService.getFabrics(this.pages)
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

  openNewFabricModal() {
    this.modalService.open(NewFabricComponent.ModalName);
  }

  openEditFabricModal(fabric: Fabric) {
    this.modalService.open(EditFabricComponent.ModalName);
    this.editFabric.loadFabric(fabric);
  }

  openArchiveFabricModal(fabric: Fabric) {
    this.modalService.open(ArchiveFabricComponent.ModalName);
    this.archiveFabric.loadFabric(fabric);
  }

  openFabricPreviewModal(fabric: Fabric) {
    this.modalService.open(FabricPreviewComponent.ModalName);
    this.fabricPreview.loadFabric(fabric);
  }
}
