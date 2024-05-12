import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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
  
}
