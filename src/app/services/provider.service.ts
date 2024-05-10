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
}
