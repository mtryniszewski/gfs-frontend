import { AlertifyService } from 'src/app/core/services/alertify.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { takeUntil } from 'rxjs/operators';
import { FurnitureInfos, Dimensions, FabricIds, EveryFurniture } from './../../models/furniture-data.model';
import { FurnitureType, FurnitureTypeTranslated } from './../../../core/enums/furniture-type.enum';
import { FormDataService } from './../../services/form-data.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-furniture',
  templateUrl: './new-furniture.component.html',
  styleUrls: ['./new-furniture.component.scss']
})
export class NewFurnitureComponent implements OnInit, OnDestroy {

  furnitureToSend = new EveryFurniture();
  furnitureTypes = FurnitureTypeTranslated;
  step1 = false;
  step2 = false;
  step3 = false;
  step4 = false;
  step1Data = new FurnitureInfos();
  step2Data = new FabricIds();
  step3Data = new Dimensions();

  imgPath: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formDataService: FormDataService,
    private translate: TranslateService,
    private alertify: AlertifyService,
    private eventBus: EventBusService,
    private router: Router
  ) { }


  ngOnInit() {
    this.step1 = true;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getStep1Data(data) {
    this.step1Data = data;
  }

  getStep2Data(data) {
    this.step2Data = data;
  }

  getStep3Data(data) {
    this.step3Data = data;
  }


  onStep2() {
    this.step1 = false;
    this.step2 = true;
    this.imgPath = './../../../../assets/furnitures/'
    + FurnitureType[this.step1Data.furnitureType]
     + '.png';
  }

  onStep3() {
    this.step2 = false;
    this.step3 = true;
  }
  onStep4() {
    this.step3 = false;
    this.step4 = true;
  }


  backToStep1() {
    this.step2 = false;
    this.step1 = true;
  }

  backToStep2() {
    this.step3 = false;
    this.step2 = true;
  }

  backToStep3() {
    this.step4 = false;
    this.step3 = true;
  }

  setFurnitureFields() {
    this.furnitureToSend.orderId = this.step1Data.orderId;
    this.furnitureToSend.name = this.step1Data.name;
    this.furnitureToSend.furnitureType = this.step1Data.furnitureType;
    this.furnitureToSend.drawerConfiguration = this.step1Data.drawerConfiguration;
    this.furnitureToSend.drawerType = this.step1Data.drawerType;

    this.furnitureToSend.backFabricId = this.step2Data.backFabricId;
    this.furnitureToSend.corpusFabricId = this.step2Data.corpusFabricId;
    this.furnitureToSend.frontFabricId = this.step2Data.frontFabricId;

    this.furnitureToSend.depth = this.step3Data.depth;
    this.furnitureToSend.depth1 = this.step3Data.depth1;
    this.furnitureToSend.depth2 = this.step3Data.depth2;
    this.furnitureToSend.width = this.step3Data.width;
    this.furnitureToSend.width1 = this.step3Data.width1;
    this.furnitureToSend.width2 = this.step3Data.width2;
    this.furnitureToSend.height = this.step3Data.height;
    this.furnitureToSend.shelfCount = this.step3Data.shelfCount;
    this.furnitureToSend.frontCount = this.step3Data.frontCount;
    this.furnitureToSend.frameThickness = this.step3Data.frameThickness;
    this.furnitureToSend.bottomFrontHeight = this.step3Data.bottomFrontHeight;
    this.furnitureToSend.topFrontHeight = this.step3Data.topFrontHeight;
    this.furnitureToSend.frontWidth = this.step3Data.frontWidth;
  }

  sendForm() {
    this.setFurnitureFields();
    for (let i = 0; i < this.step1Data.count; i++) {
      this.formDataService
        .newFurniture(this.furnitureToSend)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.translate
            .get('alertify.success.generated')
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(translation => {
              this.alertify.success(translation);
            });
          this.router.navigate(['/order/details/' + this.step1Data.orderId]);
          this.eventBus.publish<EveryFurniture>(this.furnitureToSend);
        });
    }
  }

}
