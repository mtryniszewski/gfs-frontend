import { Furniture } from './../../models/furniture.model';
import { FurnitureType } from './../../../core/enums/furniture-type.enum';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Dimensions } from '../../models/furniture-data.model';
import { Subject } from 'rxjs';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { takeUntil } from 'rxjs/operators';


enum FormControlNames {
  WIDTH = 'width',
  DEPTH = 'depth',
  HEIGHT = 'height',
  WIDTH1 = 'width1',
  WIDTH2 = 'width2',
  DEPTH1 = 'depth1',
  DEPTH2 = 'depth2',
  FRONT_COUNT = 'frontCount',
  SHELF_COUNT = 'shelfCount',
  FRAME_THICKNESS = 'frameThickness',
  BOTTOM_FRONT_HEIGHT = 'bottomFrontHeight',
  TOP_FRONT_HEIGHT = 'topFrontHeight',
  FRONT_WIDTH = 'frontWidth'
}

@Component({
  selector: 'app-choose-dimensions-step3',
  templateUrl: './choose-dimensions-step3.component.html',
  styleUrls: ['./choose-dimensions-step3.component.scss']
})
export class ChooseDimensionsStep3Component implements OnInit, OnDestroy {

  @Input() dimensions: Dimensions;

  height: number;
  depth: number;
  width: number;
  depth1: number;
  depth2: number;
  width1: number;
  width2: number;
  frontWidth: number;
  frontCount: number;
  shelfCount: number;
  frameThickness: number;
  bottomFrontHeight: number;
  topFrontHeight: number;

  isDepth = false;
  isDepth1 = false;
  isDepth2 = false;
  isWidth = false;
  isWidth1 = false;
  isWidth2 = false;
  isFrontCount = false;
  isShelfCount = false;
  isFrameThickness = false;
  isBottomFrontHeight = false;
  isTopFrontHeight = false;
  isFrontWidth = false;
  isHeight = false;

  step3Form: FormGroup;
  formControlNames = FormControlNames;

