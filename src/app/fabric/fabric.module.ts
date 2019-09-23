import { NgModule } from '@angular/core';

import { FabricRoutingModule } from './fabric-routing.module';
import { SharedModule } from './../shared/shared.module';

import { FabricsListComponent } from './components/fabrics-list/fabrics-list.component';
import { NewFabricComponent } from './components/new-fabric/new-fabric.component';
import { EditFabricComponent } from './components/edit-fabric/edit-fabric.component';
import { ArchiveFabricComponent } from './components/archive-fabric/archive-fabric.component';
import { FabricPreviewComponent } from './components/fabric-preview/fabric-preview.component';

@NgModule({
  imports: [
    SharedModule,
    FabricRoutingModule
  ],
  declarations: [
    FabricsListComponent,
    NewFabricComponent,
    EditFabricComponent,
    ArchiveFabricComponent,
    FabricPreviewComponent
  ]
})
export class FabricModule { }
