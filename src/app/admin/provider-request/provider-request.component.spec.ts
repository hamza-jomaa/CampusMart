import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRequestComponent } from './provider-request.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrModule } from 'ngx-toastr'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { of, throwError } from 'rxjs';
describe('ProviderRequestComponent', () => {
  let component: ProviderRequestComponent;
  let fixture: ComponentFixture<ProviderRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot(),MatDialogModule], 
      declarations: [ProviderRequestComponent],
      providers:[AdminService]
    });
    fixture = TestBed.createComponent(ProviderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllPendingProviders method on ngOnInit', () => {
    spyOn(component.admin, 'getAllPendingProviders');
    component.ngOnInit();
    expect(component.admin.getAllPendingProviders).toHaveBeenCalled();
  });
  it('should accept provider', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true) });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    spyOn(component.admin, 'acceptProvider').and.returnValue(of(null));
    spyOn(component, 'addNotification');
    spyOn(component.toastr, 'success');
    component.acceptProvider(123, 456);
    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.admin.acceptProvider).toHaveBeenCalledWith(123, 456);
    expect(component.addNotification).toHaveBeenCalledWith(123, 'Your request to become a provider has been accepted.');
    expect(component.toastr.success).toHaveBeenCalledWith('Provider Accepted Successfully!', 'Success', jasmine.any(Object));
  });
  it('should reject provider', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true) });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    spyOn(component.admin, 'rejectProvider').and.returnValue(of(null));
    spyOn(component, 'addNotification');
    spyOn(component.toastr, 'success');
    component.rejectProvider(123, 456);
    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.admin.rejectProvider).toHaveBeenCalledWith(123, 456);
    expect(component.addNotification).toHaveBeenCalledWith(123, 'Your request to become a provider has been rejected.');
    expect(component.toastr.success).toHaveBeenCalledWith('Provider Rejected Successfully!', 'Success', jasmine.any(Object));
  });
  
});
