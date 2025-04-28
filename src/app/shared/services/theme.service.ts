import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private static readonly THEME_KEY = 'theme';

  public static getCurrentTheme(): 'light' | 'dark' | 'system' {
    return localStorage.getItem(this.THEME_KEY) as 'light' | 'dark' | 'system' || 'system';
  }

  public static getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  public static setTheme(theme: 'light' | 'dark' | 'system'): void {
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.classList.toggle(
      'ion-palette-dark',
      theme === 'dark' || (theme === 'system' && this.getSystemTheme() === 'dark')
    );
  }

  public static initializeTheme(): void {
    this.setTheme(this.getCurrentTheme());
  }
}
