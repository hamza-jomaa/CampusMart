import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';  
import { TesimonalsComponent } from './tesimonals.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
describe('TesimonalsComponent', () => {
  let component: TesimonalsComponent;
  let fixture: ComponentFixture<TesimonalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()],
      declarations: [TesimonalsComponent]
    });
    fixture = TestBed.createComponent(TesimonalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch testimonials on initialization', () => {
    const mockTestimonials = [{ id: 1, status: 'Approved' }, { id: 2, status: 'Pending' }];
    spyOn(component.adminService, 'getAllTestimonials').and.returnValue(of(mockTestimonials));
  
    component.ngOnInit();
  
    expect(component.allTestimonials).toEqual(mockTestimonials);
    expect(component.acceptedTestimonials).toEqual([mockTestimonials[0]]);
  });
  it('should filter testimonials by date', () => {
    const mockTestimonials = [
      { id: 1, status: 'Approved', dateposted: '2024-05-29' },
      { id: 2, status: 'Approved', dateposted: '2024-05-30' }
    ];
    component.allTestimonials = mockTestimonials;
  
    component.searchedDate = '2024-05-29';
    component.searchTestimonialsByDate();
    expect(component.acceptedTestimonials).toEqual([mockTestimonials[0]]);
  });
  it('should reset accepted testimonials when search date is empty', () => {
    const mockTestimonials = [
      { id: 1, status: 'Approved', dateposted: '2024-05-29' },
      { id: 2, status: 'Approved', dateposted: '2024-05-30' }
    ];
    component.allTestimonials = mockTestimonials;
  
    component.searchedDate = '';
  
    component.searchTestimonialsByDate();
  
    expect(component.acceptedTestimonials).toEqual(mockTestimonials);
  });
  
});
