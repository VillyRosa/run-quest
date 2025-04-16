import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService)

  public login(email: string, password: string): void {
    localStorage.setItem('token', 'token');
    this.router.navigate(['/']);
    this.toastService.success(this.translate.instant('WELCOME') + '!');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth-start']);
    this.toastService.success(this.translate.instant('LOGOUT_SUCCESS') + '!');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
