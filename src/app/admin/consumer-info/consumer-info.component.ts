import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';
import { AdminService } from 'src/app/services/admin.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-consumer-info',
  templateUrl: './consumer-info.component.html',
  styleUrls: ['./consumer-info.component.scss']
})
export class ConsumerInfoComponent implements OnInit {

 
  constructor(public admin: AdminService ,private dialog:MatDialog ,private dialogService:DialogService ,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.fetchConsumers();
  }

  fetchConsumers() {
    this.admin.getAllConsumers().subscribe(
      (data) => {
        this.admin.consumersInfo = data;
        console.log('Consumers:', data);
      },
      (error) => {
        console.error('Error fetching consumers:', error);
      }
    );
  }


  blockUser(consumerId: number) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      data: { message: 'Are you sure you want to block this user?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.admin.blockUser(consumerId).subscribe(
          () => {
            console.log('User blocked successfully');
            this.fetchConsumers();  
            this.toastr.success('Blocked Successfully!', 'Success', {
              positionClass: 'toast-top-right', 
              closeButton:true,
              progressBar: true,
              enableHtml: true,
              timeOut: 5000,
              extendedTimeOut: 2000,
             
            });
            
                },
          (error) => {
            console.error('Error blocking user:', error);
                     }
        );
      } else {
        console.log('User canceled the action');
      }
    });
  }
  
}
