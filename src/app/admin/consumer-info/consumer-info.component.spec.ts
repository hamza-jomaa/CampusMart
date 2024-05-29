import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog'; 
import { ConsumerInfoComponent } from './consumer-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrModule } from 'ngx-toastr'; 
import { of, throwError } from 'rxjs';
describe('ConsumerInfoComponent', () => {
  let component: ConsumerInfoComponent;
  let fixture: ComponentFixture<ConsumerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MatDialogModule,ToastrModule.forRoot()],  
      declarations: [ConsumerInfoComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(ConsumerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call fetchConsumers method on ngOnInit', () => {
    spyOn(component, 'fetchConsumers');
    component.ngOnInit();
    expect(component.fetchConsumers).toHaveBeenCalled();
  });
  it('should fetch consumers information', () => {
    const mockConsumers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]; // Mock data
    spyOn(component.admin, 'getAllConsumers').and.returnValue(of(mockConsumers));
    component.fetchConsumers();
    expect(component.admin.consumersInfo).toEqual(mockConsumers);
  });
  it('should block user', () => {
    const consumerId = 123;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    spyOn(component.admin, 'blockUser').and.returnValue(of(null));
    spyOn(component.toastr, 'success');
    component.blockUser(consumerId);
    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.admin.blockUser).toHaveBeenCalledWith(consumerId);
    expect(component.toastr.success).toHaveBeenCalledWith('Blocked Successfully!', 'Success', jasmine.any(Object));
  });
  
});
