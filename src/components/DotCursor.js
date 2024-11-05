// DotCursor.js
import React, { useEffect, useState, useCallback } from 'react';

const DotCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trailElements, setTrailElements] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = (
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(hover: none)').matches ||
        window.innerWidth <= 768
      );
      setIsMobile(isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail element
      const newTrail = { x: e.clientX, y: e.clientY, id: Math.random() };
      setTrailElements(prev => [...prev.slice(-5), newTrail]); // Keep only last 5 elements
    });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    if (isMobile) return;

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', () => setIsClicking(true));
    document.addEventListener('mouseup', () => setIsClicking(false));
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mouseenter', () => setVisible(true));

    // Handle hoverable elements
    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);
    const handleLinkHover = () => setIsLink(true);
    const handleLinkLeave = () => setIsLink(false);

    const hoverableElements = document.querySelectorAll('button, input, [role="button"]');
    const linkElements = document.querySelectorAll('a');

    hoverableElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementHover);
      element.addEventListener('mouseleave', handleElementLeave);
    });

    linkElements.forEach(element => {
      element.addEventListener('mouseenter', handleLinkHover);
      element.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      // Clean up
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', () => setIsClicking(true));
      document.removeEventListener('mouseup', () => setIsClicking(false));
      document.removeEventListener('mouseleave', () => setVisible(false));
      document.removeEventListener('mouseenter', () => setVisible(true));

      hoverableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover);
        element.removeEventListener('mouseleave', handleElementLeave);
      });

      linkElements.forEach(element => {
        element.removeEventListener('mouseenter', handleLinkHover);
        element.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [handleMouseMove, isMobile]);

  if (isMobile || !visible) return null;

  return (
    <div className="cursor-wrapper" style={{ zIndex: 9999 }}>
      {/* Trail effect */}
      {trailElements.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: 0.2 * (index / trailElements.length)
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`cursor-dot ${isLink ? 'cursor-dot-link' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Cursor ring */}
      <div
        className={`cursor-ring ${isHovering ? 'cursor-hovering' : ''} 
          ${isClicking ? 'cursor-clicking' : ''} ${isLink ? 'cursor-ring-link' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Cursor glow */}
      <div
        className={`cursor-glow ${isLink ? 'cursor-glow-link' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
};

export default DotCursor;