import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritetestmonialComponent } from './writetestmonial.component';

describe('WritetestmonialComponent', () => {
  let component: WritetestmonialComponent;
  let fixture: ComponentFixture<WritetestmonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WritetestmonialComponent]
    });
    fixture = TestBed.createComponent(WritetestmonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
