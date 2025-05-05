import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private http = inject(HttpClient);

  public getMyAccount(): Observable<User> {
    return this.http.get<User>('/users/me');
  }

  public updateMyAccount(username: string, email: string): Observable<User> {
    return this.http.put<User>('/users/me', { username, email });
  }

  public updateMyPassword(password: string, confirmPassword: string): Observable<void> {
    return this.http.put<void>('/users/me/password', { password, confirmPassword });
  }

  public deleteMyAccount(): Observable<void> {
    return this.http.delete<void>('/users/me');
  }
}
