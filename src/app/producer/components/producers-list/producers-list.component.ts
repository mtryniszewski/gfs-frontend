import { EditProducerComponent } from './../edit-producer/edit-producer.component';
import { EditProducerRequest } from './../../models/producer-request.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { EventBusService } from './../../../core/services/event-bus.service';
import { PageSizeService } from './../../../core/services/page-size.service';
import { ProducerService } from './../../services/producer.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Producer } from '../../models/producer.model';
import { Page, IChangePagination } from '../../../shared/models/page.model';
import { ModalService } from '../../../core/services/modal.service';
import { ProducerRequest, NewProducerRequest } from '../../models/producer-request.model';
import { NewProducerComponent } from '../new-producer/new-producer.component';
import { ArchiveProducerComponent } from '../archive-producer/archive-producer.component';

@Component({
  selector: 'app-producers-list',
  templateUrl: './producers-list.component.html',
  styleUrls: ['./producers-list.component.scss']
})
export class ProducersListComponent implements OnInit, OnDestroy {

  @ViewChild('newProducer') newProducer: NewProducerComponent;
  @ViewChild('editProducer') editProducer: EditProducerComponent;
  @ViewChild('archiveProducer') archiveProducer: ArchiveProducerComponent;


  producers: Producer[];
  totalCount: number;
  searchQuery = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  producerSearch = new FormControl();

  private pages: Page;

  constructor(
    private producerService: ProducerService,
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
    this.producerService.getSearchProducers(this.pages, this.searchQuery)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.producers = res.data.items;
        this.totalCount = res.data.total;
      });
  }

  private loadProducers() {
    this.producerService.getProducers(this.pages)
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

  openNewProducerModal() {
    this.modalService.open(NewProducerComponent.ModalName);
  }

  openEditProducerModal(producer: Producer) {
    this.modalService.open(EditProducerComponent.ModalName);
     this.editProducer.loadProducer(producer);
  }

  openArchiveProducerModal(producer: Producer) {
    this.modalService.open(ArchiveProducerComponent.ModalName);
    this.archiveProducer.loadProducer(producer);
  }

}
