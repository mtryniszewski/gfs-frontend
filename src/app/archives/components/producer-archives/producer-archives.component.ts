import { DearchiveModalComponent } from './../dearchive-modal/dearchive-modal.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Producer } from 'src/app/producer/models/producer.model';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Page, IChangePagination } from 'src/app/shared/models/page.model';
import { ProducerService } from 'src/app/producer/services/producer.service';
import { PageSizeService } from 'src/app/core/services/page-size.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ProducerRequest, NewProducerRequest, EditProducerRequest } from 'src/app/producer/models/producer-request.model';
import { NewProducerComponent } from 'src/app/producer/components/new-producer/new-producer.component';
import { EditProducerComponent } from 'src/app/producer/components/edit-producer/edit-producer.component';
import { ArchiveProducerComponent } from 'src/app/producer/components/archive-producer/archive-producer.component';
import { ArchivesService } from '../../services/archives.service';

@Component({
  selector: 'app-producer-archives',
  templateUrl: './producer-archives.component.html',
  styleUrls: ['./producer-archives.component.scss']
})
export class ProducerArchivesComponent implements OnInit, OnDestroy {

  @ViewChild('dearchiveModal') dearchiveModal: DearchiveModalComponent;

  producers: Producer[];
  totalCount: number;
  searchQuery = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  producerSearch = new FormControl();

  private pages: Page;

  constructor(
    private archivesService: ArchivesService,
    private pageSizeService: PageSizeService,
    private modalService: ModalService,
    private eventBus: EventBusService
  ) { }

  ngOnInit() {
    this.producerSearch.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(newValue => {
        this.searchQuery = newValue;
        this.onSearch();
      });
    this.reloadPages();
    this.loadProducers();
    this.eventBus
      .of(ProducerRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadProducers();
      });
      this.eventBus
      .of(NewProducerRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadProducers();
      });
      this.eventBus
      .of(EditProducerRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadProducers();
      });
      this.eventBus
      .of(ProducerRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pages.page = 0;
        this.loadProducers();
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
      this.loadProducers();
    } else {
      this.loadSearchProducers();
    }
  }

  private onSearch() {
    this.reloadPages();
    this.loadSearchProducers();
  }

  private loadSearchProducers() {
    this.archivesService.getSearchProducers(this.pages, this.searchQuery)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.producers = res.data.items;
        this.totalCount = res.data.total;
      });
  }

  private loadProducers() {
    this.archivesService.getProducers(this.pages)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.producers = res.data.items;
        this.totalCount = res.data.total;
      });
  }

  private reloadPages() {
    this.pages = this.pageSizeService.reloadPages();
  }

  hasProducers(): boolean {
    if (this.producers && this.producers.length > 0) {
      return true;
    } else {
      return false;
    }

  }

 openDearchiveModal(producer: Producer) {
    this.modalService.open(DearchiveModalComponent.ModalName);
    this.dearchiveModal.loadProducer(producer);
  }

}
