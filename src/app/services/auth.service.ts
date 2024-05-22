import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ProfileService } from './profile.service';
import { ProviderService } from './provider.service';
import { StoreService } from './store.service';
import { CheckoutService } from './checkout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router: Router, private profileService:ProfileService,private providerService: ProviderService,public storeService:StoreService,private checkoutService:CheckoutService) { }

  
  Login(body: any) {

    const header = {
      "content-type": "application/json",
      "Accept": "application/json"
    } 

    const requestHeaders = {
      headers: new HttpHeaders(header)
    }

    this.http.post("https://localhost:7173/api/Login/Auth", body, requestHeaders).subscribe((resp) =>  {
    //  this.toastr.success("Logged in")

      const response = {
        token: resp.toString()
      }

      localStorage.setItem("token", response.token);
      let data: any = jwtDecode(response.token);
      localStorage.setItem("user", JSON  .stringify(data));

      let userData: any = localStorage.getItem("user");
      userData = JSON.parse(userData);
      this.profileService.getConsumerById(userData.login_ConsumerID).subscribe(ConsumerRes=>{
        if(ConsumerRes){
          this.profileService.setConsumerData(ConsumerRes);
          this.checkoutService.setConsumerData(ConsumerRes);
          this.providerService.GetAllServiceProviders().subscribe((providerRes: any) => {
            this.providerService.setProviderData(providerRes.filter(
              (provider) => provider.consumerid == userData.login_ConsumerID
          )[0]);
            
            this.providerService.getStore(providerRes.filter(
              (provider) => provider.consumerid == userData.login_ConsumerID
          )[0].providerid).subscribe((storeRes) => {
                if (storeRes) {
                  this.storeService.setStoreData(storeRes);
                }
            });
        });
        }
      })
      
      if(userData.roleID === "1") {
        this.router.navigate(["admin/"])
      } else {
        this.router.navigate([""])
      }
    }, (err) => {
    })
  }

}
