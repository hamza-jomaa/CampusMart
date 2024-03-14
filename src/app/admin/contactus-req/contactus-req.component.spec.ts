import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusReqComponent } from './contactus-req.component';

describe('ContactusReqComponent', () => {
  let component: ContactusReqComponent;
  let fixture: ComponentFixture<ContactusReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactusReqComponent]
    });
    fixture = TestBed.createComponent(ContactusReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
