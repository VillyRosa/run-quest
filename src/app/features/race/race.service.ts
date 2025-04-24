import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RacePage } from 'src/app/shared/models/RacePage';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private http = inject(HttpClient);

  public getAll(): Observable<RacePage> {
    return this.http.get<RacePage>('races');
  }
}
