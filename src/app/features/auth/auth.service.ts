import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { TokenService } from '@shared/services/token.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models/User';
import { Register } from './Register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private loadingCtrl = inject(LoadingController)
  private toastService = inject(ToastService);
  private translate = inject(TranslateService)

  public async login(email: string, password: string): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.post<string>('auth/login', { email, password}, { responseType: 'text' as 'json' }).subscribe({
      next: (response: string) => {
        TokenService.setToken(response);
        this.router.navigate(['/']);
        this.toastService.success(this.translate.instant('WELCOME') + '!');
      },
      error: () => {
        this.toastService.error('Erro ao tentar autenticar. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }

  public async register(register: Register): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.post<User>('auth/register', register).subscribe({
      next: (resp) => {
        this.toastService.success('Conta criada com sucesso! Logando...');
        this.login(resp.email, register.password);
      },
      error: () => {
        this.toastService.error('Erro ao tentar registrar. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }

  public logout(): void {
    TokenService.removeToken();
    this.router.navigate(['/auth-start']);
    this.toastService.success(this.translate.instant('LOGOUT_SUCCESS') + '!');
  }

  public resetPasswordRequest(email: string): Observable<void> {
    return this.http.post<void>('auth/reset-password/request', { email });
  }

  public resetPasswordVerify(email: string, code: string): Observable<string> {
    return this.http.post<string>('auth/reset-password/verify', { email, code }, { responseType: 'text' as 'json' });
  }

  public resetPasswordConfirm(token: string, password: string, confirmPassword: string): Observable<void> {
    return this.http.post<void>('auth/reset-password/confirm', { password, confirmPassword }, { headers: { Authorization: `Bearer ${token}` } });
  }
}
