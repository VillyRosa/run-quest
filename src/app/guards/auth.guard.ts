import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '@shared/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = TokenService.isAuthenticated();

  if (!isAuthenticated) {
    inject(Router).navigate(['auth-start']);
    return false;
  }

  return true;
};
