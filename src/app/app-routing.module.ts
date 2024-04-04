import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { LoginComponent } from './login/login.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { BlogComponent } from './components/pages/sidebar/sidebar.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { FoodCollectionComponent } from './components/pages/food-collection/food-collection.component';
import { OnlineOrderComponent } from './components/pages/online-order/online-order.component';
import { ChefsComponent } from './components/pages/chefs/chefs.component';
import { BookTableComponent } from './components/pages/book-table/book-table.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ApplyAsSPComponent } from './apply-as-sp/apply-as-sp.component';
import { TrackorderComponent } from './trackorder/trackorder.component';
import { TesimonalsComponent } from './tesimonals/tesimonals.component';
import { SpecialRequestComponent } from './special-request/special-request.component';
import { WritetestmonialComponent } from './writetestmonial/writetestmonial.component';
import { ProviderComponent } from './components/pages/provider/provider.component';
import { authorizationGuard } from './authorization.guard';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {path: '', component: HomeTwoComponent},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'services-details', component: ServicesDetailsComponent},
    {path: 'sidebar', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'food-collection', component: FoodCollectionComponent},
    {path: 'online-order', component: OnlineOrderComponent},
    {path: 'chefs', component: ChefsComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'book-table', component: BookTableComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'contact', component: ContactComponent},
    { path: 'testimonals', component: TesimonalsComponent },
    { path: 'trackorder', component: TrackorderComponent },
    {path: 'apply-as-sp', component: ApplyAsSPComponent },
    {path: 'login', component: LoginComponent },
    {path: 'signup', component : SignupComponent },


    //{ path: 'login', component: LoginComponent },
    //{ path: 'security', loadChildren : () =>import('./auth/auth.module').then((m) => m.AuthModule) },
    // ,{

    //     path:'securitys',
    //     loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    //   },
    { path: 'special-request', component: SpecialRequestComponent },
    { path: 'writetestmonial', component: WritetestmonialComponent },
    { path: 'provider', component: ProviderComponent },
    {path:'admin', loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)},
 
    {path: '**', component: ErrorComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}