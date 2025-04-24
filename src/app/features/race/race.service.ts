import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RacePage } from 'src/app/shared/models/RacePage';
import { Race } from 'src/app/shared/models/Race';
import { NewRace } from 'src/app/shared/models/NewRace';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private http = inject(HttpClient);

  public getAll(): Observable<RacePage> {
    return this.http.get<RacePage>('races');
  }

  public getById(id: string): Observable<Race> {
    return this.http.get<Race>(`races/${id}`);
  }

  public create(newRace: NewRace): Observable<Race> {
    return this.http.post<Race>('races', newRace);
  }
}
