import { Component, OnInit } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-store-request',
  templateUrl: './store-request.component.html',
  styleUrls: ['./store-request.component.scss']
})
export class StoreRequestComponent implements OnInit {
  constructor(public admin: AdminService , 
              private confirmService: NgConfirmService,
              private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.admin.GetAllPendingStores();
    // this.toastr.success('Component initialized successfully.');

  }

  acceptStore(storeId: number) {
    this.confirmService.showConfirm("Are you sure want to accept?",
    ()=>{
      this.admin.UpdateStoreStatus(storeId, 'Accept').subscribe(() => {
        this.admin.GetAllPendingStores();
        this.toastr.success('Status Updated Successfully', 'Success', {
          positionClass: 'toast-top-right', // Center the toastr message
          closeButton:true,
          progressBar: true,
          enableHtml: true,
          timeOut: 5000,
          extendedTimeOut: 2000,
         
        });
        
      });
    },
    ()=>{
      this.confirmService.closeConfirm();
    }
    )
  }

  rejectStore(storeId: number) {
    this.confirmService.showConfirm("Are you sure want to reject?",
    ()=>{
      this.admin.UpdateStoreStatus(storeId, 'Reject').subscribe(() => {
        this.admin.GetAllPendingStores();
        this.toastr.success('Status Updated Successfully', 'Success'); // Use ToastrService here
      });
    },
    ()=>{
      this.confirmService.closeConfirm();
    }
    )
  }
}
