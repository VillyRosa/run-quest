import { Injectable, signal } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

type SimpleCoords = {
  latitude: number;
  longitude: number;
};

@Injectable({
  providedIn: 'root'
})
export class RunGeoService {
  private watchId: string | null = null;
  private lastPosition: SimpleCoords | null = null

  private _distance = signal(0);
  public distance = this._distance.asReadonly();

  public async startTracking(): Promise<void> {
    if (this.watchId) return;

    this.watchId = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
          return;
        }

        if (position?.coords) {
          const { latitude, longitude } = position.coords;
          this.updateDistance({ latitude, longitude });
        }
      }
    );
  }

  public stopTracking(): void {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }

    this.lastPosition = null;
    this._distance.set(0);
  }

  private updateDistance(coords: SimpleCoords): void {
    if (this.lastPosition) {
      const delta = this.calculateDistance(
        this.lastPosition.latitude,
        this.lastPosition.longitude,
        coords.latitude,
        coords.longitude
      );

      this._distance.update(current => current + delta);
    }

    this.lastPosition = coords;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
