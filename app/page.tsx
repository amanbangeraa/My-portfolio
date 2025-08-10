"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
      <main className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-['Outfit']">
        {/* Fluid Water Motion Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ filter: 'blur(80px)', opacity: 0.6 }}
        >
          {/* Mouse-following blob - Large oval */}
          <div
            className="absolute bg-indigo-500"
            style={{
              width: '400px',
              height: '250px',
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.8s ease-out',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
          />
          
          {/* Animated blob 1 - Large irregular */}
          <div 
            className="absolute bg-purple-500 animate-blob1"
            style={{
              width: '500px',
              height: '300px',
              borderRadius: '70% 30% 60% 40% / 50% 70% 30% 50%',
            }}
          />

          {/* Animated blob 2 - Medium teardrop */}
          <div 
            className="absolute bg-indigo-400 animate-blob2"
            style={{
              width: '320px',
              height: '420px',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            }}
          />
          
          {/* Animated blob 3 - Small round */}
          <div 
            className="absolute bg-purple-400 animate-blob3"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '40% 60% 70% 30% / 40% 50% 50% 60%',
            }}
          />

          {/* Animated blob 4 - Extra large organic */}
          <div 
            className="absolute bg-violet-500 animate-blob4"
            style={{
              width: '600px',
              height: '350px',
              borderRadius: '80% 20% 50% 50% / 30% 80% 20% 70%',
            }}
          />
        </div>

        {/* Clean edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 115% 105% at 50% 50%,
                transparent 0%,
                rgba(0, 0, 0, 0.05) 70%,
                rgba(0, 0, 0, 0.2) 90%,
                rgba(0, 0, 0, 0.4) 100%
              )
            `,
          }}
        />
        
        <style jsx>{`
          @keyframes blob1 {
            0%, 100% { transform: translate(10vw, 20vh) scale(1) rotate(0deg); }
            25% { transform: translate(40vw, 50vh) scale(1.2) rotate(90deg); }
            50% { transform: translate(70vw, 10vh) scale(0.9) rotate(180deg); }
            75% { transform: translate(20vw, 80vh) scale(1.1) rotate(270deg); }
          }
          @keyframes blob2 {
            0%, 100% { transform: translate(80vw, 70vh) scale(1) rotate(0deg); }
            25% { transform: translate(50vw, 30vh) scale(1.1) rotate(45deg); }
            50% { transform: translate(20vw, 60vh) scale(0.8) rotate(135deg); }
            75% { transform: translate(60vw, 90vh) scale(1.2) rotate(225deg); }
          }
          @keyframes blob3 {
            0%, 100% { transform: translate(50vw, 50vh) scale(1) rotate(0deg); }
            25% { transform: translate(20vw, 20vh) scale(0.9) rotate(120deg); }
            50% { transform: translate(80vw, 40vh) scale(1.2) rotate(240deg); }
            75% { transform: translate(40vw, 70vh) scale(1.1) rotate(360deg); }
          }
          @keyframes blob4 {
            0%, 100% { transform: translate(30vw, 80vh) scale(1) rotate(0deg); }
            25% { transform: translate(70vw, 20vh) scale(0.8) rotate(60deg); }
            50% { transform: translate(10vw, 50vh) scale(1.3) rotate(180deg); }
            75% { transform: translate(90vw, 70vh) scale(1) rotate(300deg); }
          }
          .animate-blob1 {
            animation: blob1 20s ease-in-out infinite;
          }
          .animate-blob2 {
            animation: blob2 22s ease-in-out infinite alternate;
          }
          .animate-blob3 {
            animation: blob3 18s ease-in-out infinite;
          }
          .animate-blob4 {
            animation: blob4 24s ease-in-out infinite alternate;
          }
        `}</style>
        
        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl md:text-8xl lg:text-9xl font-black text-white text-center leading-tight tracking-tight">
            Just my Reflection.
          </h1>
        </section>
      </main>
    </>
  );
}
