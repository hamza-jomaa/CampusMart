import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseRequestComponent } from './merchandise-request.component';

describe('MerchandiseRequestComponent', () => {
  let component: MerchandiseRequestComponent;
  let fixture: ComponentFixture<MerchandiseRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchandiseRequestComponent]
    });
    fixture = TestBed.createComponent(MerchandiseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
