import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonContent, CommonModule, FormsModule, IonInputPasswordToggle, ReactiveFormsModule]
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  public onSubmit(): void {
    if (this.form.valid) {
      const { username, email, password, confirmPassword } = this.form.value;
      console.log({ username, email, password, confirmPassword });
      this.authService.register({ username, email, password, confirmPassword });
    } else {
      if (this.form.get('username')?.hasError('required')) {
        this.toastService.error('Usuário é obrigatório.');
      } else if (this.form.get('email')?.hasError('required')) {
        this.toastService.error('E-mail é obrigatório.');
      } else if (this.form.get('email')?.hasError('email')) {
        this.toastService.error('Formato de e-mail inválido.');
      } else if (this.form.get('password')?.hasError('required')) {
        this.toastService.error('Senha é obrigatória.');
      } else if (this.form.get('confirmPassword')?.hasError('required')) {
        this.toastService.error('Confirmação de senha é obrigatória.');
      } else if (this.form.get('password')?.value !== this.form.get('confirmPassword')?.value) {
        this.toastService.error('Senhas diferentes.');
      } else {
        this.toastService.error('Por favor, preencha todos os campos corretamente.');
      }
    }
  }
}
