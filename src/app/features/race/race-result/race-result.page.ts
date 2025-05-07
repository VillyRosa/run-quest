import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RaceService } from '../race.service';
import { SecondsToTimePipe } from '@shared/pipes/seconds-to-time.pipe';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.page.html',
  styleUrls: ['./race-result.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, SecondsToTimePipe]
})
export class RaceResultPage {
  private route = inject(ActivatedRoute);
  private raceService = inject(RaceService);

  public runId: string = this.route.snapshot.paramMap.get('id')!;
  public run$ = this.raceService.getById(this.runId);
}
