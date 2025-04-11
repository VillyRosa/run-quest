import { inject, Injectable } from '@angular/core';
import { RunTimerService } from './run-timer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private timerService = inject(RunTimerService);

  public start(): void {
    this.timerService.startTimer();
  }

  public pause(): void {
    this.timerService.pauseTimer();
  }

  public stop(): void {
    this.timerService.pauseTimer();
  }

  public reset(): void {
    this.timerService.resetTimer();
  }

  public getTime(): Observable<string> {
    return this.timerService.formattedTime$;
  }
}
