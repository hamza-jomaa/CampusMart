import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  UpdateConsumerFrom: FormGroup = new FormGroup({
    consumerid:new FormControl(),
    fullname: new FormControl("", [Validators.required]),
    email:new FormControl("",[Validators.required]),
    phone:new FormControl(""),
    imagepath:new FormControl(""),
    roleid:new FormControl(""),
    isprovider:new FormControl("")

  });
  constructor(private formBuilder: FormBuilder,private profileService:ProfileService, private toastr: ToastrService, private campusConsumer:CampusConsumerService) { }
  name:any;
  username:any;
  email:any;
  phone:any;
  userdata:any={consumerid:0,fullname:'',email:'',phone:'',imagepath:'',roleid:0,password:'',isprovider:''};
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
          roleid:2,
          isprovider:res.isprovider,
          password:res.password
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
 
  submitForm() {
    
     // this.profileForm.value.consumerid=this.apiUserData.login_ConsumerID;
   //  this.UpdateStoreFrom.value.image=this.storeData.image;
     //console.log(formData.form.value)
     this.UpdateConsumerFrom.value.consumerid=parseInt(this.apiUserData.login_ConsumerID);

     this.UpdateConsumerFrom.value.roleid=2;
     this.UpdateConsumerFrom.value.imagepath=this.userdata.imagepath;
     this.UpdateConsumerFrom.value.isprovider=this.userdata.isprovider;
     this.UpdateConsumerFrom.value.password=this.userdata.password;

      this.campusConsumer.updateConsumer(this.UpdateConsumerFrom.value);
    
  }
}
