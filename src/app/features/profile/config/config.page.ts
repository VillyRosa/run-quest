import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonSelect, IonSelectOption, IonButton, IonAlert } from '@ionic/angular/standalone';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { MeService } from 'src/app/shared/services/me.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonAlert, IonButton, IonSelectOption, IonSelect, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, FormsModule, TranslateModule]
})
export class ConfigPage {
  private languageService = inject(LanguageService);
  private meService = inject(MeService);
  private authService = inject(AuthService);

  public selectedLang = this.languageService.getCurrentLanguage();
  public selectedTheme = ThemeService.getCurrentTheme();

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

  public changeLang(event: any): void {
    const lang = event.detail.value;
    this.languageService.setLanguage(lang);
    this.selectedLang = lang;
  }

  public changeTheme(event: any): void {
    const theme = event.detail.value;
    ThemeService.setTheme(theme);
  }

  public deleteAccount(): void {
    this.meService.deleteMyAccount().subscribe({
      next: () => {
        this.authService.logout();
      }
    });
  }
}
