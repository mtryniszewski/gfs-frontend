import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { BootstrapErrorsDirective } from './directives/bootstrap-errors.directive';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { NgSelectModule } from '@ng-select/ng-select';


const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  NgSelectModule
];

const DIRECTIVES = [
  BootstrapErrorsDirective
];

const COMPONENTS = [
  ModalComponent,
  PaginationComponent
];

const PIPES = [

];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS,
    ...PIPES,
    FilterUserPipe
  ],
  exports: [
    ...MODULES,
    ...DIRECTIVES,
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedModule { }
