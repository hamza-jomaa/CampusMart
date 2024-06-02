import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr'; 
import { MerchandiseRequestComponent } from './merchandise-request.component';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
describe('MerchandiseRequestComponent', () => {
  let component: MerchandiseRequestComponent;
  let fixture: ComponentFixture<MerchandiseRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()], 
      declarations: [MerchandiseRequestComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(MerchandiseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize merchandise requests and stores on ngOnInit', () => {
    spyOn(component.admin, 'getAllPendingMerchandise');
    spyOn(component.admin, 'getAllStores').and.returnValue(of([])); 
    component.ngOnInit();
    expect(component.admin.getAllPendingMerchandise).toHaveBeenCalled();
    expect(component.stores).toEqual([]);
  });
  it('should accept merchandise', () => {
    const merchandiseId = 123;
    spyOn(component.confirmService, 'showConfirm').and.callFake((message: string, yes: () => void, no: () => void) => {
      yes(); 
    });
    spyOn(component.admin, 'updateMerchandiseStatus').and.returnValue(of(null)); 
    spyOn(component.toastr, 'success');
    component.acceptMerchandise(merchandiseId);
    expect(component.admin.updateMerchandiseStatus).toHaveBeenCalledWith(merchandiseId, 'Accept');
    expect(component.toastr.success).toHaveBeenCalledWith('Merchandise request accepted successfully.', 'Success', jasmine.any(Object));
  });
  
  
  
  it('should reject merchandise', () => {
    const merchandiseId = 123;
    spyOn(component.confirmService, 'showConfirm').and.callFake((message: string, yes: () => void, no: () => void) => {
      yes();
    });
    spyOn(component.admin, 'updateMerchandiseStatus').and.returnValue(of(null)); 
    spyOn(component.toastr, 'success');
    component.rejectMerchandise(merchandiseId);
    expect(component.admin.updateMerchandiseStatus).toHaveBeenCalledWith(merchandiseId, 'Reject');
    expect(component.toastr.success).toHaveBeenCalledWith('Merchandise request rejected successfully.', 'Success', jasmine.any(Object));
  });
  
  
});
