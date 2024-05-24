import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampusConsumerService } from 'src/app/services/campus-consumer.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-add-visa',
  templateUrl: './add-visa.component.html',
  styleUrls: ['./add-visa.component.scss']
})
export class AddVisaComponent implements OnInit {
  visaForm!: FormGroup;
  successMessage: string = '';
  consumerId: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private campusConsumerService: CampusConsumerService,
    private toastr: ToastrService // Inject ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getConsumerIdFromLocalStorage(); 
  }

  initForm(): void {
    this.visaForm = this.formBuilder.group({
      username: ['', Validators.required],
      cardnumber: ['', Validators.required],
      cardholder: ['', Validators.required],
      cvv: ['', Validators.required],
      consumerId: [''] 
    });
  }

  getConsumerIdFromLocalStorage(): void {
    const userData: any = localStorage.getItem('user'); 
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.consumerId = parsedUserData.login_ConsumerID; 
    }
  }

  createVisaCard() {
    if (this.visaForm.invalid) {
      return;
    }

    const formData = this.visaForm.value;

    if (this.consumerId) {
      formData.consumerId = this.consumerId;
    }

    this.campusConsumerService.saveVisaCardDetails(formData).subscribe(
      (response) => {
        console.log('Visa card created successfully:', response);
        this.toastr.success('Visa card created successfully!', 'Success');
        this.visaForm.reset();
      },
      (error) => {
        console.error('Error creating Visa card:', error);
        this.toastr.error('Failed to create Visa card', 'Error');
      }
    );
  }
}
