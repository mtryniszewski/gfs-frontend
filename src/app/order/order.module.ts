import { SharedModule } from './../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { OrderArchiveComponent } from './components/order-archive/order-archive.component';
import { OrderAdminDetailsComponent } from './components/order-admin-details/order-admin-details.component';
import { ChooseFabricComponent } from './components/choose-fabric-step2/choose-fabric.component';
import { ChooseFurnitureStep1Component } from './components/choose-furniture-step1/choose-furniture-step1.component';
import { ChooseDimensionsStep3Component } from './components/choose-dimensions-step3/choose-dimensions-step3.component';
import { WizardNavComponent } from './components/wizard-nav/wizard-nav.component';
import { SummaryStep4Component } from './components/summary-step4/summary-step4.component';
import { NewFurnitureComponent } from './components/new-furniture/new-furniture.component';
import { FurnitureListComponent } from './components/furniture-list/furniture-list.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { FormattersListComponent } from './components/formatters-list/formatters-list.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { NewFurnitureFabricPreviewComponent } from './components/new-furniture-fabric-preview/new-furniture-fabric-preview.component';
@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule,
    NgbCollapseModule
  ],
  declarations: [
    OrdersListComponent,
    OrderAdminDetailsComponent,
    ChooseFabricComponent,
    ChooseFurnitureStep1Component,
    ChooseDimensionsStep3Component,
    WizardNavComponent,
    SummaryStep4Component,
    NewFurnitureComponent,
    FurnitureListComponent,
    FormattersListComponent,
    NewFurnitureFabricPreviewComponent
  ]
})
export class OrderModule { }
