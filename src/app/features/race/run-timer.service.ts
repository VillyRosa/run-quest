import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunTimerService {
  private elapsedSeconds = 0;
  private timer$ = new BehaviorSubject<number>(0);
  private timerSubscription?: Subscription;

  public formattedTime$ = this.timer$.pipe(
    map(seconds => this.formatTime(seconds))
  );

  public startTimer(): void {
    if (this.timerSubscription) return;

    this.timerSubscription = interval(1000).subscribe(() => {
      this.elapsedSeconds++;
      this.timer$.next(this.elapsedSeconds);
    });
  }

  public pauseTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = undefined;
  }

  public resetTimer(): void {
    this.pauseTimer();
    this.elapsedSeconds = 0;
    this.timer$.next(this.elapsedSeconds);
  }

  private formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
