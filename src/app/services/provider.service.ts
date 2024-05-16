import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient,private router: Router, private toastr: ToastrService) { }

  createMerchandise(merchandise:any){
    this.http.post(environment.backendAPI+environment.Merchandise.base+environment.Merchandise.CreateMerchandise, merchandise).subscribe(
      (resp: any) => {
        this.toastr.success('Merchandise added successfully', resp);
      },
      (error: any) => {
        this.toastr.error('Error Occurred');
      }
    );
  }
  getAllMerchandise(): Observable<any> {
    return this.http.get<any>(environment.backendAPI+environment.Merchandise.base+environment.Merchandise.GetAllMerchandise);
  }
  updateMerchandise(merchandise:any){
    this.http.post(environment.backendAPI+environment.Merchandise.base+environment.Merchandise.UpdateMerchandise, merchandise).subscribe(
        (res: any) => {
          this.toastr.success('Merchandise updated successfully', res);
        },
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
  }
  deleteMerchandise(id:any){
    this.http.delete(environment.backendAPI+environment.Merchandise.base+environment.Merchandise.DeleteMerchandise+'/'+id).subscribe(
        (res: any) => {
          this.toastr.success('Merchandise deleted successfully', res);
        },
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
  }

  createStore(Store:any){
    this.http.post(environment.backendAPI+environment.Store.base+environment.Store.CreateStore, Store).subscribe(
      (resp: any) => {
        this.toastr.success('Store added successfully', resp);
      },
      (error: any) => {
        this.toastr.error('Error Occurred');
      }
    );
  }
  getAllStores(): Observable<any> {
    return this.http.get<any>(environment.backendAPI+environment.Store.base+environment.Store.GetAllStores);
  }
  getStore(id:any): Observable<any> {
    return this.http.get<any>(environment.backendAPI+environment.Store.base+environment.Store.GetStoreById+'/'+id);
  }
  updateStore(Store:any){
    this.http.post(environment.backendAPI+environment.Store.base+environment.Store.UpdateStore, Store).subscribe(
        (res: any) => {
          this.toastr.success('Store updated successfully', res);
        },
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
  }
  deleteStore(id:any){
    this.http.delete(environment.backendAPI+environment.Store.base+environment.Store.DeleteStore+'/'+id).subscribe(
        (res: any) => {
          this.toastr.success('Store deleted successfully', res);
        },
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
  }
  getServiceProviderById(id:any){
    return this.http.get(environment.backendAPI+environment.CampusServiceProvider.base+environment.CampusServiceProvider.GetServiceProviderById+'/'+id);
  }
  GetAllOrders(){
    return this.http.get(environment.backendAPI+environment.Order.base+environment.Order.GetAllOrders);
  }
  GetAllServiceProviders(){
    return this.http.get(environment.backendAPI+environment.CampusServiceProvider.base+environment.CampusServiceProvider.GetAllServiceProviders); 
  }
}