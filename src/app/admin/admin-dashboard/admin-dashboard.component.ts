import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  pendingTestimonials: any[] = [];
  numberOfUsers: number = 0;
  numberOfAcceptedStores: number = 0;
  constructor(private adminService: AdminService, private confirmService: NgConfirmService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getPendingTestimonials();
    this.getNumberOfUsers();
    this.getNumberOfAcceptedStores();
  }
  getPendingTestimonials() {
    this.adminService.getAllPendingTestimonials().subscribe(
      (data) => {
        this.pendingTestimonials = data.filter(testimonial => testimonial.status === 'Pending');
      },
      (error) => {
        console.error('Error fetching pending testimonials:', error);
      }
    );
  }
  getNumberOfUsers() {
    this.adminService.getAllConsumers().subscribe(
      (consumers) => {
        this.numberOfUsers = consumers.length;
      },
      (error) => {
        console.error('Error fetching consumers:', error);
      }
    );
  }
  getNumberOfAcceptedStores() {
    this.adminService.getAllStores().subscribe(
      (stores) => {
        this.numberOfAcceptedStores = stores.filter(store => store.approvalstatus === 'Accept').length;
      },
      (error) => {
        console.error('Error fetching stores:', error);
      }
    );
  }

  approveTestimonial(testimonialId: number) {
    this.confirmService.showConfirm("Are you sure you want to approve?",
      () => {
        this.adminService.approveTestimonial(testimonialId).subscribe(() => {
          this.toastr.success('Testimonial approved successfully', 'Success');
          this.getPendingTestimonials();
        }, error => {
          console.error('Error approving testimonial:', error);
        });
      },
      () => {
        this.confirmService.closeConfirm();
      }
    );
  }
  
  rejectTestimonial(testimonialId: number) {
    this.confirmService.showConfirm("Are you sure you want to reject?",
      () => {
        this.adminService.rejectTestimonial(testimonialId).subscribe(() => {
          this.toastr.success('Testimonial rejected successfully', 'Success');
          this.getPendingTestimonials();
        }, error => {
          console.error('Error rejecting testimonial:', error);
        });
      },
      () => {
        this.confirmService.closeConfirm();
      }
    );
  }
  
}
