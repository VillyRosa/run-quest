import { Injectable, signal } from '@angular/core';
import { RunRecord } from '../types/RunRecord';

@Injectable({
  providedIn: 'root'
})
export class RunHistoryService {
  private runs = signal<RunRecord[]>([]);

  public getRuns() {
    return this.runs.asReadonly();
  }

  public addRun(run: RunRecord) {
    this.runs.update(runs => [...runs, run]);
  }
}
