export type AtmosphereMode = 'SILENCE' | 'WIND' | 'OCEAN';

export interface SensoryConfig {
  color: string;
  distort: number;
  speed: number;
  roughness: number;
  metalness: number;
  audioUrl: string;
}

export interface NavigationItem {
  label: string;
  description?: string;
  orbitRadius: number;
  orbitSpeed: number;
  yOffset: number;
  scale: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
  sys: string;
}