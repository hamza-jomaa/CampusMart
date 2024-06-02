import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisaComponent } from './add-visa.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrModule } from 'ngx-toastr'; 
describe('AddVisaComponent', () => {
  let component: AddVisaComponent;
  let fixture: ComponentFixture<AddVisaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()],  
      declarations: [AddVisaComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(AddVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form and get consumer ID on ngOnInit', () => {
    spyOn(component, 'initForm');
    spyOn(component, 'getConsumerIdFromLocalStorage');
    component.ngOnInit();
    expect(component.initForm).toHaveBeenCalled();
    expect(component.getConsumerIdFromLocalStorage).toHaveBeenCalled();
  });
  it('should initialize the form with default values', () => {
    component.initForm();
    expect(component.visaForm.get('username')?.value).toEqual('');
    expect(component.visaForm.get('cardnumber')?.value).toEqual('');
    expect(component.visaForm.get('cardholder')?.value).toEqual('');
    expect(component.visaForm.get('cvv')?.value).toEqual('');
    expect(component.visaForm.get('consumerId')?.value).toEqual('');
  });
  it('should get consumer ID from local storage', () => {
    const userData = { login_ConsumerID: '123456' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userData));
    component.getConsumerIdFromLocalStorage();
    expect(component.consumerId).toEqual('123456');
  });
  
});
