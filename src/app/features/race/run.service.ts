import { inject, Injectable } from '@angular/core';
import { RunTimerService } from './run-timer.service';
import { Observable } from 'rxjs';
import { RunGeoService } from './run-geo.service';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private timerService = inject(RunTimerService);
  private geoService = inject(RunGeoService);

  public start(): void {
    this.timerService.startTimer();
    this.geoService.startTracking();
  }

  public pause(): void {
    this.timerService.pauseTimer();
    this.geoService.stopTracking();
  }

  public stop(): void {
    this.timerService.pauseTimer();
    this.geoService.stopTracking();
  }

  public async finishRun(): Promise<number | string> {
    this.pause();
    return 1;
  }

  public reset(): void {
    this.timerService.resetTimer();
    this.geoService.stopTracking();
  }

  public getTime(): Observable<string> {
    return this.timerService.formattedTime$;
  }

  public getDistance(): Observable<number> {
    return this.geoService.distance;
  }
}
