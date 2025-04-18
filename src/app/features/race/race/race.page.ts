import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { RunService } from 'src/app/features/race/run.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-race',
  templateUrl: './race.page.html',
  styleUrls: ['./race.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule]
})
export class RacePage {
  private runService = inject(RunService);
  private router = inject(Router);

  public timer$ = this.runService.getTime();
  public distance$ = this.runService.getDistance();

  public ionViewDidEnter(): void {
    this.runService.start();
  }

  public async onFinish(): Promise<void> {
    const id = await this.runService.finishRun();
    this.router.navigate(['/home/race-result', id]);
  }
}
