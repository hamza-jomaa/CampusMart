import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private spinner:NgxSpinnerService){}
 
  registerForm:FormGroup= new FormGroup({
    fullName:new FormControl(' ', Validators.required),
    email : new FormControl('ex@example.com',[Validators.required,Validators.email]),
    password:new FormControl('*********',[Validators.required,Validators.minLength(8)]),
    conformPassword:new FormControl(''),
  })
  
  submit(){
  this.spinner.show();
  setTimeout(()=>{
    this.spinner.hide();
  },3000)
  
    console.log(this.registerForm.value);
    localStorage.setItem('name',this.registerForm.controls['fullName'].value);
    localStorage.setItem('password',this.registerForm.controls['password'].value);
  
  }
  matchError(){
    if(this.registerForm.controls['password'].value == this.registerForm.controls['conformPassword'].value )
    this.registerForm.controls['conformPassword'].setErrors(null);
  else 
  this.registerForm.controls['conformPassword'].setErrors({missMatch:true});
  }
}
