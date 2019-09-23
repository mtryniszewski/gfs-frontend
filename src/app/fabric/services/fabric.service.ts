import { Fabrics } from './../models/fabrics.model';
import { Fabric } from './../models/fabric.model';
import { Observable } from 'rxjs';
import { FabricRequest, NewFabricRequest, EditFabricRequest } from './../models/fabric-request.model';
import { Injectable } from '@angular/core';
import { RestService } from '../../core/services/rest.service';
import { ResultDto } from '../../shared/models/request-dto.model';
import { Page } from '../../shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class FabricService {

  constructor(private restService: RestService) { }

  getFabric(fabricId: number): Observable<ResultDto<Fabric>> {
    return this.restService.get<ResultDto<Fabric>>('/Fabric/' + fabricId);
  }

  getFabrics(pages: Page): Observable<ResultDto<Fabrics>> {
    return this.restService.get<ResultDto<Fabrics>>(`/Fabric?page=${pages.page}&pageSize=${pages.pageSize}`);
  }

  getSearchFabrics(pages: Page, searchBy: string): Observable<ResultDto<Fabrics>> {
    return this.restService.get<ResultDto<Fabrics>>(
      `/Fabric?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}`);
  }

  newFabric(fabric: NewFabricRequest): Observable<any> {
    return this.restService.post<NewFabricRequest, any>('/Fabric', fabric);
  }

  editFabric(fabric: EditFabricRequest): Observable<void> {
    return this.restService.put<EditFabricRequest, void>('/Fabric/' + fabric.id, fabric, false);
  }

  archiveFabric(fabricId: FabricRequest): Observable<void> {
    return this.restService.patch<FabricRequest, void>('/Fabric/archive/' + fabricId.id, fabricId, false);
  }

  dearchiveFabric(fabricId: FabricRequest): Observable<void> {
    return this.restService.patch<FabricRequest, void>('/Fabric/dearchive/' + fabricId.id, fabricId, false);
  }

}
