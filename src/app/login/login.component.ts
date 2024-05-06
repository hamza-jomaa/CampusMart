import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 type: string="password";
 isText :boolean =false;
 eyeIcon:string ="fa-eye-slash";
 loginForm! : FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService){}
 ngOnInit(): void {
     this.loginForm =this.fb.group({
      email : ['',Validators.required],
      password: ['', Validators.required]
     })
 }
 hideShowPass(){
   this.isText=!this.isText;
   this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon="fa-eye-slash";
   this.isText ? this.type="text" :this.type="password";
 }

onSubmit(){
  if(this.loginForm.valid){
    console.log(this.loginForm.value);
  }else{
    this.validateAllFormFields(this.loginForm);
    alert("Your form is invalid");
  }
}
login(){
  if(this.loginForm.valid){
this.auth.Login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value);
  }
}
private validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsDirty({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}




}
