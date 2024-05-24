import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampusConsumerService {
 
  constructor(private http: HttpClient,private router: Router) { }

  display_image: any;

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
  debugger
  //this.GetCampusConsumerId(id);
  this.consumerrrrData=this.getConsumerById(id)
  this.getConsumerById(id).subscribe(
    (res: any) => {
      console.log('res',res)
      this.isprovider=res.isprovider
      console.log(this.isprovider)
    },
    (error: any) => {
    //  this.toastr.error('Error Occurred');
     
    }
  )
  console.log(this.consumerrrrData)
  return this.isprovider
}

saveVisaCardDetails(formData: any): Observable<any> {
  return this.http.post<any>('https://localhost:7173/api/Bank/CreateBank', formData);
}
}
