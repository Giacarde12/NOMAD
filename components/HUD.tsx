
import React, { useEffect, useState } from 'react';
import { Coordinates } from '../types';

const HUD: React.FC = () => {
  const [coords, setCoords] = useState<Coordinates>({ lat: 36.7843, lng: 11.9832, sys: 'STABLE' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Simulate coordinate changes based on mouse interaction
      const latOffset = (e.clientY / window.innerHeight) * 0.01;
      const lngOffset = (e.clientX / window.innerWidth) * 0.01;
      
      setCoords(prev => ({
        lat: 36.7843 + latOffset,
        lng: 11.9832 + lngOffset,
        sys: e.movementX > 5 || e.movementY > 5 ? 'RESONATING' : 'STABLE'
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Header Bar / Logo */}
      <div className="absolute top-0 left-0 w-full p-8 z-40 flex justify-between items-start">
        <div className="w-5 md:w-7">
          <img 
            src="https://static.wixstatic.com/media/2e0b3c_43a62993021449fb8a1767ba83372cac~mv2.png" 
            alt="Nomad Studio" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Fake Menu Lines */}
        <div className="flex flex-col gap-1.5 items-end w-8 cursor-pointer group">
            <div className="w-full h-[1px] bg-black/80 transition-all group-hover:w-1/2"></div>
            <div className="w-3/4 h-[1px] bg-black/80 transition-all group-hover:w-full"></div>
            <div className="w-1/2 h-[1px] bg-black/80 transition-all group-hover:w-3/4"></div>
        </div>
      </div>

      {/* Bottom Left Coordinates */}
      <div className="absolute bottom-8 left-8 z-40 font-mono text-[10px] text-black/60 flex flex-col gap-1">
        <div className="flex gap-4">
            <p>LAT {coords.lat.toFixed(4)}° N</p>
            <p>LNG {coords.lng.toFixed(4)}° E</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
            <div className={`w-1.5 h-1.5 rounded-full ${coords.sys === 'RESONATING' ? 'bg-emerald-500 animate-pulse' : 'bg-black/30'}`}></div>
            <p className="text-black/40 tracking-widest">SYS.{coords.sys}</p>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-black/20 z-30"></div>
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-black/20 z-30"></div>
      
      {/* Center Crosshair - very subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-black/[0.03] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-black/[0.02] rounded-full pointer-events-none z-0"></div>
    </>
  );
};

export default HUD;
