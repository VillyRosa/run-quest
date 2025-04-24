import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { TokenService } from 'src/app/shared/services/token.service';

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

  public logout(): void {
    TokenService.removeToken();
    this.router.navigate(['/auth-start']);
    this.toastService.success(this.translate.instant('LOGOUT_SUCCESS') + '!');
  }
}
