import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }



  SendEmail(body: any) {
    this.http.post(`https://localhost:7131/api/Email`, body).subscribe(resp => {
      console.log("email sent");
    }, err  => {
      console.log(err);

    })
  }
}
