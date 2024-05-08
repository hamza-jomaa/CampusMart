import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CampusConsumerService } from 'src/app/services/campus-consumer.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private spinner:NgxSpinnerService, private campusConsumer:CampusConsumerService){}
 
  registerForm:FormGroup= new FormGroup({
    fullname:new FormControl(' ', Validators.required),
    email : new FormControl('ex@ex.just.edu.jo',[Validators.required,Validators.email]),
    password:new FormControl('*********',[Validators.required,Validators.minLength(8)]),
    confirmPassword:new FormControl(''),
    imagepath:new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    isprovider:new FormControl(),
    roleid:new FormControl(),
    status:new FormControl()
  })

  
 
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
  
    console.log(this.registerForm.value);
    this.registerForm.value.roleid=2;
    this.registerForm.value.isprovider=0;

   
    this.campusConsumer.CreateCampusConsumer(this.registerForm.value)
  }
  MatchError(){
    if(this.registerForm.controls['password'].value==
    this.registerForm.controls['confirmPassword'].value)
  
    this.registerForm.controls['confirmPassword'].setErrors(null); 
    else 
  
    this.registerForm.controls['confirmPassword'].setErrors({misMatch:true});
  
  
  }
  eduJoValidator() {
    
    if (this.registerForm.controls['email'].value.toLowerCase().endsWith('just.edu.jo')) {
      this.registerForm.controls['email'].setErrors(null);
    }
    else this.registerForm.controls['email'].setErrors({missMatch:true});
  }

 
}
