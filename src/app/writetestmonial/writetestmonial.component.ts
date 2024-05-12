import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-writetestmonial',
  templateUrl: './writetestmonial.component.html',
  styleUrls: ['./writetestmonial.component.scss']
})
export class WritetestmonialComponent implements OnInit {
  testimonialForm: FormGroup;
  submittingTestimonial: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initTestimonialForm();
  }

  initTestimonialForm(): void {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substr(0, 10);
    this.testimonialForm = this.fb.group({
      dateOfPosted: [formattedDate, Validators.required],
      testimonialtext: ['', Validators.required],
      status: ['Pending']
    });
  }

  submitTestimonialForm(): void {
    if (this.testimonialForm.invalid) {
      this.toastr.error('Please fill out all required fields.', 'Error');
      return;
    }

    this.spinner.show();
    this.submittingTestimonial = true;

    const formData = this.testimonialForm.value;

    this.adminService.createTestimonial(formData).subscribe(
      () => {
        this.toastr.success('Your testimonial has been submitted successfully', 'Success');
        this.testimonialForm.reset();
      },
      (error) => {
        console.error('Error submitting testimonial form:', error);
        this.toastr.error('Failed to submit testimonial', 'Error');
      }
    ).add(() => {
      this.spinner.hide();
      this.submittingTestimonial = false;
    });
  }
}