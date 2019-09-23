import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IChangePagination } from '../../models/page.model';
import { PageSizeService } from '../../../core/services/page-size.service';
import { AlertifyService } from '../../../core/services/alertify.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() itemsCount: number;
  @Output() changePagination = new EventEmitter<IChangePagination>();

  page: IChangePagination = {
    pageIndex: 0,
    pageSize: this.pageSizeService.getPageSize()
  };

  pageSize: number;
  pagesCount: number;
  totalCount: number;

  constructor(
    private pageSizeService: PageSizeService,
    private alertify: AlertifyService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.setInitPageSize();
  }

  get pages(): number[] {
    if (this.itemsCount === undefined || this.itemsCount === null) {
      return [];
    }
    this.pagesCount = Math.ceil(this.itemsCount / this.page.pageSize);
    const tempPages = [];
    for (let i = 0; i < this.pagesCount; i++) {
      tempPages.push(i + 1);
    }
    return tempPages;
  }

  setInitPageSize() {
    this.page.pageSize = this.pageSizeService.getPageSize();
    this.pageSize = this.page.pageSize;
  }

  isCurrentPage(pageNumber: number): boolean {
    return this.page.pageIndex + 1 === pageNumber;
  }

  onPageChange(pageNumber: number) {
    this.page.pageIndex = pageNumber - 1;
    this.onChangePagination();
  }

  onClickNext() {
    this.page.pageIndex += 1;
    this.onChangePagination();
  }

  onClickPrevious() {
    this.page.pageIndex -= 1;
    this.onChangePagination();
  }

  firstPage(): boolean {
    if (this.page.pageIndex === 0) {
      return true;
    }
    return false;
  }

  lastPage(): boolean {
    if (this.page.pageIndex === this.pagesCount - 1) {
      return true;
    }
    return false;
  }

  onPageSizeChange() {
    if (this.pageSize > 50) {
      this.pageSize = 50;
      this.translate.get('alertify.error.onPageSizeChangeMax').subscribe(
        translation => {
          this.alertify.error(translation);
        });
    }
    if (this.pageSize < 10) {
      this.pageSize = 10;
      this.translate.get('alertify.error.onPageSizeChangeMin').subscribe(
        translation => {
          this.alertify.error(translation);
        });
    }
    this.page.pageSize = this.pageSize;
    this.setPageSize();
    this.onChangePagination();
  }

  private setPageSize() {
    this.pageSizeService.setPageSize(this.page.pageSize);
  }

  private onChangePagination() {
    this.changePagination.emit(this.page);
  }
}
