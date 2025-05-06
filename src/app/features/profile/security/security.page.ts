import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonIcon, IonLabel, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward, lockClosedOutline, alertCircleOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { MeService } from 'src/app/shared/services/me.service';
import { AuthService } from '../../auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
  standalone: true,
  imports: [IonAlert, IonLabel, IonIcon, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, RouterModule, TranslateModule]
})
export class SecurityPage {
  private meService = inject(MeService);
  private authService = inject(AuthService);

  public deleteAccountAlertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Deletar',
      role: 'confirm',
      handler: () => this.deleteAccount(),
    },
  ];

  constructor() {
    addIcons({ chevronForward, lockClosedOutline, alertCircleOutline });
  }

  public deleteAccount(): void {
    this.meService.deleteMyAccount().subscribe({
      next: () => {
        this.authService.logout();
      }
    });
  }
}
