import React from 'react';
import { AtmosphereMode } from '../types';

interface SensoryDockProps {
  currentMode: AtmosphereMode;
  setMode: (mode: AtmosphereMode) => void;
}

const SensoryDock: React.FC<SensoryDockProps> = ({ currentMode, setMode }) => {
  const modes: { id: AtmosphereMode; label: string; icon: string }[] = [
    { id: 'SILENCE', label: 'Silence', icon: 'M' },
    { id: 'WIND', label: 'Wind', icon: 'W' },
    { id: 'OCEAN', label: 'Ocean', icon: 'O' },
  ];

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-40">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => setMode(mode.id)}
          className="group flex items-center flex-row-reverse gap-4 relative outline-none"
          role="button"
        >
          <div
            className={`
              w-10 h-10 rounded-full border border-black/20 flex items-center justify-center
              text-xs font-light transition-all duration-500 backdrop-blur-sm
              ${currentMode === mode.id ? 'bg-black text-white border-black scale-110' : 'text-black/60 hover:border-black/60 hover:text-black'}
            `}
          >
            {mode.icon}
          </div>
          <span
            className={`
              text-[10px] uppercase tracking-[0.2em] font-light transition-all duration-500 bg-white/80 px-2 py-1 rounded
              ${currentMode === mode.id ? 'opacity-100 translate-x-0 text-black' : 'opacity-0 translate-x-4 text-black/40'}
            `}
          >
            {mode.label}
          </span>
        </button>
      ))}
      
      <div className="absolute right-5 top-[-60px] h-[calc(100%+120px)] w-[1px] bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default SensoryDock;