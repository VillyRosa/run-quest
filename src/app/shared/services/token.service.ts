import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private static readonly TOKEN_KEY = 'token';

  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public static hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
