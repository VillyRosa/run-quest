import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private toastService = inject(ToastService);

  public login(email: string, password: string): void {
    localStorage.setItem('token', 'token');
    this.router.navigate(['/']);
    this.toastService.success('Bem vindo!');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth-start']);
    this.toastService.success('Deslogado com sucesso!');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
