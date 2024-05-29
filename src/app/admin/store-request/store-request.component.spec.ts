import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRequestComponent } from './store-request.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrModule } from 'ngx-toastr'; 
import { of, throwError } from 'rxjs';
describe('StoreRequestComponent', () => {
  let component: StoreRequestComponent;
  let fixture: ComponentFixture<StoreRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()], 
      declarations: [StoreRequestComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(StoreRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call GetAllPendingStores method on ngOnInit', () => {
    spyOn(component.admin, 'GetAllPendingStores');
    component.ngOnInit();
    expect(component.admin.GetAllPendingStores).toHaveBeenCalled();
  });
  

  
});
