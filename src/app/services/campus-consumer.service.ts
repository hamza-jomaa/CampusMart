import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampusConsumerService {
 
  constructor(private http: HttpClient,private router: Router,private toastr:ToastrService) { }

  display_image: any;

 
  updateConsumer(consumer:any){
  if(this.display_image!=undefined)
      consumer.imagepath=this.display_image
    this.http.put(environment.backendAPI+environment.CampusConsumer.base+environment.CampusConsumer.UpdateConsumer, consumer).subscribe(
        (res: any) => {
          this.toastr.success('Your data has been updated successfully', res);
        },
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
  }
  CreateCampusConsumer(body:any){
    body.imagepath=this.display_image
    this.http.post(environment.backendAPI+environment.CampusConsumer.base+environment.CampusConsumer.CreateCampusConsumerLogin, body).subscribe(
      (resp: any) => {
        this.router.navigate(['/auth/login']);
      },
      (error: any) => {
        //this.toastr.error('Error Occurred');
      }
    );
  }
  uploadAttachment(file: FormData) {
    
        this.http.post('https://localhost:7173/api/CampusConsumer/uploadImage', file).subscribe((resp: any) => {
      this.display_image = resp.imagepath;
   //   this.toastr.success("Image Uploaded Successfully");
    },
      (error: any) => {
       // this.toastr.error("Error Occured");
      })
  }
  consumerrrrData:any;
  getConsumerById(id:any){
    return this.http.get(environment.backendAPI+environment.CampusConsumer.base+environment.CampusConsumer.GetConsumerById+'/'+id);
  }
  isprovider:any
checkIsProvider(id:any){
  //this.GetCampusConsumerId(id);
  this.consumerrrrData=this.getConsumerById(id)
  this.getConsumerById(id).subscribe(
    (res: any) => {
      this.isprovider=res.isprovider
    },
    (error: any) => {
     
    }
  )
  return this.isprovider
}

saveVisaCardDetails(formData: any): Observable<any> {
  return this.http.post<any>('https://localhost:7173/api/Bank/CreateBank', formData);
}
}
