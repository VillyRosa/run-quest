import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MeService } from '@shared/services/me.service';
import { ToastService } from '@shared/services/toast.service';
import { IonHeader, IonItem, IonContent, IonToolbar, IonTitle, IonInput, IonButton, IonInputPasswordToggle, LoadingController } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonInputPasswordToggle, IonButton, IonInput, IonTitle, IonToolbar, IonContent, IonItem, IonHeader, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ChangePasswordPage {
  private fb = inject(FormBuilder);
  private meService = inject(MeService);
  private toastService = inject(ToastService);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);

  public form: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  public onSubmit(): void {
    if (this.form.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.form.value;
      this.updateMyPassword(currentPassword, newPassword, confirmPassword);
    } else {
      if (this.form.get('currentPassword')?.hasError('required')) {
        this.toastService.error('Senha atual é obrigatória.');
      } else if (this.form.get('newPassword')?.hasError('required')) {
        this.toastService.error('Nova senha é obrigatória.');
      } else if (this.form.get('confirmPassword')?.hasError('required')) {
        this.toastService.error('Confirmação de senha é obrigatória.');
      } else if (this.form.get('newPassword')?.value !== this.form.get('confirmPassword')?.value) {
        this.toastService.error('Senhas diferentes.');
      }
    }
  }

  public async updateMyPassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.meService.updateMyPassword(newPassword, confirmPassword).subscribe({
      next: () => {
        this.toastService.success('Senha atualizada com sucesso!');
        this.form.reset();
        this.router.navigate(['/profile/security']);
      },
      error: () => {
        this.toastService.error('Erro ao tentar atualizar senha. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }
}
