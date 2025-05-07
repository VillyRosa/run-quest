import { Injectable } from '@angular/core';
import { DecodedToken } from '@shared/models/DecodedToken';
import { jwtDecode } from 'jwt-decode';

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

  public static decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  public static getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub || null;
  }

  public static getUserName(): string | null {
    const decoded = this.decodeToken();
    return decoded?.username || null;
  }

  public static isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
  }
}
