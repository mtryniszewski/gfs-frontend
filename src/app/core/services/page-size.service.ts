import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Page } from '../../shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageSizeService {

  pages: Page;
  constructor() { }

  isPageSize(): boolean {
    if (this.getPageSize() === 0) {
      this.setPageSize(20);
      return false;
    }
    return true;
  }

  setPageSize(pageSize: number) {
    let num: string;
    num = String(pageSize);
    localStorage.setItem(environment.pageSize, num);
  }

  removePageSize() {
    localStorage.removeItem(environment.pageSize);
  }

  getPageSize(): number {
    let num: number;
    num = +localStorage.getItem(environment.pageSize);
    if (num === 0) {
      num = 20;
      this.setPageSize(num);
    }
    return num;
  }

  reloadPages(): Page {
    this.pages = {
      page: 0,
      pageSize: this.getPageSize()
    };
    return this.pages;
  }
}
