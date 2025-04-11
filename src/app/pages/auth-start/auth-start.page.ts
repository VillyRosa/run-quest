import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-start',
  templateUrl: './auth-start.page.html',
  styleUrls: ['./auth-start.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, RouterModule]
})
export class AuthStartPage {
}
