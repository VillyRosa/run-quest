import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRippleEffect, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList } from '@ionic/angular/standalone';
import { RunHistoryService } from 'src/app/services/run-history.service';

@Component({
  selector: 'app-run-history',
  templateUrl: './run-history.page.html',
  styleUrls: ['./run-history.page.scss'],
  standalone: true,
  imports: [IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonRippleEffect, IonContent, CommonModule, FormsModule]
})
export class RunHistoryPage {
  private historyService = inject(RunHistoryService);

  public runs = this.historyService.getRuns();
}
