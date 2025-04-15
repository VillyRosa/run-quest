import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.page.html',
  styleUrls: ['./race-result.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class RaceResultPage implements OnInit {
  private route = inject(ActivatedRoute);

  public runId: string | null = null;

  public ngOnInit(): void {
    this.runId = this.route.snapshot.paramMap.get('id');
  }
}
