import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-contactus-req',
  templateUrl: './contactus-req.component.html',
  styleUrls: ['./contactus-req.component.scss']
})
export class ContactusReqComponent implements OnInit {
  contactUsList: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.adminService.getAllContactUS().subscribe(
      (data) => {
        this.contactUsList = data;
      },
      (error) => {
        console.error('Error fetching Contact Us:', error);
      }
    );
  }
}
