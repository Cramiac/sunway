export interface SunPosition {
  azimuth: number; // degrees from north (0-360)
  elevation: number; // degrees above horizon
  isVisible: boolean; // whether sun is above horizon
}

export type CompassMode = 'towards' | 'away';

export interface Location {
  latitude: number;
  longitude: number;
}