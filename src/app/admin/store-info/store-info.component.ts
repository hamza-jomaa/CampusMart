import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit {
  storesInfo: any[] = [];

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllStores();
  }

  getAllStores() {
    this.adminService.getAllStores().subscribe(
      (data) => {
        this.storesInfo = data.filter(store => store.approvalstatus === 'accepted');
      },
      (error) => {
        console.error('Error fetching stores:', error);
      }
    );
  }
}
