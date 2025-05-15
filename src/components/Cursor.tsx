
import { useState, useEffect } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [trails, setTrails] = useState<{ x: number, y: number, id: number }[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Performance optimization: Only create trails when moving
    let timeout: ReturnType<typeof setTimeout>;
    let trailInterval: ReturnType<typeof setInterval>;
    let isMoving = false;
    
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
      
      // Show cursor when mouse moves
      setIsHidden(false);
      clearTimeout(timeout);
      
      // Add trail point
      if (!isMoving) {
        isMoving = true;
        trailInterval = setInterval(() => {
          setTrails(prevTrails => [
            { x: e.clientX, y: e.clientY, id: nextId },
            ...prevTrails.slice(0, 5)  // Limit trail points to prevent lag
          ]);
          setNextId(id => id + 1);
        }, 100);
      }
      
      // Hide cursor after 2 seconds of inactivity
      timeout = setTimeout(() => {
        setIsHidden(true);
        clearInterval(trailInterval);
        isMoving = false;
        setTrails([]);  // Clear trails when inactive
      }, 2000);
    };

    window.addEventListener('mousemove', updateCursor);
    
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      clearTimeout(timeout);
      clearInterval(trailInterval);
    };
  }, [nextId]);

  // Fade out and remove trails over time
  useEffect(() => {
    const timer = setTimeout(() => {
      if (trails.length > 0) {
        setTrails(prevTrails => prevTrails.slice(0, -1));
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [trails]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <div 
        className={`custom-cursor ${isPointer ? 'scale-150' : ''} ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      />
      
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: 1 - (index * 0.2),
            transform: `translate(-50%, -50%) scale(${1 - (index * 0.15)})`,
          }}
        />
      ))}
    </>
  );
};

export default Cursor;
