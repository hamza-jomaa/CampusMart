import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-apply-as-sp",
    templateUrl: "./apply-as-sp.component.html",
    styleUrls: ["./apply-as-sp.component.scss"],
})
export class ApplyAsSPComponent implements OnInit {
    providerForm: FormGroup;
    providerData: any;

    constructor(
        private fb: FormBuilder,
        public adminService: AdminService,
        private toastr: ToastrService
    ) {}
    ngOnInit(): void {
        this.initForm();
    }
    initForm(): void {
        this.providerForm = this.fb.group({
            phone: ["", Validators.required],
            //consumerId: [''],
            motivation: ["", Validators.required],
            status: ["Pending"],
        });
    }

    submitServiceProviderForm(): void {
        if (this.providerForm.invalid) {
            this.toastr.error("Please fill out all required fields.", "Error");
            return;
        }
        this.providerData = this.providerForm.value;
        let userData: any = localStorage.getItem("user");
      userData = JSON.parse(userData);
        this.providerData.consumerid=userData.login_ConsumerID;
        console.log("this.providerData",this.providerData)
        this.adminService
            .createServiceProvider(this.providerData)
            .subscribe(
                () => {
                    this.toastr.success(
                        "ServiceProvider request submitted successfully",
                        "Success"
                    );
                    this.providerForm.reset();
                },
                (error) => {
                    console.error(
                        "Error submitting service provider request:",
                        error
                    );
                    this.toastr.error(
                        "Failed to submit service provider request",
                        "Error"
                    );
                }
            );
    }
}
