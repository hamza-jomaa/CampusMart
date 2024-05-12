import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
        //this.toastr.success('Signed Up Successfully, Please Login To Continue');
        console.log(resp)
        console.log(body)
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
}
