import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';  
import { WritetestmonialComponent } from './writetestmonial.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
describe('WritetestmonialComponent', () => {
  let component: WritetestmonialComponent;
  let fixture: ComponentFixture<WritetestmonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), FormsModule, ReactiveFormsModule],
      declarations: [WritetestmonialComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritetestmonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize testimonial form with default values', () => {
    const expectedDate = new Date().toISOString().substr(0, 10);
    const formValues = component.testimonialForm.value;
    expect(formValues.dateOfPosted).toEqual(expectedDate);
    expect(formValues.testimonialtext).toEqual('');
    expect(formValues.status).toEqual('Pending');
  });



 


});
