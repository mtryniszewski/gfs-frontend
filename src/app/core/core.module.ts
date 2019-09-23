import { AdminGuard } from './guards/admin.guard';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreRoutingModule } from './core-routing.module';
import { AppComponent } from './containers/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { AlertifyService } from './services/alertify.service';
import { environment } from '../../environments/environment';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LogoutGuard } from './guards/logout.guard';
import { ModalService } from './services/modal.service';
import { EventBusService } from './services/event-bus.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { StandardGuard } from './guards/standard.guard';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem(environment.token);
}

@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.host],
      }
    }),
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NavComponent
  ],
  providers: [
    AlertifyService,
    LoggedInGuard,
    LogoutGuard,
    ModalService,
    EventBusService,
    PaginationComponent,
    AdminGuard,
    StandardGuard
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}
