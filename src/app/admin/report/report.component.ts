import { Component,ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  @ViewChild('contentPDF', { static: false })pdfElement!:ElementRef;
  startDate!:Date;
  endDate!:Date;
  usersCount:any;
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),  // Provide a default start date
    end: new FormControl<Date | null>(new Date()),    // Provide a default end date
  });
  selectedMonth: string = ''; // Initialize with an empty string or any default value
  selectedYear:string='';
  months: string[] = [
    'None','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  years:string[] = ['2022', '2023', '2024'];
  allOrders:any;
  ordersCount:number;
  constructor( private orderService:OrderService){}
  ngOnInit(): void {
    this.GetOrders();
  }

  
 
GetOrders(){
  this.orderService.GetOrders().subscribe(
    (data) => {
      
      this.allOrders = data;
      this.ordersCount=this.allOrders.length
    },
    (error) => {
      console.error('Error ', error);
    }
  );
}

createPDF(){
  let pdf = new jsPDF('l','pt','a4',true);
  pdf.text("Orders Report",10,10);
  pdf.html(this.pdfElement.nativeElement,{
    callback:(pdf)=>{
      pdf.save('Orders Report.pdf');
    }
  });
}
}
