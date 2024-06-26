import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ProfileService } from './profile.service';
import { ProviderService } from './provider.service';
import { StoreService } from './store.service';
import { CheckoutService } from './checkout.service';
import { TransactionService } from './transaction.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  paymentCreditntails: any;

  constructor(private http:HttpClient,private router: Router, private profileService:ProfileService,private providerService: ProviderService,public storeService:StoreService,private checkoutService:CheckoutService, private transactionService: TransactionService, private toastr:ToastrService) { }

  
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
      if(userData.login_RoleID === "1"||userData.login_RoleID === 1) {
        this.router.navigate(["admin/"])
      } 

   
      else if((userData.login_RoleID  === "2"||userData.login_RoleID  === 2)){
        
      this.profileService.getConsumerById(userData.login_ConsumerID).subscribe((ConsumerRes:any)=>{
        if(ConsumerRes){
          //to fill consumer id every where 
          this.profileService.setConsumerData(ConsumerRes);
          this.checkoutService.setConsumerData(ConsumerRes);
          this.providerService.GetAllServiceProviders().subscribe((providerRes: any) => {
            this.providerService.setProviderData(providerRes.filter(
              (provider) => provider.consumerid == userData.login_ConsumerID
          )[0]);
            //???
            this.providerService.getStore(providerRes.filter(
              (provider) => provider.consumerid == userData.login_ConsumerID
          )[0].providerid).subscribe((storeRes) => {
                if (storeRes) {
                  this.storeService.setStoreData(storeRes);
                }
            });
        });
        this.transactionService.getAllBanks().subscribe((banks:any)=>{
          if(banks){
            this.paymentCreditntails = banks.filter((bank: any) => bank.consumerid == ConsumerRes.consumerid);
            if( this.paymentCreditntails.length==0){
              this.router.navigate(["payment"])
              this.toastr.success('Welcome')
            }
            else {
              this.router.navigate([""])
            }
          }
         
        })
    
        }
      })
 
      }

      
    }, (err) => {
      this.toastr.error('Email or Password not correct')
    })
  }

}