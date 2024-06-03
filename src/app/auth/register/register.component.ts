import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CampusConsumerService } from 'src/app/services/campus-consumer.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private spinner:NgxSpinnerService, private campusConsumer:CampusConsumerService,private fb: FormBuilder){
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, this.citEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      imagepath: ['', Validators.required],
      phone: ['', Validators.required],
      isprovider: [''],
      roleid: [''],
      status: ['']
    }, { validators: this.passwordMatchValidator() });
  }
 

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
  citEmailValidator(control: FormControl): { [key: string]: any } | null {
    if (!control.value || control.value.endsWith('@cit.just.edu.jo')) {
      return null; 
    }
    return { 'invalidEmail': true };
  }
 
 
  MatchError(){
    if(this.registerForm.controls['password'].value==
    this.registerForm.controls['confirmPassword'].value)
  
    this.registerForm.controls['confirmPassword'].setErrors(null); 
    else 
  
    this.registerForm.controls['confirmPassword'].setErrors({misMatch:true});
  
  
  }
 

  uploadImage(file: any) {
    if (file.length === 0)
      return;

    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.campusConsumer.uploadAttachment(formData);
  }

  Register(){
  this.spinner.show();
  setTimeout(()=>{
    this.spinner.hide();
  },3000)
  
    this.registerForm.value.roleid=2;
    this.registerForm.value.isprovider=0;

   
    this.campusConsumer.CreateCampusConsumer(this.registerForm.value)
  }
}
