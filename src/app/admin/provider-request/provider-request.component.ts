import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-provider-request',
  templateUrl: './provider-request.component.html',
  styleUrls: ['./provider-request.component.scss']
})
export class ProviderRequestComponent implements OnInit {

  constructor(public admin: AdminService, private dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.admin.getAllPendingProviders();
  }

  acceptProvider(consumerId: number, providerId: number) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      data: { message: 'Confirm provider acceptance?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.admin.acceptProvider(consumerId, providerId).subscribe(
          () => {
            console.log('Provider accepted successfully.');
            this.admin.getAllPendingProviders();
            this.toastr.success('Provider Accepted Successfully!', 'Success', {
              positionClass: 'toast-top-right', 
              closeButton:true,
              progressBar: true,
              enableHtml: true,
              timeOut: 5000,
              extendedTimeOut: 2000,
            });
          },
          (error) => {
            console.error('Error accepting provider:', error);
          }
        );
      } else {
        console.log('User canceled the action');
      }
    });
  }
  rejectProvider(consumerId: number, providerId: number) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      data: { message: 'Confirm provider rejection?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.admin.rejectProvider(consumerId, providerId).subscribe(
          () => {
            console.log('Provider rejected successfully.');
            this.admin.getAllPendingProviders();
            this.toastr.success('Provider Rejected Successfully!', 'Success', {
              positionClass: 'toast-top-right', 
              closeButton:true,
              progressBar: true,
              enableHtml: true,
              timeOut: 5000,
              extendedTimeOut: 2000,
            });
          },
          (error) => {
            console.error('Error rejecting provider:', error);
          }
        );
      } else {
        console.log('User canceled the action');
      }
    });
  }
}
