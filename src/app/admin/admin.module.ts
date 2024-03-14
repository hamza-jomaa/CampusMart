import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StoreRequestComponent } from './store-request/store-request.component';
import { MerchandiseRequestComponent } from './merchandise-request/merchandise-request.component';
import { ConsumerInfoComponent } from './consumer-info/consumer-info.component';
import { StoreInfoComponent } from './store-info/store-info.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactusReqComponent } from './contactus-req/contactus-req.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    SidebarComponent,
    AdminDashboardComponent,
    StoreRequestComponent,
    MerchandiseRequestComponent,
    ConsumerInfoComponent,
    StoreInfoComponent,
    ReportComponent,
    ProfileComponent,
    ContactusReqComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
