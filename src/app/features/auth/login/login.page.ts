import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonItem, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/features/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonButton, IonContent, CommonModule, FormsModule, IonInputPasswordToggle, ReactiveFormsModule, RouterModule]
})
export class LoginPage {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  public onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email, password);
    } else {
      if (this.form.get('email')?.hasError('required')) {
        this.toastService.error('E-mail é obrigatório.');
      } else if (this.form.get('email')?.hasError('email')) {
        this.toastService.error('Formato de e-mail inválido.');
      } else if (this.form.get('password')?.hasError('required')) {
        this.toastService.error('Senha é obrigatória.');
      } else {
        this.toastService.error('Por favor, preencha todos os campos corretamente.');
      }
    }
  }
}
