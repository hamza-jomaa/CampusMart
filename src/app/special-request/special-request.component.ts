import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss']
})
export class SpecialRequestComponent implements OnInit {
  requestForm: FormGroup;
  submittingRequest: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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

    const formData = {
      requesttitle: this.requestForm.value.title,
      requestdetails: this.requestForm.value.message,
      requeststatus: 'Pending' 
    };

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
