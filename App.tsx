import React, { useState, Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Environment, ContactShadows } from '@react-three/drei';

import { AtmosphereMode } from './types';
import { SENSORY_CONFIGS } from './constants';
import BubbleSystem from './components/ResonantSphere';
import SensoryDock from './components/SensoryDock';
import HUD from './components/HUD';
import Cursor from './components/Cursor';

const App: React.FC = () => {
  const [mode, setMode] = useState<AtmosphereMode>('SILENCE');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Management Engine
  useEffect(() => {
    const config = SENSORY_CONFIGS[mode];
    
    if (!audioRef.current) {
        audioRef.current = new Audio(config.audioUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = 0;
    }

    // Fade out old sound
    const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
            audioRef.current.volume -= 0.05;
        } else {
            clearInterval(fadeOut);
            // Switch source
            if(audioRef.current) {
                audioRef.current.src = config.audioUrl;
                audioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));
                
                // Fade in new sound
                const fadeIn = setInterval(() => {
                    if (audioRef.current && audioRef.current.volume < 0.5) {
                        audioRef.current.volume += 0.05;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
            }
        }
    }, 50);

    return () => {
       // Cleanup if needed
    };
  }, [mode]);

  // Initial click to enable audio (browser policy)
  const [started, setStarted] = useState(false);
  const handleStart = () => {
      if (!started && audioRef.current) {
          setStarted(true);
          audioRef.current.play().catch(console.error);
      }
  };

  return (
    <div 
        className="w-full h-screen bg-white relative overflow-hidden selection:bg-black selection:text-white"
        onClick={handleStart}
    >
      <div className="grain-overlay" />
      <Cursor />
      
      <HUD />
      <SensoryDock currentMode={mode} setMode={setMode} />

      {/* Start Overlay */}
      {!started && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-700 pointer-events-none">
              <p className="text-black text-xs tracking-[0.3em] animate-pulse">CLICK TO ENTER THE SPHERE</p>
          </div>
      )}

      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 35 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#ffffff', 10, 25]} />
          
          {/* Lighting for Bubbles */}
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={4} />
          <pointLight position={[-10, -10, -10]} intensity={0.9} />

          {/* Environment for reflections (Crucial for bubbles) */}
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/kloppenheim_07_puresky_4k.hdr" background={false} />

          <Suspense fallback={null}>
            <BubbleSystem mode={mode} />
            
            <ContactShadows 
                position={[0, -4, 0]} 
                opacity={0.4} 
                scale={20} 
                blur={1} 
                far={4.5} 
                color="#000000"
            />
            
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default App;