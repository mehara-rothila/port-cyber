// DotCursor.js
import React, { useEffect, useState, useCallback } from 'react';

const DotCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLink, setIsLink] = useState(false);
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
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Update trail with new position
      setTrail(prevTrail => {
        const newTrail = [
          ...prevTrail,
          {
            ...newPosition,
            id: Date.now(),
            char: Math.random() > 0.5 ? '1' : '0',
            color: isLink ? '#FF008C' : '#00F0FF' // Change color based on link hover
          }
        ];
        return newTrail.slice(-20); // Keep last 20 positions for trail
      });
    });
    if (!visible) setVisible(true);
  }, [visible, isLink]);

  useEffect(() => {
    if (isMobile) return;

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
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
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @media (hover: none) {
          * {
            cursor: auto !important;
          }
        }

        @keyframes matrixFloat {
          0% { transform: translate(-50%, -50%) translateY(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) translateY(20px); opacity: 0; }
        }
      `}</style>

      <div className="cursor-wrapper fixed inset-0 pointer-events-none z-[9999]">
        {/* Main cursor */}
        <div
          className="fixed pointer-events-none z-50 mix-blend-screen transition-transform duration-200"
          style={{
            left: position.x,
            top: position.y,
            width: isLink ? '16px' : '12px',
            height: isLink ? '16px' : '12px',
            backgroundColor: isLink ? '#FF008C' : '#00F0FF',
            borderRadius: '50%',
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
            boxShadow: `0 0 20px ${isLink ? '#FF008C' : '#00F0FF'}`
          }}
        />

        {/* Matrix trail */}
        {trail.map((point, index) => (
          <div
            key={point.id}
            className="fixed pointer-events-none font-mono"
            style={{
              left: point.x,
              top: point.y,
              width: '14px',
              height: '14px',
              color: point.color,
              opacity: (index + 1) / trail.length * 0.7,
              transform: 'translate(-50%, -50%)',
              animation: 'matrixFloat 1s forwards',
              textShadow: `0 0 5px ${point.color}`,
              fontSize: '14px',
              fontWeight: 'bold',
              mixBlendMode: 'screen',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {point.char}
          </div>
        ))}
      </div>
    </>
  );
};

export default DotCursor;