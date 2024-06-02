import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrModule } from 'ngx-toastr'; 
import { of, throwError } from 'rxjs';
describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()],  
      declarations: [AdminDashboardComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call necessary methods on ngOnInit', () => {
    spyOn(component, 'getPendingTestimonials');
    spyOn(component, 'getNumberOfUsers');
    spyOn(component, 'getNumberOfAcceptedStores');
    component.ngOnInit();
    expect(component.getPendingTestimonials).toHaveBeenCalled();
    expect(component.getNumberOfUsers).toHaveBeenCalled();
    expect(component.getNumberOfAcceptedStores).toHaveBeenCalled();
  });
  it('should fetch and filter pending testimonials', () => {
    const mockTestimonials = [
      { id: 1, status: 'Pending' },
      { id: 2, status: 'Approved' },
      { id: 3, status: 'Pending' }
    ]; 
    spyOn(component.adminService, 'getAllPendingTestimonials').and.returnValue(of(mockTestimonials));
    component.getPendingTestimonials();
    expect(component.pendingTestimonials).toEqual([
      { id: 1, status: 'Pending' },
      { id: 3, status: 'Pending' }
    ]);
  });
  it('should approve testimonial', () => {
    const testimonialId = 123;
    spyOn(component.confirmService, 'showConfirm').and.callFake((message, onConfirm) => {
      onConfirm(); 
    });
    spyOn(component.adminService, 'approveTestimonial').and.returnValue(of(null));
    spyOn(component.toastr, 'success');
    component.approveTestimonial(testimonialId);
    expect(component.adminService.approveTestimonial).toHaveBeenCalledWith(testimonialId);
    expect(component.toastr.success).toHaveBeenCalledWith('Testimonial approved successfully', 'Success');
  });
  
});
