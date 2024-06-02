import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAsSPComponent } from './apply-as-sp.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrModule } from 'ngx-toastr';  
describe('ApplyAsSPComponent', () => {
  let component: ApplyAsSPComponent;
  let fixture: ComponentFixture<ApplyAsSPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()],   
      declarations: [ApplyAsSPComponent],
      providers: [AdminService]  
    });
    fixture = TestBed.createComponent(ApplyAsSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
