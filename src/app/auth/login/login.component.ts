import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private auth:AuthService){}
  email = new FormControl('ex@example.com' , [Validators.required , Validators.email]); 
  password = new FormControl('********' , [Validators.required,Validators.minLength(8)])

  submit(){
    this.auth.Login(this.email,this.password);
  }

}
