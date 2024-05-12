import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tesimonals',
  templateUrl: './tesimonals.component.html',
  styleUrls: ['./tesimonals.component.scss']
})
export class TesimonalsComponent implements OnInit {
  acceptedTestimonials: any[] = [];
  allTestimonials: any[] = []; 
  searchedDate: string = '';
  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
    this.adminService.getAllTestimonials().subscribe(
      (testimonials) => {
        this.allTestimonials = testimonials;
        this.acceptedTestimonials = testimonials.filter(testimonial => testimonial.status === 'Approved');
      },
      (error) => {
        console.error('Error fetching testimonials:', error);
      }
    );
  }
  searchTestimonialsByDate(): void {
    if (this.searchedDate.trim() === '') {
      this.acceptedTestimonials = this.allTestimonials.filter(testimonial => testimonial.status === 'Approved');
    } else {
      this.acceptedTestimonials = this.allTestimonials.filter(testimonial =>
        new Date(testimonial.dateposted).toLocaleDateString() === new Date(this.searchedDate).toLocaleDateString()
      );
    }
  }
}
