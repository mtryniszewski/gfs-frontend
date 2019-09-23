import { SimpleProducers } from './../models/producers.model';
import { EditProducerRequest, NewProducerRequest } from './../models/producer-request.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestService } from '../../core/services/rest.service';
import { ResultDto } from '../../shared/models/request-dto.model';
import { Producer } from '../models/producer.model';
import { Page } from '../../shared/models/page.model';
import { Producers } from '../models/producers.model';
import { ProducerRequest } from '../models/producer-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private restService: RestService) { }

  getProducer(producerId: number): Observable<ResultDto<Producer>> {
    return this.restService.get<ResultDto<Producer>>('/Producer/' + producerId);
  }

  getProducers(pages: Page): Observable<ResultDto<Producers>> {
    return this.restService.get<ResultDto<Producers>>(
      `/Producer?page=${pages.page}&pageSize=${pages.pageSize}`
    );
  }
  getSimpleProducers(pages: Page): Observable<ResultDto<SimpleProducers>> {
    return this.restService.get<ResultDto<SimpleProducers>>(
      `/Producer/simple?page=${pages.page}&pageSize=${pages.pageSize}`
    );
  }
  getSearchProducers(pages: Page, searchBy: string): Observable<ResultDto<Producers>> {
    return this.restService.get<ResultDto<Producers>>(
      `/Producer?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}`
    );
  }

  newProducer(producer: NewProducerRequest): Observable<void> {
    return this.restService.post<NewProducerRequest, void>('/Producer', producer, false);
  }

  editProducer(producer: EditProducerRequest): Observable<void> {
    return this.restService.put<EditProducerRequest, void>('/Producer/' + producer.id, producer, false);
  }

  archiveProducer(producerId: ProducerRequest): Observable<void> {
    return this.restService.patch<ProducerRequest, void>('/Producer/archive/' + producerId.id, producerId, false);
  }

  dearchiveProducer(producerId: ProducerRequest): Observable<void> {
    return this.restService.patch<ProducerRequest, void>('/Producer/dearchive/' + producerId.id, producerId, false);
  }

}
