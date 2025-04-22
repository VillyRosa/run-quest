import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LANG_KEY = "app_language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);

  public initLanguage(): void {
    const storedLang = localStorage.getItem(LANG_KEY);
    const defaultLang = storedLang || 'pt';

    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }

  public setLanguage(lang: string): void {
    localStorage.setItem(LANG_KEY, lang);
    this.translate.use(lang);
  }

  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }
}
