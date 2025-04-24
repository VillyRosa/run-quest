import { inject, Injectable, signal } from '@angular/core';
import { RunRecord } from '../../shared/models/RunRecord';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RacePage } from 'src/app/shared/models/RacePage';

@Injectable({
  providedIn: 'root'
})
export class RunHistoryService {
  private http = inject(HttpClient);
  private runs = signal<RunRecord[]>([]);

  public getAll(): Observable<RacePage[]> {
    return this.http.get<RacePage[]>('races');
  }

  public getRuns() {
    return this.runs.asReadonly();
  }

  public addRun(run: RunRecord) {
    this.runs.update(runs => [...runs, run]);
  }
}
