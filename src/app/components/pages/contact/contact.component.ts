import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submittingContact: boolean = false;

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
    this.contactForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitContactForm(): void {
    if (this.contactForm.invalid) {
      this.toastr.error('Please fill out all required fields.', 'Error');
      return;
    }

    this.spinner.show();
    this.submittingContact = true;

    const formData = this.contactForm.value;

    this.adminService.createContact(formData).subscribe(
      () => {
        this.toastr.success('Your message has been sent successfully', 'Success');
        this.contactForm.reset();
      },
      (error) => {
        console.error('Error submitting contact form:', error);
        this.toastr.error('Failed to send message', 'Error');
      }
    ).add(() => {
      this.spinner.hide();
      this.submittingContact = false;
    });
  }
}