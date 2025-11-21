import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.getAttribute('role') === 'button') {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer Ring */}
      <div
        className={`
          relative -top-3 -left-3 rounded-full border border-black transition-all duration-300 ease-out
          ${hovered ? 'w-12 h-12 opacity-40' : 'w-6 h-6 opacity-20'}
          ${clicked ? 'scale-90' : 'scale-100'}
        `}
      />
      {/* Inner Dot */}
      <div 
        className={`
            absolute top-0 left-0 w-1 h-1 bg-black rounded-full -translate-x-1/2 -translate-y-1/2
            transition-all duration-200
            ${hovered ? 'bg-black' : 'bg-black/50'}
        `} 
      />
    </div>
  );
};

export default Cursor;