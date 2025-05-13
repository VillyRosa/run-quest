import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonRippleEffect, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular/standalone';
import { RaceService } from '@features/race/race.service';
import { TranslateModule } from '@ngx-translate/core';
import { TokenService } from '@shared/services/token.service';
import { SecondsToTimePipe } from '@shared/pipes/seconds-to-time.pipe';
import { Race } from '@shared/models/Race';

@Component({
  selector: 'app-run-history',
  templateUrl: './run-history.page.html',
  styleUrls: ['./run-history.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonRippleEffect, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, TranslateModule, SecondsToTimePipe]
})
export class RunHistoryPage implements OnInit {
  private raceService = inject(RaceService);
  public runs: Race[] = [];
  public page = 0;
  public totalPages = 0;
  public isLoading = false;

  public ngOnInit(): void {
    this.loadRuns();
  }

  public async onIonInfinite(event: InfiniteScrollCustomEvent): Promise<void> {
    await this.loadRuns();
    event.target.complete();
  }

  private async loadRuns(): Promise<void> {
    this.isLoading = true;
    this.raceService.getAll(TokenService.getUserId()!, this.page).subscribe({
      next: (page) => {
        this.totalPages = page.totalPages;
        this.runs.push(...page.content);
        this.page++;
      },
      error: (error) => {
        console.error('Error loading runs:', error);
      }
    }).add(() => this.isLoading = false);
  }
}
