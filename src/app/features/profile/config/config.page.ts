import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { LanguageService } from '@shared/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonSelectOption, IonSelect, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, FormsModule, TranslateModule]
})
export class ConfigPage {
  private languageService = inject(LanguageService);

  public selectedLang = this.languageService.getCurrentLanguage();
  public selectedTheme = ThemeService.getCurrentTheme();

  public changeLang(event: any): void {
    const lang = event.detail.value;
    this.languageService.setLanguage(lang);
    this.selectedLang = lang;
  }

  public changeTheme(event: any): void {
    const theme = event.detail.value;
    ThemeService.setTheme(theme);
  }
}
