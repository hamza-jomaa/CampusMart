import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusReqComponent } from './contactus-req.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { of, throwError } from 'rxjs';

describe('ContactusReqComponent', () => {
  let component: ContactusReqComponent;
  let fixture: ComponentFixture<ContactusReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      declarations: [ContactusReqComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(ContactusReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllContacts method on ngOnInit', () => {
    spyOn(component, 'getAllContacts');
    component.ngOnInit();
    expect(component.getAllContacts).toHaveBeenCalled();
  });
  it('should fetch contact us list from the service', () => {
    const mockContactUsList = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]; 
    spyOn(component.adminService, 'getAllContactUS').and.returnValue(of(mockContactUsList));
    component.getAllContacts();
    expect(component.contactUsList).toEqual(mockContactUsList);
  });
  it('should handle error when fetching contact us list', () => {
    const mockError = '404 Not Found'; 
    spyOn(component.adminService, 'getAllContactUS').and.returnValue(throwError(mockError));
    spyOn(console, 'error'); 
    component.getAllContacts();
    expect(console.error).toHaveBeenCalledWith('Error fetching Contact Us:', mockError);
  });
  
});
