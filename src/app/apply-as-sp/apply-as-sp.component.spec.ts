import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAsSPComponent } from './apply-as-sp.component';

describe('ApplyAsSPComponent', () => {
  let component: ApplyAsSPComponent;
  let fixture: ComponentFixture<ApplyAsSPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyAsSPComponent]
    });
    fixture = TestBed.createComponent(ApplyAsSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
