import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { NavbarStyleOneComponent } from './components/common/navbar-style-one/navbar-style-one.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { FooterStyleOneComponent } from './components/common/footer-style-one/footer-style-one.component';
import { FooterStyleTwoComponent } from './components/common/footer-style-two/footer-style-two.component';
import { NavbarStyleTwoComponent } from './components/common/navbar-style-two/navbar-style-two.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/sidebar/sidebar.component';
import { FoodCollectionComponent } from './components/pages/food-collection/food-collection.component';
import { OnlineOrderComponent } from './components/pages/online-order/online-order.component';
import { ChefsComponent } from './components/pages/chefs/chefs.component';
import { BookTableComponent } from './components/pages/book-table/book-table.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { NavbarStyleThreeComponent } from './components/common/navbar-style-three/navbar-style-three.component';
//mport { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCcVisa, faCcAmex, faCcMastercard, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { ApplyAsSPComponent } from './apply-as-sp/apply-as-sp.component';
import { TrackorderComponent } from './trackorder/trackorder.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TesimonalsComponent } from './tesimonals/tesimonals.component';
import { SpecialRequestComponent } from './special-request/special-request.component';
import { WritetestmonialComponent } from './writetestmonial/writetestmonial.component';
import { ProviderComponent } from './components/pages/provider/provider.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { SignupComponent } from './signup/signup.component'; 
import { HttpClientModule } from '@angular/common/http';
import{NgConfirmModule} from 'ng-confirm-box';
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
//import { AuthService } from './auth.service';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
//import { LoginComponent } from './components/pages/login/login.component';

import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    NavbarStyleOneComponent,
    HomeOneComponent,
    HomeComponent,
    HomeThreeComponent,
    FooterStyleOneComponent,
    FooterStyleTwoComponent,
    NavbarStyleTwoComponent,
    AboutComponent,
    CategoriesComponent,
    ServicesComponent,
    ServicesDetailsComponent,
    BlogDetailsComponent,
    BlogComponent,
    FoodCollectionComponent,
    OnlineOrderComponent,
    ChefsComponent,
    BookTableComponent,
    CartComponent,
    CheckoutComponent,
    ComingSoonComponent,
    FaqComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    ContactComponent,
    NavbarStyleThreeComponent,
    ApplyAsSPComponent,
    TrackorderComponent,
    TesimonalsComponent,
    SpecialRequestComponent,
    WritetestmonialComponent,
    ProviderComponent,
    MatConfirmDialogComponent,
    ErrorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({positionClass: 'toast-top-right',}), 
    BrowserAnimationsModule ,
    MatDialogModule,
    MatIconModule,
    SharedModule,
    NgxSpinnerModule,
    MatIconModule,
    NgConfirmModule
  ],
 // exports:[CitEmailValidatorDirective],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
