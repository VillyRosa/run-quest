import { inject, Injectable } from '@angular/core';
import { RunTimerService } from './run-timer.service';
import { Observable } from 'rxjs';
import { RunGeoService } from './run-geo.service';
import { NewRace } from '@shared/models/NewRace';

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
    this.geoService.pauseTracking();
  }

  public stop(): void {
    this.timerService.pauseTimer();
    this.geoService.stopTracking();
  }

  public createNewRaceObject(): NewRace {
    return {
      distance: this.geoService.getCurrentDistance(),
      duration: this.timerService.getElapsedSeconds(),
      startTime: new Date(Date.now() - this.timerService.getElapsedSeconds() * 1000).toISOString(),
      endTime: new Date().toISOString()
    };
  }

  public reset(): void {
    this.timerService.stopTimer();
    this.geoService.stopTracking();
  }

  public getTime(): Observable<string> {
    return this.timerService.formattedTime$;
  }

  public getDistance(): Observable<number> {
    return this.geoService.distance;
  }
}
