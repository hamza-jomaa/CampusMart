import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  storerequests:any=[{}];
  GetAllPendingStores(){
    this.http.get('https://localhost:7173/api/Store/GetPendingStores').subscribe((res:any)=>{
      this.storerequests=res;
    },err=>{
    })
  }
   

  UpdateStoreStatus(storeId: number, newStatus: string) {
    return this.http.put(`https://localhost:7173/api/Store/UpdateStoreApprovalStatus/${storeId}/${newStatus}`, {});
  }
  

  pendingMerchandise: any = [{}];

  getAllPendingMerchandise() {
    this.http.get('https://localhost:7173/api/Merchandise/GetAllPendingMerchandise').subscribe((res:any)=>{
      this.pendingMerchandise=res;
    },err=>{
    })
   
  }
 

  getStoreById(storeId: number) {
    return this.http.get<any>(`https://localhost:7173/api/Store/GetStoreById/${storeId}`);
  }

  updateMerchandiseStatus(merchandiseId: number, newStatus: string) {
    return this.http.put(`https://localhost:7173/api/Merchandise/UpdateMerchandiseRequestStatus/${merchandiseId}/${newStatus}`, {});
  }
  
  consumersInfo: any[] = [];

  getAllConsumers() {
    return this.http.get<any[]>('https://localhost:7173/api/CampusConsumer/GetAllConsumers');
  }

  blockUser(consumerId: number) {
    return this.http.delete(`https://localhost:7173/api/CampusConsumer/DeleteConsumer/${consumerId}`);
  }

  getAllStores() {
    return this.http.get<any[]>('https://localhost:7173/api/Store/GetAllStores');
  }

  getAllContactUS(){
    return this.http.get<any[]>('https://localhost:7173/api/ContactUs/GetAllContacts');
  }
  providerequests:any=[{}];
  getAllPendingProviders(){
    this.http.get('https://localhost:7173/api/CampusServiceProvider/GetAllPendingServiceProviders').subscribe((res:any)=>{
      this.providerequests=res;
    },err=>{
    })
  }
 



  acceptProvider(consumerId: number, providerId: number) {
    const url = `https://localhost:7173/api/CampusServiceProvider/AcceptServiceProvider/${consumerId}/${providerId}`;
    return this.http.put(url, {});
  }
  rejectProvider(consumerId: number, providerId: number) {
    const url = `https://localhost:7173/api/CampusServiceProvider/RejectServiceProvider/${consumerId}/${providerId}`;
    return this.http.put(url, {});
  }
  

  getAllPendingTestimonials(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7173/api/Testimonial/GetAllTestimonials');
  }
 

  approveTestimonial(testimonialId: number) {
    return this.http.put(`https://localhost:7173/api/Testimonial/UpdateTestimonialStatus/${testimonialId}/Approved`, {});
  }

  rejectTestimonial(testimonialId: number) {
    return this.http.put(`https://localhost:7173/api/Testimonial/UpdateTestimonialStatus/${testimonialId}/Rejected`, {});
  }


  //change place later 
  private baseUrl = 'https://localhost:7173/api';
  createServiceProvider(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CampusServiceProvider/CreateServiceProvider`, formData);
  }
  createRequest(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/SpecialRequest/CreateRequest`, formData);
  }
  getAllRequests(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/SpecialRequest/GetAllRequests`);
  }
  createContact(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ContactUs/CreateContact`, formData);
  }
  createTestimonial(formData: any) {
    return this.http.post<any>(`${this.baseUrl}/Testimonial/CreateTestimonial`, formData);
  }
  getAllTestimonials(): Observable<any> { 
    return this.http.get<any>(`${this.baseUrl}/Testimonial/GetAllTestimonials`);
  }
}





 