import { inject, Injectable } from '@angular/core';
import { RunTimerService } from './run-timer.service';
import { firstValueFrom, Observable, race, take } from 'rxjs';
import { RunGeoService } from './run-geo.service';
import { RaceService } from './race.service';
import { LoadingController } from '@ionic/angular';
import { NewRace } from 'src/app/shared/models/NewRace';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private timerService = inject(RunTimerService);
  private geoService = inject(RunGeoService);
  private raceService = inject(RaceService);
  private loadingCtrl = inject(LoadingController);

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

  public async finishRun(): Promise<string> {
    const loading = await this.loadingCtrl.create({ message: 'Salvando corrida...' });
    await loading.present();

    try {
      const newRace: NewRace = {
        distance: this.geoService.getCurrentDistance(),
        duration: this.timerService.getElapsedSeconds(),
        startTime: new Date(Date.now() - this.timerService.getElapsedSeconds() * 1000).toISOString(),
        endTime: new Date().toISOString()
      };

      this.pause();

      const race = await firstValueFrom(
        this.raceService.create(newRace).pipe(take(1))
      );

      return race.id;
    } catch (error) {
      console.error('Error finishing run:', error);
      throw error;
    } finally {
      await loading.dismiss();
    }
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
