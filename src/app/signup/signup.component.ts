import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string="password";
  isText :boolean =false;
  eyeIcon:string ="fa-eye-slash";
  signUpForm! :FormGroup;
   constructor(private fb:FormBuilder,private auth:AuthService){}
  ngOnInit(): void {
      this.signUpForm=this.fb.group({
        fullName : ['',Validators.required],
        email : ['',Validators.required],
        password : ['',Validators.required],

      })
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text" :this.type="password";
  }

  onSignup(){
    if(this.signUpForm.valid){
      this.auth.register(this.signUpForm.controls['fullName'].value, this.signUpForm.controls['email'].value,this.signUpForm.controls['password'].value);
      console.log(this.signUpForm.value);
    }else{
       this.validateAllFormFields(this.signUpForm);
       alert("Your form is invalid");

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
