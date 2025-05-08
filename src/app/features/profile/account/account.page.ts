import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonInput, IonButton, LoadingController } from '@ionic/angular/standalone';
import { MeService } from '@shared/services/me.service';
import { ToastService } from '@shared/services/toast.service';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AccountPage implements OnInit {
  private fb = inject(FormBuilder);
  private meService = inject(MeService);
  private toastService = inject(ToastService);
  private loadingCtrl = inject(LoadingController);

  public user: User | null = null;
  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  public async ngOnInit(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.meService.getMyAccount().subscribe({
      next: (user) => {
        this.user = user;
        this.form.patchValue({ username: user.username, email: user.email });
      },
      error: () => {
        this.toastService.error('Erro ao tentar obter dados da conta. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { username, email } = this.form.value;
      this.updateMyAccount(username, email);
    } else {
      if (this.form.get('username')?.hasError('required')) {
        this.toastService.error('Usuário é obrigatório.');
      } else if (this.form.get('email')?.hasError('required')) {
        this.toastService.error('E-mail é obrigatório.');
      } else if (this.form.get('email')?.hasError('email')) {
        this.toastService.error('Formato de e-mail inválido.');
      }
    }
  }

  public async updateMyAccount(username: string, email: string): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.meService.updateMyAccount(username, email).subscribe({
      next: () => {
        this.toastService.success('Conta atualizada com sucesso!');
      },
      error: () => {
        this.toastService.error('Erro ao tentar atualizar conta. Tente novamente.');
      }
    }).add(() => loading.dismiss());
  }
}
