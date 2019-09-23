import { Furniture, FurnitureIdRequest } from './../../models/furniture.model';
import { FormattersListComponent } from './../formatters-list/formatters-list.component';
import { FurnitureListComponent } from './../furniture-list/furniture-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from './../../services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from './../../../core/services/alertify.service';
import { FormBuilder } from '@angular/forms';
import { EventBusService } from './../../../core/services/event-bus.service';
import { OrderDetails } from './../../models/order.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import { EveryFurniture } from '../../models/furniture-data.model';
import { FurnitureTypeTranslated, FurnitureType } from 'src/app/core/enums/furniture-type.enum';

@Component({
  selector: 'app-order-admin-details',
  templateUrl: './order-admin-details.component.html',
  styleUrls: ['./order-admin-details.component.scss']
})
export class OrderAdminDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('furnitureList') furniturelist: FurnitureListComponent;
  @ViewChild('formattersList') formattersList: FormattersListComponent;

  errorEvent = false;
  order: OrderDetails;
  orderId: number;
  furnitureTypes = FurnitureTypeTranslated;
  request: FurnitureIdRequest;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private translate: TranslateService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.loadOrder(this.orderId);
    this.eventBus
      .of(EveryFurniture)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadOrder(this.orderId);
      });
      this.eventBus
      .of(FurnitureIdRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadOrder(this.orderId);
      });


  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadOrder(orderId: number) {
    this.orderService
      .getOrderDetails(orderId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => {
        this.order = response.data;
      });
  }
  hasFurnitures(): boolean {
    if (this.order) {
      if (this.order.furnituresDetailsDtos && this.order.furnituresDetailsDtos.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  downloadPdf() {
    this.translate
      .get('alertify.success.order.downloadInfo')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(translation => {
        this.alertify.success(translation);
      });
    this.orderService
      .downloadOrderPdf(this.orderId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(blob => {
        this.translate
          .get('order.downloadOrder')
          .pipe(takeUntil(this.destroy$))
          .subscribe(translation => {
            saveAs(blob, 'Zamówienie' + this.orderId);
          });
      },

        () => {
          this.downloadFailed();
        });
  }

  private downloadFailed() {
    this.translate
      .get('alertify.error.downloadFailed')
      .pipe(takeUntil(this.destroy$))
      .subscribe(translation => {
        this.alertify.error(translation);
      });
  }

  getFurnitureType(type: FurnitureType): string {
    return this.furnitureTypes.find(x => x.id.toString() === type.toString()).name;
  }

  deleteFurniture(furnitureId: number) {
    this.request = new FurnitureIdRequest();
    this.request.id = furnitureId;
    this.orderService
      .deleteFurniture(this.request)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.translate
          .get('alertify.success.order.furnitureDeleted')
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(translation => {
            this.alertify.success(translation);
          });
        this.errorEvent = false;
        this.eventBus.publish<FurnitureIdRequest>(this.request);
      }, () => {
        this.errorEvent = true;
      });
  }
}

