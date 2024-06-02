import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CampusConsumerService } from 'src/app/services/campus-consumer.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  profileForm: FormGroup;
  showForm: boolean=false;
  constructor(private formBuilder: FormBuilder,private profileService:ProfileService, private toastr: ToastrService, private campusConsumer:CampusConsumerService) { }
  name:any;
  username:any;
  email:any;
  phone:any;
  userdata:any={consumerid:0,fullname:'',email:'',phone:'',imagepath:'',roleid:0};
  apiUserData=null;
  ngOnInit(): void {
    this.apiUserData = JSON.parse(localStorage.getItem("user"));
    
    this.profileService.getConsumerById(this.apiUserData.login_ConsumerID).subscribe(
      (res: any) => {
        this.userdata={
          fullname:res.fullname,
          phone:res.phone,
          email:res.email,
          imagepath:res.imagepath,
          consumerid:this.apiUserData.login_ConsumerID,
          roleid:2
        }
       console.log(res)
      },
      (error: any) => {
        this.toastr.error('Error Occurred');
       
      }
    )
   
    
    this.profileForm = this.formBuilder.group({
      consumerid:[],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      imagepath:['']
    });
  }
  open(){
    this.toggleModal();
  }
  toggleModal(){
    this.showForm=!this.showForm; 
  }
  uploadImage(file: any) {
   
    if (file.length === 0)
      return;

    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.campusConsumer.uploadAttachment(formData);
  }
 
  submitForm(formData) {
    if (formData.valid) {
     // this.profileForm.value.consumerid=this.apiUserData.login_ConsumerID;
      this.campusConsumer.updateConsumer(formData.form.value);
    } else {
    }
  }
}
