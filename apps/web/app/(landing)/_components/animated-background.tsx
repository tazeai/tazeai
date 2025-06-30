'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'circle' | 'triangle' | 'square';
  color: string;
}

export const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: `hsl(${210 + Math.random() * 60}, 70%, 60%)`,
      });
    }
    setParticles(initialParticles);

    // Initialize floating shapes
    const initialShapes: FloatingShape[] = [];
    const shapeTypes: Array<'circle' | 'triangle' | 'square'> = [
      'circle',
      'triangle',
      'square',
    ];
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * shapeTypes.length);
      const shapeType = shapeTypes[randomIndex] as
        | 'circle'
        | 'triangle'
        | 'square';
      initialShapes.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        type: shapeType,
        color: `hsl(${210 + Math.random() * 120}, 40%, 60%)`,
      });
    }
    setShapes(initialShapes);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x:
            particle.x < 0
              ? window.innerWidth
              : particle.x > window.innerWidth
                ? 0
                : particle.x + particle.speedX,
          y:
            particle.y < 0
              ? window.innerHeight
              : particle.y > window.innerHeight
                ? 0
                : particle.y + particle.speedY,
        }))
      );

      setShapes((prev) =>
        prev.map((shape) => ({
          ...shape,
          rotation: shape.rotation + shape.rotationSpeed,
          x: shape.x + Math.sin(Date.now() * 0.001 + shape.id) * 0.2,
          y: shape.y + Math.cos(Date.now() * 0.0008 + shape.id) * 0.15,
        }))
      );
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      transform: `rotate(${shape.rotation}deg)`,
      opacity: 0.1,
      pointerEvents: 'none',
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${shape.color}20, transparent)`,
              border: `1px solid ${shape.color}30`,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}20`,
            }}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              background: `linear-gradient(135deg, ${shape.color}15, transparent)`,
              border: `1px solid ${shape.color}25`,
              borderRadius: '4px',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-pulse opacity-30 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      </div>

      {/* Interactive mouse glow */}
      <div
        className="absolute h-96 w-96 rounded-full opacity-20 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background:
            'radial-gradient(circle, hsl(210 100% 70% / 0.3) 0%, hsl(280 100% 70% / 0.2) 30%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {shapes.map(renderShape)}
    </div>
  );
};
