import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    inject(Router).navigate(['auth-start']);
    return false;
  }

  return true;
};
