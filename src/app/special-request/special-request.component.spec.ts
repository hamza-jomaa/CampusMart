import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialRequestComponent } from './special-request.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrModule } from 'ngx-toastr'; 
import { of, throwError } from 'rxjs';
describe('SpecialRequestComponent', () => {
  let component: SpecialRequestComponent;
  let fixture: ComponentFixture<SpecialRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()],  
      declarations: [SpecialRequestComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(SpecialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize local data and form on ngOnInit', () => {
    spyOn(component, 'initLocalData');
    spyOn(component, 'initForm');
    component.ngOnInit();
    expect(component.initLocalData).toHaveBeenCalled();
    expect(component.initForm).toHaveBeenCalled();
  });
  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.requestForm.get('title')?.value).toEqual('');
    expect(component.requestForm.get('message')?.value).toEqual('');
    expect(component.requestForm.get('consumerid')?.value).toEqual('');
  });

  
});
