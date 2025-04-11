import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { RunService } from 'src/app/services/run.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.page.html',
  styleUrls: ['./race.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule]
})
export class RacePage {
  private runService = inject(RunService);
  public timer$ = this.runService.getTime();

  public ionViewDidEnter(): void {
    this.runService.start();
  }

  public onFinish(): void {
    this.runService.stop();
  }
}
