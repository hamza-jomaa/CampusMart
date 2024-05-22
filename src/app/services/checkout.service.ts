import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private userData= new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();
  private storeData= new BehaviorSubject<any>(null);
  storeData$ = this.storeData.asObservable();
  private providerData= new BehaviorSubject<any>(null);
  providerData$ = this.providerData.asObservable();
  constructor(private http: HttpClient,private router: Router, private toastr: ToastrService) { }

 
  updateConsumer(consumer:any){
    this.http.post(environment.backendAPI+environment.CampusConsumer.base+environment.CampusConsumer.UpdateConsumer, consumer).subscribe(
        (res: any) => {
          this.toastr.success('Your data has been updated successfully', res);
        },
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
  }
 
  getConsumerById(id:any){
    return this.http.get(environment.backendAPI+environment.CampusConsumer.base+environment.CampusConsumer.GetConsumerById+'/'+id);
  }
  setConsumerData(ConsumerData:any){
    this.userData.next(ConsumerData);
  }
  setProviderData(provider:any){
    this.providerData.next(provider);
  }
  setStoreData(storeData:any){
    this.storeData.next(storeData);
  }
}


