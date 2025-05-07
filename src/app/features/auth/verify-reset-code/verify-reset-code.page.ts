import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.page.html',
  styleUrls: ['./verify-reset-code.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, ReactiveFormsModule]
})
export class VerifyResetCodePage implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private email: string | null = null;

  public form: FormGroup = this.fb.group({
    code: ['', [Validators.required]]
  });

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  public onSubmit(): void {
    if (this.form.valid && this.email) {
      const { code } = this.form.value;
      this.verifyResetCode(code);
    } else {
      if (this.form.get('code')?.hasError('required')) {
        this.toastService.error('Código é obrigatório.');
      }
    }
  }

  public async verifyResetCode(code: string): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.authService.resetPasswordVerify(this.email!, code).subscribe({
      next: (token) => {
        this.toastService.success('Código verificado com sucesso!');
        this.router.navigate(['/reset-password'], { queryParams: { token } });
      },
      error: () => {
        this.toastService.error('Código inválido. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }
}
