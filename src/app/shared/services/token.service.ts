import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public static getToken(): string | null {
    return localStorage.getItem('token');
  }

  public static setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public static removeToken(): void {
    localStorage.removeItem('token');
  }

  public static hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
