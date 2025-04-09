import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../types/Challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  private http = inject(HttpClient);

  public getAll(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>('assets/mocks/challenges.json');
  }
}
