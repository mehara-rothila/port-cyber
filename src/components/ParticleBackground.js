// ParticleBackground.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const RandomParticleBackground = ({ 
  particleCount = 30,
  colorScheme = 'cyberpunk'
}) => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const colorSchemes = useMemo(() => ({
    cyberpunk: {
      gradient: 'from-[#2D1B69] via-[#FF008C]/20 to-[#00F0FF]/20',
      particleColors: ['bg-[#FF008C]/30', 'bg-[#00F0FF]/30']
    },
    neon: {
      gradient: 'from-pink-500/20 via-purple-500/20 to-cyan-500/20',
      particleColors: ['bg-pink-500/30', 'bg-cyan-500/30']
    }
  }), []);

  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      shape: Math.random() > 0.7 ? 'square' : 'circle',
      colorIndex: Math.floor(Math.random() * colorSchemes[colorScheme].particleColors.length),
      pulseSpeed: 1 + Math.random(),
      glowIntensity: Math.random()
    }));
    setParticles(initialParticles);
  }, [particleCount, colorScheme, colorSchemes]);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, vx, vy } = particle;

          // Mouse interaction
          if (mousePos.x !== null) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
              vx -= dx * 0.03;
              vy -= dy * 0.03;
            }
          }

          x += vx;
          y += vy;

          // Screen wrap
          if (x < -10) x = 110;
          if (x > 110) x = -10;
          if (y < -10) y = 110;
          if (y > 110) y = -10;

          return {
            ...particle,
            x,
            y,
            vx: vx * 0.99,
            vy: vy * 0.99
          };
        })
      );
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: null, y: null });
  }, []);

  const { gradient, particleColors } = colorSchemes[colorScheme];

  return (
    <div 
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${gradient}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 cyberpunk-grid"></div>
      
      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute transform-gpu transition-transform
            ${particleColors[particle.colorIndex]}
            ${particle.shape === 'circle' ? 'rounded-full' : 'rounded-sm rotate-45'}
            backdrop-blur-sm animate-pulse`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDuration: `${particle.pulseSpeed}s`,
            boxShadow: `0 0 ${20 * particle.glowIntensity}px ${particleColors[particle.colorIndex].includes('FF008C') ? '#FF008C' : '#00F0FF'}`,
            willChange: 'transform, left, top'
          }}
        />
      ))}

      {/* Scanline effect */}
      <div className="scanline"></div>
    </div>
  );
};

export default RandomParticleBackground;