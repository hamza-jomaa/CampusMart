import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  profileForm: FormGroup;
  showForm: boolean=false;
  constructor(private formBuilder: FormBuilder,private profileService:ProfileService, private toastr: ToastrService) { }
  name:any;
  username:any;
  email:any;
  phone:any;
  userdata:any={name:'',username:'',email:'',phone:'',image:''};
  apiUserData=null;
  ngOnInit(): void {
    this.apiUserData = JSON.parse(localStorage.getItem("user"));
    
    this.profileService.getConsumerById(this.apiUserData.login_ConsumerID).subscribe(
      (res: any) => {
        console.log('res',res)
        this.userdata={
          name:res.fullname,
          username:res.fullname,
          phone:res.phone,
          email:res.email,
          image:res.imagepath
        }
      },
      (error: any) => {
        this.toastr.error('Error Occurred');
       
      }
    )
   
    
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  open(){
    this.toggleModal();
  }
  toggleModal(){
    this.showForm=!this.showForm;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e: any) => {
            this.userdata.image = e.target.result;
        };
    }
}
  submitForm(formData) {
    if (formData.valid) {
      // Submit form logic here
      console.log('this.profileForm',formData.form.value)
      this.profileService.updateConsumer(formData.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
