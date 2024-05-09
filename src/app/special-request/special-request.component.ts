import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss']
})
export class SpecialRequestComponent implements OnInit {
  requestForm: FormGroup;
  submittingRequest: boolean = false;
  localData: any; // Variable to store local user data
  emailInfo: any; // Variable to store email information

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private http: HttpClient // Inject HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitRequestForm(): void {
    if (this.requestForm.invalid) {
      this.toastr.error('Please fill out all required fields.', 'Error');
      return;
    }

    this.spinner.show();
    this.submittingRequest = true;

    // Get consumer ID from local storage
    this.localData = localStorage.getItem('user');
    this.localData = JSON.parse(this.localData);
    const consumerId = this.localData.userID;

    const formData = {
      requesttitle: this.requestForm.value.title,
      requestdetails: this.requestForm.value.message,
      requeststatus: 'Pending',
      consumerid: consumerId
    };

    // Call your service method to submit the request
    this.adminService.createRequest(formData).subscribe(
      () => {
        this.toastr.success('Special request submitted successfully', 'Success');
        this.requestForm.reset();
      },
      (error) => {
        console.error('Error submitting special request:', error);
        this.toastr.error('Failed to submit special request', 'Error');
      }
    ).add(() => {
      this.spinner.hide();
      this.submittingRequest = false;
    });
  }
}



// GetBorrowedBooksDetailsByUserIdAndBookID(bookID: any) {
//   this.localData = localStorage.getItem("user");
//   this.localData = JSON.parse(this.localData);
//   this.http.get(https://localhost:7131/api/BorrowedBook/GetBorrowedBooksDetailsByUserIdAndBookID?userID=${this.localData.userID}&bookID=${bookID}).subscribe((resp: any) => {
//   this.emailInfo = resp;  
//   this.emailService.SendEmail(this.emailInfo);
    
//   },
//     (error: any) => {
     
//     })
// } 