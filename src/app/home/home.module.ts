import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { AboutComponent } from './about/about.component';
import { SidebarComponent } from './sidebar/sidebar.component';
 
@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgxHmCarouselModule,
  ],
  declarations: [
    HomepageComponent,
    HelpComponent,
    DashboardComponent,
    AboutComponent,
    SidebarComponent
  ]
})

export class HomeModule { }
