import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StoreRequestComponent } from './store-request/store-request.component';
import { MerchandiseRequestComponent } from './merchandise-request/merchandise-request.component';
import { ConsumerInfoComponent } from './consumer-info/consumer-info.component';
import { StoreInfoComponent } from './store-info/store-info.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactusReqComponent } from './contactus-req/contactus-req.component';
import { ProviderRequestComponent } from './provider-request/provider-request.component';
const routes: Routes = [
  {
    path:'dashboard',component:AdminDashboardComponent
  },
  {
    path:'storeRequest', component:StoreRequestComponent
  },
  {
    path:'merchandiseRequest', component:MerchandiseRequestComponent
  }
  ,
  {
    path:'consumerInfo', component:ConsumerInfoComponent
  }
  ,
  {
    path:'storeInfo', component:StoreInfoComponent
  },
  {
    path:'report', component:ReportComponent
  },
  {
    path:'providerRequest', component:ProviderRequestComponent
  },
  {
    path:'contactusReq', component:ContactusReqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
