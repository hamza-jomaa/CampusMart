import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
    email: any = "";
    forgotPasswordForm!: FormGroup;
    constructor(private fb: FormBuilder, private auth: AuthService) {}
    ngOnInit(): void {
        this.forgotPasswordForm = this.fb.group({
            email: ['',[Validators.required, this.citEmailValidator]],
        });
    }
    forgotPassword() {
        if (this.forgotPasswordForm.valid) {
            this.auth.forgotPassword(
                this.forgotPasswordForm.controls["email"].value
            );
        }
    }
    citEmailValidator(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value || control.value.endsWith('@cit.just.edu.jo')) {
          return null; // Valid email
        }
        return { 'invalidEmail': true }; // Invalid email
      }
}
