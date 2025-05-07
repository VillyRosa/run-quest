import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  public onSubmit(): void {
    if (this.form.valid) {
      const { email } = this.form.value;
      this.requestResetPassword(email);
    } else {
      if (this.form.get('email')?.hasError('required')) {
        this.toastService.error('E-mail é obrigatório.');
      } else if (this.form.get('email')?.hasError('email')) {
        this.toastService.error('Formato de e-mail inválido.');
      }
    }
  }

  public async requestResetPassword(email: string): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.authService.resetPasswordRequest(email).subscribe({
      next: () => {
        this.toastService.success('Código enviado com sucesso!');
        this.form.reset();
        this.router.navigate(['/verify-reset-code']);
      },
      error: () => {
        this.toastService.error('Erro ao tentar solicitar redefinição de senha. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }
}
