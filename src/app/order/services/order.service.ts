import { OrderRequest, NewOrderRequest, EditOrderRequest } from './../models/order-request.model';
import { Observable } from 'rxjs';
import { RestService } from './../../core/services/rest.service';
import { Injectable } from '@angular/core';
import { ResultDto } from '../../shared/models/request-dto.model';
import { Order, OrderDetails } from '../models/order.model';
import { Page } from '../../shared/models/page.model';
import { Orders } from '../models/orders.model';
import { FurnitureIdRequest } from '../models/furniture.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private restService: RestService
  ) { }

  getOrder(orderId: number): Observable<ResultDto<Order>> {
    return this.restService.get<ResultDto<Order>>('/Order/' + orderId);
  }

  getOrderDetails(orderId: number): Observable<ResultDto<OrderDetails>> {
    return this.restService.get<ResultDto<OrderDetails>>('/Order/details/' + orderId);
  }

  getAllOrders(pages: Page): Observable<ResultDto<Orders>> {
    return this.restService.get<ResultDto<Orders>>(`/Order/all?page=${pages.page}&pageSize=${pages.pageSize}`);
  }

  getAllSearchOrders(pages: Page, searchBy: string): Observable<ResultDto<Orders>> {
    return this.restService.get<ResultDto<Orders>>(`/Order/all?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}`);
  }
  getUserOrders(pages: Page, userId: string): Observable<ResultDto<Orders>> {
    return this.restService.get<ResultDto<Orders>>(`/Order?page=${pages.page}&pageSize=${pages.pageSize}&userId=${userId}`);
  }

  getUserSearchOrders(pages: Page, searchBy: string, userId: string): Observable<ResultDto<Orders>> {
    return this.restService.get<ResultDto<Orders>>(
      `/Order?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}&userId=${userId}`);
  }

  confirmOrder(confirmOrder: OrderRequest): Observable<void> {
    return this.restService.patch<OrderRequest, void>('/Order/confirm/' + confirmOrder.id, confirmOrder, false);
  }

  archiveOrder(archiveOrder: OrderRequest): Observable<void> {
    return this.restService.patch<OrderRequest, void>('/Order/archive/' + archiveOrder.id, archiveOrder, false);
  }

  newOrder(order: NewOrderRequest): Observable<void> {
    return this.restService.post<NewOrderRequest, any>('/Order', order);
  }

  editOrder(order: EditOrderRequest): Observable<void> {
    return this.restService.put<EditOrderRequest, any>('/Order/' + order.id, order, false);
  }

  downloadOrderPdf(orderId: number): Observable<Blob> {
    return this.restService.getBlob(
      '/PdfCreator/' + orderId
    );
  }

  deleteFurniture(furnitureId: FurnitureIdRequest): Observable<number> {
    return this.restService.delete<number>('/Furniture/' + furnitureId.id);
  }
}
