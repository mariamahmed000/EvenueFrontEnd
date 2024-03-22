import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { adminProtectGuard } from './admin-protect.guard';



describe('adminProtectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => adminProtectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
