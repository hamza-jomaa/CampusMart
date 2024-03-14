import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerInfoComponent } from './consumer-info.component';

describe('ConsumerInfoComponent', () => {
  let component: ConsumerInfoComponent;
  let fixture: ComponentFixture<ConsumerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerInfoComponent]
    });
    fixture = TestBed.createComponent(ConsumerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
