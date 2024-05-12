import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Submit form logic here
      console.log('this.profileForm',this.profileForm)
      this.profileService.updateConsumer(this.profileForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
