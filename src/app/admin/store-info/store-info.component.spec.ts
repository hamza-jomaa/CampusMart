import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInfoComponent } from './store-info.component';

describe('StoreInfoComponent', () => {
  let component: StoreInfoComponent;
  let fixture: ComponentFixture<StoreInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreInfoComponent]
    });
    fixture = TestBed.createComponent(StoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
