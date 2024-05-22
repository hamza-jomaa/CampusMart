import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gAuthAdminGuard } from './g-auth-admin.guard';

describe('authAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gAuthAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
