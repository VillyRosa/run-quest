import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonItem, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonButton, IonContent, CommonModule, FormsModule, IonInputPasswordToggle]
})
export class LoginPage {
  private authService = inject(AuthService);

  public onSubmit(): void {
    this.authService.login('email', 'password');
  }
}
