import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RacePage } from '@shared/models/RacePage';
import { Race } from '@shared/models/Race';
import { NewRace } from '@shared/models/NewRace';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private http = inject(HttpClient);

  public getAll(userId: string = '', page: number = 0, size: number = 10): Observable<RacePage> {
    return this.http.get<RacePage>(`races?userId=${userId}&page=${page}&size=${size}`);
  }

  public getById(id: string): Observable<Race> {
    return this.http.get<Race>(`races/${id}`);
  }

  public create(newRace: NewRace): Observable<Race> {
    return this.http.post<Race>('races', newRace);
  }
}
