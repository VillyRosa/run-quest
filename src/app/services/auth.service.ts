import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  public login(email: string, password: string): void {
    localStorage.setItem('token', 'token');
    this.router.navigate(['/']);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
