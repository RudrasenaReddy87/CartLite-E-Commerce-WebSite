import React, { useState, useEffect } from 'react';

const BackgroundParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 150; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: ['#6c5ce7', '#a363d9', '#fd79a8', '#fdcb6e', '#00b894', '#00cec9', '#ff7675', '#74b9ff', '#a29bfe'][Math.floor(Math.random() * 9)],
        shape: ['circle', 'square', 'star'][Math.floor(Math.random() * 3)],
        delay: Math.random() * 10,
        duration: Math.random() * 30 + 10,
        direction: Math.random() > 0.5 ? 1 : -1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="background-particles fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle absolute ${particle.shape === 'circle' ? 'rounded-full' : particle.shape === 'square' ? 'rounded-sm' : 'star'}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            animation: `float ${particle.duration}s infinite linear`,
            transform: `translateX(${particle.direction * 50}px)`,
          }}
        />
      ))}
      <div className="floating-shapes absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="shape absolute rounded-full opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              background: `radial-gradient(circle, ${['#6c5ce7', '#a363d9', '#fd79a8'][Math.floor(Math.random() * 3)]} 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 40 + 20}s`,
              animation: 'float 40s infinite linear',
            }}
          />
        ))}
      </div>
      <style jsx>{`
        .particle {
          animation: float 30s infinite linear;
        }

        .shape {
          animation: float 40s infinite linear;
        }

        .star {
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          50% {
            transform: translateY(50vh) translateX(100px) rotate(180deg) scale(1.2);
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) translateX(200px) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundParticles;
