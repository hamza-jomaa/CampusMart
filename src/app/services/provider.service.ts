import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
 
}
