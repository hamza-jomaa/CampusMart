import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  message: string = '';
  info: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Check query params to determine message
    this.route.queryParams.subscribe(params => {
      if (params['registration']) {

        this.message = 'An email has been sent to verify your account.';
        this.info = 'Please check your email inbox and follow the instructions to activate your account.';
        
      } else if (params['forgotPassword']) {

        this.message = 'An email has been sent to reset your password.';
        this.info = 'Please check your email inbox and follow the instructions to reset your password.';
      }
    });
  }
}
