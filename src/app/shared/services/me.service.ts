import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private http = inject(HttpClient);

  public deleteMyAccount(): Observable<void> {
    return this.http.delete<void>('/users/me');
  }
}
