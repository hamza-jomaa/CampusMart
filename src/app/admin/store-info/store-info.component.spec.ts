import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInfoComponent } from './store-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { of, throwError } from 'rxjs';
describe('StoreInfoComponent', () => {
  let component: StoreInfoComponent;
  let fixture: ComponentFixture<StoreInfoComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      declarations: [StoreInfoComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(StoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllStores method on ngOnInit', () => {
    spyOn(component, 'getAllStores');
    component.ngOnInit();
    expect(component.getAllStores).toHaveBeenCalled();
  });
  it('should fetch and filter store information from the service', () => {
    const mockStores = [
      { id: 1, name: 'Store A', approvalstatus: 'Accept' },
      { id: 2, name: 'Store B', approvalstatus: 'Pending' },
      { id: 3, name: 'Store C', approvalstatus: 'Accept' }
    ];
    spyOn(component.adminService, 'getAllStores').and.returnValue(of(mockStores));
    component.getAllStores();
    expect(component.storesInfo).toEqual([
      { id: 1, name: 'Store A', approvalstatus: 'Accept' },
      { id: 3, name: 'Store C', approvalstatus: 'Accept' }
    ]);
  });
  it('should handle error when fetching stores', () => {
    const mockError = '404 Not Found'; 
    spyOn(component.adminService, 'getAllStores').and.returnValue(throwError(mockError));
    spyOn(console, 'error');
    component.getAllStores();
    expect(console.error).toHaveBeenCalledWith('Error fetching stores:', mockError);
  });
  
});
