import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonAlert, LoadingController } from '@ionic/angular/standalone';
import { RunService } from '../run.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RaceService } from '../race.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.page.html',
  styleUrls: ['./race.page.scss'],
  standalone: true,
  imports: [IonAlert, IonButton, IonContent, CommonModule, FormsModule, TranslateModule]
})
export class RacePage {
  private runService = inject(RunService);
  private router = inject(Router);
  private raceService = inject(RaceService);
  private loadingCtrl = inject(LoadingController);

  public timer$ = this.runService.getTime();
  public distance$ = this.runService.getDistance();
  public active: boolean = false;
  public finishRaceAlertButtons = [
    {
      text: 'Voltar',
      role: 'cancel'
    },
    {
      text: 'Finalizar',
      role: 'confirm',
      handler: () => this.onFinish(),
    },
  ];
  public cancelRaceAlertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => this.onCancel(),
    },
  ];

  public ionViewDidEnter(): void {
    this.runService.start();
    this.active = true;
  }

  public onToggleActive(): void {
    if (this.active) {
      this.runService.pause();
    } else {
      this.runService.start();
    }
    this.active = !this.active;
  }

  public async onFinish(): Promise<void> {
    this.runService.pause();

    const loading = await this.loadingCtrl.create({ message: 'Salvando corrida...' });
    await loading.present();

    const newRace = this.runService.createNewRaceObject();
    this.raceService.create(newRace).subscribe({
      next: (race) => {
        this.runService.reset();
        this.router.navigate(['/home/race-result', race.id]);
      },
      error: (error) => {
        console.error('Error finishing run:', error);
        throw error;
      }
    }).add(() => loading.dismiss());
  }

  public onCancel(): void {
    this.runService.reset();
    this.router.navigate(['/home']);
  }
}
