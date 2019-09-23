import { Fabrics } from './../../fabric/models/fabrics.model';
import { Users } from './../../user/models/users.model';
import { Producers } from './../../producer/models/producers.model';
import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { ResultDto } from 'src/app/shared/models/request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {

  constructor(private restService: RestService) { }

  getProducers(pages: Page): Observable<ResultDto<Producers>> {
    return this.restService.get<ResultDto<Producers>>(
      `/Producer/archives?page=${pages.page}&pageSize=${pages.pageSize}`
    );
  }

  getSearchProducers(pages: Page, searchBy: string): Observable<ResultDto<Producers>> {
    return this.restService.get<ResultDto<Producers>>(
      `/Producer/archives?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}`
    );
  }

  getUsers(pages: Page): Observable<ResultDto<Users>> {
    return this.restService.get<ResultDto<Users>>(
      `/User/archives?page=${pages.page}&pageSize=${pages.pageSize}`
    );
  }

  getSearchUsers(pages: Page, searchBy: string): Observable<ResultDto<Users>> {
    return this.restService.get<ResultDto<Users>>(
      `/User/archives?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}`
    );
  }

  getFabrics(pages: Page): Observable<ResultDto<Fabrics>> {
    return this.restService.get<ResultDto<Fabrics>>(
      `/Fabric/archives?page=${pages.page}&pageSize=${pages.pageSize}`
    );
  }

  getSearchFabrics(pages: Page, searchBy: string): Observable<ResultDto<Fabrics>> {
    return this.restService.get<ResultDto<Fabrics>>(
      `/Fabric/archives?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}`
    );
  }
}
