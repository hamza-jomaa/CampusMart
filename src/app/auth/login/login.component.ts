import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, this.citEmailValidator]),
    password: new FormControl("", Validators.required)
  });

  Login() {
    this.auth.Login(this.loginForm.value);
  } 

  citEmailValidator(control: FormControl): { [key: string]: any } | null {
    if (!control.value || control.value.endsWith('@cit.just.edu.jo')) {
      return null; // Valid email
    }
    return { 'invalidEmail': true }; // Invalid email
  }
}
