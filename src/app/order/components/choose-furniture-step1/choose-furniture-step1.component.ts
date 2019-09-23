import { Subject } from 'rxjs/internal/Subject';
import { ErrorCodes } from './../../../core/enums/error-code.enum';
import { DrawerType } from './../../../core/enums/drawer-type.enum';
import { DrawerConfiguration } from './../../../core/enums/drawer-configuration.enum';
import { FurnitureTypeTranslated, FurnitureType } from './../../../core/enums/furniture-type.enum';
import { AlertifyService } from './../../../core/services/alertify.service';
import { EventBusService } from './../../../core/services/event-bus.service';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EveryFurniture, FurnitureInfos } from './../../models/furniture-data.model';
import { FormDataService } from './../../services/form-data.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DrawerTypeTranslated } from 'src/app/core/enums/drawer-type.enum';
import { DrawerConfigurationTranslated } from 'src/app/core/enums/drawer-configuration.enum';
import { max, takeUntil } from 'rxjs/operators';

enum FormControlNames {
  NAME = 'name',
  COUNT = 'count',
  DRAWER_TYPE = 'drawerType',
  DRAWER_CONFIGURATION = 'drawerConfiguration',
  FURNITURE_TYPE = 'funritureType'
}

@Component({
  selector: 'app-choose-furniture-step1',
  templateUrl: './choose-furniture-step1.component.html',
  styleUrls: ['./choose-furniture-step1.component.scss']
})
export class ChooseFurnitureStep1Component implements OnInit, OnDestroy {

  @Input() infos: FurnitureInfos;
  furnitureTypes = FurnitureTypeTranslated;
  drawerConfigurations = DrawerConfigurationTranslated;
  drawerTypes = DrawerTypeTranslated;

  isDrawerType = false;
  isDrawerConfiguration = false;


  drawerConfiguration: DrawerConfiguration;
  drawerType: DrawerType;
  count = 1;
  name: string;
  orderId: number;

  step1Form: FormGroup;
  formControlNames = FormControlNames;

  @Output() step2a = new EventEmitter<boolean>();
  @Output() sendDataToParent = new EventEmitter<FurnitureInfos>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private eventBus: EventBusService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.step1Form = this.formBuilder.group({
      [FormControlNames.NAME]: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      [FormControlNames.COUNT]: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      [FormControlNames.DRAWER_CONFIGURATION]: [null],
      [FormControlNames.DRAWER_TYPE]: [null],
      [FormControlNames.FURNITURE_TYPE]: [null, [Validators.required]]
    }
    );
    this.setForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.step1Form.valid) {
      this.setData();
      this.goToStep2();
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

  goToStep2() {
    this.sendDataToParent.emit(this.infos);
    this.step2a.emit();
  }
  setData() {
    this.infos = new FurnitureInfos();
    this.infos.count = this.step1Form.value[FormControlNames.COUNT];
    this.infos.name = this.step1Form.value[FormControlNames.NAME];
    this.infos.furnitureType = this.step1Form.value[FormControlNames.FURNITURE_TYPE];
    this.infos.drawerConfiguration = this.step1Form.value[FormControlNames.DRAWER_CONFIGURATION];
    this.infos.drawerType = this.step1Form.value[FormControlNames.DRAWER_TYPE];
    this.infos.orderId = this.orderId;
  }
  onTypeCheckDrawers(value) {
    switch (value.target.value) {
      case FurnitureType.BasicWithDrawerBottom.toString():
        this.resetDrawer();
        this.setDrawerType();
        break;
      case FurnitureType.OnlyDrawersBottom.toString():
        this.setDrawerType();
        this.setDrawerConfiguration();
        break;
      default:
        this.resetDrawer();
        break;
    }
  }
  setDrawerType() {
    this.isDrawerType = true;
  }
  setDrawerConfiguration() {
    this.isDrawerConfiguration = true;
  }
  resetDrawer() {
    this.isDrawerConfiguration = false;
    this.isDrawerType = false;
  }

  private setForm() {
    if (this.infos.name == null) {
      this.step1Form.setValue({
        [FormControlNames.NAME]: null,
        [FormControlNames.COUNT]: 1,
        [FormControlNames.DRAWER_CONFIGURATION]: null,
        [FormControlNames.DRAWER_TYPE]: null,
        [FormControlNames.FURNITURE_TYPE]: null
      });
    } else {
      this.step1Form.setValue({
        [FormControlNames.NAME]: this.infos.name,
        [FormControlNames.COUNT]: this.infos.count,
        [FormControlNames.DRAWER_CONFIGURATION]: this.infos.drawerConfiguration,
        [FormControlNames.DRAWER_TYPE]: this.infos.drawerType,
        [FormControlNames.FURNITURE_TYPE]: this.infos.furnitureType
      });
    }

  }
}
