
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ArchivesRoutingModule } from './archives-routing.module';
import { UserArchivesComponent } from './components/user-archives/user-archives.component';
import { FabricArchivesComponent } from './components/fabric-archives/fabric-archives.component';
import { ProducerArchivesComponent } from './components/producer-archives/producer-archives.component';
import { DearchiveModalComponent } from './components/dearchive-modal/dearchive-modal.component';

@NgModule({
  imports: [
    SharedModule,
    ArchivesRoutingModule
  ],
  declarations: [
    UserArchivesComponent,
    FabricArchivesComponent,
    ProducerArchivesComponent,
    DearchiveModalComponent]
})
export class ArchivesModule { }
