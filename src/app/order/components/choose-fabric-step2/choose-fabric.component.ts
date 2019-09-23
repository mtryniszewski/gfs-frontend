import { Fabric } from './../../../fabric/models/fabric.model';
import { ModalService } from 'src/app/core/services/modal.service';
import { NewFurnitureFabricPreviewComponent } from './../new-furniture-fabric-preview/new-furniture-fabric-preview.component';
import { FormDataService } from './../../services/form-data.service';
import { DefaultPages, Page } from './../../../shared/models/page.model';
import { FabricService } from 'src/app/fabric/services/fabric.service';
import { AlertifyService } from './../../../core/services/alertify.service';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { TranslateService } from '@ngx-translate/core';
import { FabricIds } from './../../models/furniture-data.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NgOption, NgSelectConfig } from '@ng-select/ng-select';

enum FormControlNames {
  BACK_FABRIC = 'backFabric',
  FRONT_FABRIC = 'frontFabric',
  CORPUS_FABRIC = 'corpusFabric'
}
@Component({
  selector: 'app-choose-fabric',
  templateUrl: './choose-fabric.component.html',
  styleUrls: ['./choose-fabric.component.scss']
})
export class ChooseFabricComponent implements OnInit, OnDestroy {

  fabricList: NgOption[];
  allFabrics: Fabric[];
  @Input() fabrics: FabricIds;

  backFabricId: number;
  frontFabricId: number;
  corpusFabricId: number;

  backFabricImageUrl = '';
  frontFabricImageUrl = '';
  corpusFabricImageUrl = '';

  tempFabric = new Fabric();

  step2Form: FormGroup;
  formControlNames = FormControlNames;

  @Output() step1a = new EventEmitter<boolean>();
  @Output() step3a = new EventEmitter<boolean>();
  @Output() sendDataToParent = new EventEmitter<FabricIds>();

  @ViewChild('fabricPreview') fabricPreview: NewFurnitureFabricPreviewComponent;

  private destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private config: NgSelectConfig,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private eventBus: EventBusService,
    private alertify: AlertifyService,
    private fabricService: FabricService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.config.notFoundText = 'Ładowanie...';
    this.loadFabrics();
    this.step2Form = this.formBuilder.group({
      [FormControlNames.BACK_FABRIC]: [null, [Validators.required]],
      [FormControlNames.FRONT_FABRIC]: [null],
      [FormControlNames.CORPUS_FABRIC]: [null, [Validators.required]]
    });
    this.setForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onFormSubmit() {
    if (this.step2Form.valid) {
      this.setData();
      this.goToStep3();
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

  back() {
    this.step1a.emit();
  }

  goToStep3() {
    this.sendDataToParent.emit(this.fabrics);
    this.step3a.emit();
  }

  setData() {
    this.fabrics = new FabricIds();
    this.fabrics.backFabricId = this.step2Form.value[FormControlNames.BACK_FABRIC];
    this.fabrics.frontFabricId = this.step2Form.value[FormControlNames.FRONT_FABRIC];
    this.fabrics.corpusFabricId = this.step2Form.value[FormControlNames.CORPUS_FABRIC];
  }

  private setForm() {
    if (this.fabrics.backFabricId == null && this.fabrics.frontFabricId == null && this.fabrics.corpusFabricId == null) {
      this.step2Form.setValue({
        [FormControlNames.BACK_FABRIC]: null,
        [FormControlNames.CORPUS_FABRIC]: null,
        [FormControlNames.FRONT_FABRIC]: null
      });
    } else {
      this.step2Form.setValue({
        [FormControlNames.BACK_FABRIC]: this.fabrics.backFabricId,
        [FormControlNames.CORPUS_FABRIC]: this.fabrics.corpusFabricId,
        [FormControlNames.FRONT_FABRIC]: this.fabrics.frontFabricId
      });


    }

  }

  loadFabrics() {
    const pages: Page = DefaultPages;
    this.fabricService
      .getFabrics(pages)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.fabricList = response.data.items;
        this.allFabrics = response.data.items;
      });
  }

  openFabricPreviewModal(fabricId: number) {
    this.modalService.open(NewFurnitureFabricPreviewComponent.ModalName);
    this.fabricPreview.loadFabric(this.allFabrics.find(x => x.id === fabricId));
  }
}
