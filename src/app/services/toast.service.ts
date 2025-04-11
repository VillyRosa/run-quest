import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

interface ToastOptions {
  duration?: number,
  color?: 'success' | 'danger' | 'warning' | 'primary' | 'medium' | 'dark',
  position?: 'top' | 'middle' | 'bottom'
};

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController = inject(ToastController);

  public show(message: string, options?: ToastOptions): void {
    this.toastController.create({
      message,
      duration: options?.duration ?? 2000,
      color: options?.color ?? 'primary',
      position: options?.position ?? 'top',
    }).then(toast => toast.present());
  }

  public success(message: string): void {
    this.show(message, { color: 'success' });
  }

  public error(message: string): void {
    this.show(message, { color: 'danger' });
  }
}
