import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';

import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app/app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxHmCarouselModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
