import { NgModule } from '@angular/core';

import { NewProducerComponent } from './components/new-producer/new-producer.component';
import { ProducersListComponent } from './components/producers-list/producers-list.component';
import { EditProducerComponent } from './components/edit-producer/edit-producer.component';

import { SharedModule } from '../shared/shared.module';
import { ProducerRoutingModule } from './producer-routing.module';
import { ArchiveProducerComponent } from './components/archive-producer/archive-producer.component';

@NgModule({
  imports: [
    SharedModule,
    ProducerRoutingModule
  ],
  declarations: [
    NewProducerComponent,
    ProducersListComponent,
    EditProducerComponent,
    ArchiveProducerComponent
  ]
})
export class ProducerModule { }
