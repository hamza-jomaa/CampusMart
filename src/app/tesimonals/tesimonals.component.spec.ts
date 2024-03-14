import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesimonalsComponent } from './tesimonals.component';

describe('TesimonalsComponent', () => {
  let component: TesimonalsComponent;
  let fixture: ComponentFixture<TesimonalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesimonalsComponent]
    });
    fixture = TestBed.createComponent(TesimonalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