  @Input() furnitureType: FurnitureType;
  @Output() step4a = new EventEmitter<boolean>();
  @Output() step2a = new EventEmitter<boolean>();
  @Output() sendDataToParent = new EventEmitter<Dimensions>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private eventBus: EventBusService
  ) { }

  ngOnInit() {
    this.step3Form = this.formBuilder.group({
      [FormControlNames.BOTTOM_FRONT_HEIGHT]: [null, [Validators.min(500), Validators.max(1000)]],
      [FormControlNames.DEPTH]: [null, [Validators.min(100), Validators.max(1000)]],
      [FormControlNames.DEPTH1]: [null, [Validators.min(500), Validators.max(1300)]],
      [FormControlNames.DEPTH2]: [null, [Validators.min(500), Validators.max(1300)]],
      [FormControlNames.WIDTH]: [null, [Validators.min(100), Validators.max(1300)]],
      [FormControlNames.WIDTH1]: [null, [Validators.min(800), Validators.max(1300)]],
      [FormControlNames.WIDTH2]: [null, [Validators.min(800), Validators.max(1300)]],
      [FormControlNames.FRONT_WIDTH]: [null, [Validators.max(1000), Validators.min(455)]],
      [FormControlNames.TOP_FRONT_HEIGHT]: [null, [Validators.min(300), Validators.max(1000)]],
      [FormControlNames.FRAME_THICKNESS]: [null, [Validators.max(200), Validators.min(40)]],
      [FormControlNames.FRONT_COUNT]: [null, [Validators.min(0), Validators.max(2)]],
      [FormControlNames.SHELF_COUNT]: [null, [Validators.min(0), Validators.max(5)]],
      [FormControlNames.HEIGHT]: [null, [Validators.min(400), Validators.max(2200)]]
    });
    this.setFormFields();
    this.setForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.step3Form.valid) {
      this.setData();
      this.goToStep4();
    } else {
      this.translate
        .get('alertify.warning.checkForm')
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(translation => {
          this.alertify.error(translation);
        });
    }
  }

  setData() {
    this.dimensions = new Dimensions();
    this.dimensions.depth = this.step3Form.value[FormControlNames.DEPTH],
      this.dimensions.depth1 = this.step3Form.value[FormControlNames.DEPTH1],
      this.dimensions.depth2 = this.step3Form.value[FormControlNames.DEPTH2],
      this.dimensions.width = this.step3Form.value[FormControlNames.WIDTH],
      this.dimensions.width1 = this.step3Form.value[FormControlNames.WIDTH1],
      this.dimensions.width2 = this.step3Form.value[FormControlNames.WIDTH2],
      this.dimensions.height = this.step3Form.value[FormControlNames.HEIGHT],
      this.dimensions.frontWidth = this.step3Form.value[FormControlNames.FRONT_WIDTH],
      this.dimensions.bottomFrontHeight = this.step3Form.value[FormControlNames.BOTTOM_FRONT_HEIGHT],
      this.dimensions.topFrontHeight = this.step3Form.value[FormControlNames.TOP_FRONT_HEIGHT],
      this.dimensions.shelfCount = this.step3Form.value[FormControlNames.SHELF_COUNT],
      this.dimensions.frontCount = this.step3Form.value[FormControlNames.FRONT_COUNT],
      this.dimensions.frameThickness = this.step3Form.value[FormControlNames.FRAME_THICKNESS];
  }

  back() {
    this.step2a.emit();
  }


  goToStep4() {
    this.sendDataToParent.emit(this.dimensions);
    this.step4a.emit();
  }



  private setForm() {
    if (this.furnitureType.toString() !== FurnitureType.SingleFormatter.toString()) {
      if (this.dimensions.height == null) {
        this.step3Form.setValue({
          [FormControlNames.BOTTOM_FRONT_HEIGHT]: null,
          [FormControlNames.DEPTH]: 520,
          [FormControlNames.DEPTH1]: null,
          [FormControlNames.DEPTH2]: null,
          [FormControlNames.WIDTH]: 600,
          [FormControlNames.WIDTH1]: null,
          [FormControlNames.WIDTH2]: null,
          [FormControlNames.FRONT_WIDTH]: null,
          [FormControlNames.TOP_FRONT_HEIGHT]: null,
          [FormControlNames.FRAME_THICKNESS]: 50,
          [FormControlNames.FRONT_COUNT]: null,
          [FormControlNames.SHELF_COUNT]: null,
          [FormControlNames.HEIGHT]: 720
        });
      } else {
        this.step3Form.setValue({
          [FormControlNames.BOTTOM_FRONT_HEIGHT]: this.dimensions.bottomFrontHeight,
          [FormControlNames.DEPTH]: this.dimensions.depth,
          [FormControlNames.DEPTH1]: this.dimensions.depth1,
          [FormControlNames.DEPTH2]: this.dimensions.depth2,
          [FormControlNames.WIDTH]: this.dimensions.width,
          [FormControlNames.WIDTH1]: this.dimensions.width1,
          [FormControlNames.WIDTH2]: this.dimensions.width2,
          [FormControlNames.FRONT_WIDTH]: this.dimensions.frontWidth,
          [FormControlNames.TOP_FRONT_HEIGHT]: this.dimensions.topFrontHeight,
          [FormControlNames.FRAME_THICKNESS]: this.dimensions.frameThickness,
          [FormControlNames.FRONT_COUNT]: this.dimensions.frontCount,
          [FormControlNames.SHELF_COUNT]: this.dimensions.shelfCount,
          [FormControlNames.HEIGHT]: this.dimensions.height
        });
      }
    } else {
      if (this.dimensions.width == null) {
        this.step3Form.setValue({
          [FormControlNames.BOTTOM_FRONT_HEIGHT]: null,
          [FormControlNames.DEPTH]: 520,
          [FormControlNames.DEPTH1]: null,
          [FormControlNames.DEPTH2]: null,
          [FormControlNames.WIDTH]: 600,
          [FormControlNames.WIDTH1]: null,
          [FormControlNames.WIDTH2]: null,
          [FormControlNames.FRONT_WIDTH]: null,
          [FormControlNames.TOP_FRONT_HEIGHT]: null,
          [FormControlNames.FRAME_THICKNESS]: 50,
          [FormControlNames.FRONT_COUNT]: null,
          [FormControlNames.SHELF_COUNT]: null,
          [FormControlNames.HEIGHT]: 720
        });
      } else {
        this.step3Form.setValue({
          [FormControlNames.BOTTOM_FRONT_HEIGHT]: this.dimensions.bottomFrontHeight,
          [FormControlNames.DEPTH]: this.dimensions.depth,
          [FormControlNames.DEPTH1]: this.dimensions.depth1,
          [FormControlNames.DEPTH2]: this.dimensions.depth2,
          [FormControlNames.WIDTH]: this.dimensions.width,
          [FormControlNames.WIDTH1]: this.dimensions.width1,
          [FormControlNames.WIDTH2]: this.dimensions.width2,
          [FormControlNames.FRONT_WIDTH]: this.dimensions.frontWidth,
          [FormControlNames.TOP_FRONT_HEIGHT]: this.dimensions.topFrontHeight,
          [FormControlNames.FRAME_THICKNESS]: this.dimensions.frameThickness,
          [FormControlNames.FRONT_COUNT]: this.dimensions.frontCount,
          [FormControlNames.SHELF_COUNT]: this.dimensions.shelfCount,
          [FormControlNames.HEIGHT]: this.dimensions.height
        });
      }
    }

  }

  setFormFields() {
    switch (this.furnitureType.toString()) {
      case FurnitureType.SingleFormatter.toString():
        this.isDepth = true;
        this.isWidth = true;
        break;
      case FurnitureType.BasicBottom.toString():
        this.isHeight = true;
        this.isDepth = true;
        this.isWidth = true;
        this.isShelfCount = true;
        this.isFrontCount = true;
        break;
      case FurnitureType.BasicGlassTop.toString():
        this.isHeight = true;
        this.isDepth = true;
        this.isWidth = true;
        this.isShelfCount = true;
        this.isFrontCount = true;
        this.isFrameThickness = true;
        break;
      case FurnitureType.BasicTop.toString():
        this.isHeight = true;
        this.isDepth = true;
        this.isWidth = true;
        this.isShelfCount = true;
        this.isFrontCount = true;
        break;
      case FurnitureType.BasicWithDrawerBottom.toString():
        this.isHeight = true;
        this.isDepth = true;
        this.isWidth = true;
        this.isShelfCount = true;
        this.isFrontCount = true;
        break;
      case FurnitureType.BlindSideBottom.toString():
        this.isHeight = true;
        this.isDepth = true;
        this.isWidth = true;
        this.isFrontWidth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.CutFinalBottom.toString():
        this.isHeight = true;
        this.isDepth1 = true;
        this.isDepth2 = true;
        this.isWidth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.LCornerBottom.toString():
        this.isHeight = true;
        this.isWidth1 = true;
        this.isWidth2 = true;
        this.isDepth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.LCornerTop.toString():
        this.isHeight = true;
        this.isWidth1 = true;
        this.isWidth2 = true;
        this.isDepth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.OneHorizontalTop.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.TwoHorizontalTop.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.ThreeHorizontalTop.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.OneHorizontalGlassTop.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        this.isFrameThickness = true;
        break;
      case FurnitureType.TwoHorizontalGlassTop.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        this.isFrameThickness = true;
        break;
      case FurnitureType.ThreeHorizontalGlassTop.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        this.isFrameThickness = true;
        break;
      case FurnitureType.OnlyDrawersBottom.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        break;
      case FurnitureType.OvenMicroHigh.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.PentagonCornerBottom.toString():
        this.isHeight = true;
        this.isWidth1 = true;
        this.isWidth2 = true;
        this.isDepth1 = true;
        this.isDepth2 = true;
        this.isShelfCount = true;
        break;
      case FurnitureType.SinkBottom.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isFrontCount = true;
        break;
      case FurnitureType.TwoPartsHigh.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        this.isBottomFrontHeight = true;
        break;
      case FurnitureType.ThreePartsHigh.toString():
        this.isHeight = true;
        this.isWidth = true;
        this.isDepth = true;
        this.isShelfCount = true;
        this.isBottomFrontHeight = true;
        this.isTopFrontHeight = true;
        break;
      default:
        break;

    }
  }
}
