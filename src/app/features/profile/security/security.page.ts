import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward, lockClosedOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, RouterModule]
})
export class SecurityPage {
  constructor() {
    addIcons({ chevronForward, lockClosedOutline });
  }
}
