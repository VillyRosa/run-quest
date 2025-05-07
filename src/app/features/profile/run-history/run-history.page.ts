import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonRippleEffect } from '@ionic/angular/standalone';
import { RaceService } from '@features/race/race.service';
import { TranslateModule } from '@ngx-translate/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { SecondsToTimePipe } from 'src/app/shared/pipes/seconds-to-time.pipe';

@Component({
  selector: 'app-run-history',
  templateUrl: './run-history.page.html',
  styleUrls: ['./run-history.page.scss'],
  standalone: true,
  imports: [IonRippleEffect, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, TranslateModule, SecondsToTimePipe]
})
export class RunHistoryPage {
  private raceService = inject(RaceService);
  public pageableRuns$ = this.raceService.getAll(TokenService.getUserId() || '');
}
