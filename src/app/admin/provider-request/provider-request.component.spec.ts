import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRequestComponent } from './provider-request.component';

describe('ProviderRequestComponent', () => {
  let component: ProviderRequestComponent;
  let fixture: ComponentFixture<ProviderRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderRequestComponent]
    });
    fixture = TestBed.createComponent(ProviderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
