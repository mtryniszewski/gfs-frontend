import { FabricService } from './../../fabric/services/fabric.service';
import { FabricBasic, Fabric } from './../../fabric/models/fabric.model';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ResetPasswordComponent } from './../../auth/containers/reset-password/reset-password.component';
import { FurnitureType } from './../../core/enums/furniture-type.enum';
import {
  FabricIds,
  FurnitureInfos,
  Dimensions,
  EveryFurniture
} from './../models/furniture-data.model';
import { Injectable, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResultDto } from 'src/app/shared/models/request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private destroy$ = new Subject<boolean>();
  constructor(
    private restService: RestService,
    private alertify: AlertifyService,
    private translate: TranslateService
  ) { }

  newFurniture(furniture: EveryFurniture): Observable<void> {
    const endpoint = this.getEndpoint(furniture.furnitureType);
    if (endpoint != null) {
      return this.restService.post<EveryFurniture, any>('/Furniture/' + endpoint, furniture);
    } else {
      this.translate
        .get('alertify.error.generatingError')
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(translation => {
          this.alertify.success(translation);
        });
    }
  }

  getEndpoint(furnitureType: FurnitureType): string {
    switch (furnitureType.toString()) {
      case FurnitureType.BasicBottom.toString():
        return 'basicbottom';
      case FurnitureType.OnlyDrawersBottom.toString():
        return 'onlydrawersbottom';
      case FurnitureType.ThreePartsHigh.toString():
        return 'threepartshigh';
      case FurnitureType.TwoPartsHigh.toString():
        return 'twopartshigh';
      case FurnitureType.SinkBottom.toString():
        return 'sinkbottom';
      case FurnitureType.BlindSideBottom.toString():
        return 'blindsidebottom';
      case FurnitureType.PentagonCornerBottom.toString():
        return 'pentagoncornerbottom';
      case FurnitureType.BasicWithDrawerBottom.toString():
        return 'basicwithdrawerbottom';
      case FurnitureType.LCornerBottom.toString():
        return 'lcornerbottom';
      case FurnitureType.BasicTop.toString():
        return 'basictop';
      case FurnitureType.CutFinalBottom.toString():
        return 'cutfinalbottom';
      case FurnitureType.OneHorizontalTop.toString():
        return 'onehorizontaltop';
      case FurnitureType.TwoHorizontalTop.toString():
        return 'twohorizontaltop';
      case FurnitureType.ThreeHorizontalTop.toString():
        return 'threehorizontaltop';
      case FurnitureType.BasicGlassTop.toString():
        return 'basicglasstop';
      case FurnitureType.OneHorizontalGlassTop.toString():
        return 'onehorizontalglasstop';
      case FurnitureType.TwoHorizontalGlassTop.toString():
        return 'twohorizontalglasstop';
      case FurnitureType.ThreeHorizontalGlassTop.toString():
        return 'threehorizontalglasstop';
      default:
        console.log('Wystąpił błąd podczas wykrywania typu mebla (form-data.service.ts)');
    }
  }

}
