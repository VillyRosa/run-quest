import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonInputPasswordToggle, IonButton, IonItem } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonItem, IonButton, IonButton, IonInput, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, ReactiveFormsModule, IonInputPasswordToggle]
})
export class ResetPasswordPage implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private token: string | null = null;

  public form: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  public onSubmit(): void {
    if (this.form.valid && this.token) {
      const { password, confirmPassword } = this.form.value;
      this.confirmResetPassword(this.token, password, confirmPassword);
    } else {
      if (this.form.get('password')?.hasError('required')) {
        this.toastService.error('Senha é obrigatória.');
      } else if (this.form.get('confirmPassword')?.hasError('required')) {
        this.toastService.error('Confirmação de senha é obrigatória.');
      } else if (this.form.get('password')?.value !== this.form.get('confirmPassword')?.value) {
        this.toastService.error('Senhas diferentes.');
      }
    }
  }

  public async confirmResetPassword(token: string, password: string, confirmPassword: string): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.authService.resetPasswordConfirm(token, password, confirmPassword).subscribe({
      next: () => {
        this.toastService.success('Senha alterada com sucesso!');
        this.form.reset();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastService.error('Erro ao tentar alterar senha. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }
}
