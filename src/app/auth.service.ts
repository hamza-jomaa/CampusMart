import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  Login(email: any, password: any) {
    var body = {
      username: email.value.toString(),
      password: password.value.toString()
    };

    const headerDirc = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDirc)
    };

    // Mock token based on email value (replace with actual authentication logic)
    let token: any;
    if (email.value == 'Dana@gmail.com')
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmEiLCJpYXQiOjE1MTYyMzkwMjJ9.fV4Ral8mqGPVNPgY2RmbVvYJ_eb6wNno8odPBH0JpSY';
    else if (email.value == 'Ahmad@gmail.com')
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWFkIiwiaWF0IjoxNTE2MjM5MDIyfQ.Q1MFl2ZwEcrdlZMDCq-mR2gDTlLCeJUFGEYSHmEmz88';

    // Save token in the local storage
    localStorage.setItem('token', token);
    let data: any = (jwt_decode as any)(token);    localStorage.setItem('user', JSON.stringify(data));

    if (data.name == 'Dana')
      this.router.navigate(['admin/dashboard']);
    else if (data.name == 'Ahmad')
      this.router.navigate(['courses']);
  }

}
