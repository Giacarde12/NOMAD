import { AtmosphereMode, SensoryConfig, NavigationItem } from './types';

// Base visual configuration to keep appearance constant across modes
const BASE_VISUALS = {
  color: '#e2e8f0', // Slate 200 (Silvery White)
  distort: 0.3,
  speed: 1.5,
  roughness: 0.1,
  metalness: 0.8,
};

export const SENSORY_CONFIGS: Record<AtmosphereMode, SensoryConfig> = {
  SILENCE: {
    ...BASE_VISUALS,
    // Ambient Drone
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_165283d565.mp3?filename=deep-meditation-om-165283d565.mp3' 
  },
  WIND: {
    ...BASE_VISUALS, // Visuals remain consistent
    // Wind sound
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_5c06243749.mp3?filename=wind-blowing-sfx-12809.mp3'
  },
  OCEAN: {
    ...BASE_VISUALS, // Visuals remain consistent
    // Ocean waves
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_0084201d9a.mp3?filename=ocean-waves-112906.mp3'
  },
};

// Orbiting "Planets"
export const NAV_ITEMS: NavigationItem[] = [
  { 
    label: 'Cinema', 
    description: 'Visual storytelling & Moving Image',
    orbitRadius: 3.2, 
    orbitSpeed: 0.2, 
    yOffset: 0.5,
    scale: 0.6
  },
  { 
    label: 'Exhibitions', 
    description: 'Spatial Installations',
    orbitRadius: 4.5, 
    orbitSpeed: 0.15, 
    yOffset: -1.2,
    scale: 0.7
  },
  { 
    label: 'Raw Pantelleria', 
    description: 'Residency & Retreat',
    orbitRadius: 3.8, 
    orbitSpeed: 0.25, 
    yOffset: 1.5,
    scale: 0.5
  },
  {
    label: 'Journal',
    description: 'Thoughts & Research',
    orbitRadius: 5.2,
    orbitSpeed: 0.1,
    yOffset: 0,
    scale: 0.4
  }
];

export const MANIFESTO_TEXT = "WE ARE A TRANSMEDIA STUDIO BLENDING ORGANIC NATURE WITH DIGITAL ART.";