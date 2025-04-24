import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/features/auth/auth.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, RouterModule, TranslateModule]
})
export class ProfilePage {
  private authService = inject(AuthService);

  public onLogout(): void {
    this.authService.logout();
  }
}
