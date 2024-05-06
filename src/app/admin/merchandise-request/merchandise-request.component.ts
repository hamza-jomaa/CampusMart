import { Component, OnInit } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-merchandise-request',
  templateUrl: './merchandise-request.component.html',
  styleUrls: ['./merchandise-request.component.scss']
})
export class MerchandiseRequestComponent implements OnInit {
  constructor(public admin: AdminService , private confirmService: NgConfirmService,
    private toastr: ToastrService ) {}
    stores: any[] = [];

  ngOnInit(): void {
    this.admin.getAllPendingMerchandise();
    this.admin.getAllStores().subscribe((data) => {
      this.stores = data;
  });
  }
  

  

  acceptMerchandise(merchandiseId: number) {
    this.confirmService.showConfirm("Are you sure you want to accept this merchandise request?",
      () => {
        this.admin.updateMerchandiseStatus(merchandiseId, 'Accept').subscribe(() => {
          this.admin.getAllPendingMerchandise();
          this.toastr.success('Merchandise request accepted successfully.', 'Success', {
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
            enableHtml: true,
            timeOut: 5000,
            extendedTimeOut: 2000
          });
        });
      },
      () => {
        this.confirmService.closeConfirm();
      }
    );
  }
  
  rejectMerchandise(merchandiseId: number) {
    this.confirmService.showConfirm("Are you sure you want to reject this merchandise request?",
      () => {
        this.admin.updateMerchandiseStatus(merchandiseId, 'Reject').subscribe(() => {
          this.admin.getAllPendingMerchandise();
          this.toastr.success('Merchandise request rejected successfully.', 'Success', {
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
            enableHtml: true,
            timeOut: 5000,
            extendedTimeOut: 2000
          });
        });
      },
      () => {
        this.confirmService.closeConfirm();
      }
    );
  }
  


 

  
}
