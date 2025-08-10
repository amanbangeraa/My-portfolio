"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextPressure from './components/TextPressure';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const mouseBlobRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetPos = useRef({ x: 0.5, y: 0.5 });
  const currentPos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const animateBlob = () => {
      // Smooth interpolation with easing
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
      const easeOut = 0.08; // Lower value = smoother, more gradual movement
      
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, easeOut);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, easeOut);
      
      setMousePos({ ...currentPos.current });
      
      // Direct DOM manipulation for ultra-smooth movement
      if (mouseBlobRef.current) {
        mouseBlobRef.current.style.left = `${currentPos.current.x * 100}%`;
        mouseBlobRef.current.style.top = `${currentPos.current.y * 100}%`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animateBlob);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateBlob(); // Start the animation loop

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // GSAP scroll animation
    const ctx = gsap.context(() => {
      // Set initial state - quote is hidden
      gsap.set(quoteRef.current, { opacity: 0, y: 50 });

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "300vh top",
        onUpdate: (self) => {
          const progress = self.progress;
          
                    // Fade out hero section
          gsap.to(heroRef.current, {
            opacity: 1 - progress,
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Fade in quote section
          gsap.to(quoteRef.current, {
            opacity: progress,
            y: 50 - (progress * 50),
            duration: 0.7,
            ease: "power2.out"
          });
          
          // Fade out scroll indicator
          gsap.to(scrollIndicatorRef.current, {
            opacity: 1 - progress,
            duration: 0.7,
            ease: "power2.out"
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Qwigley&display=swap" rel="stylesheet" />
      <main className="relative min-h-[400vh] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-['Outfit']">
        {/* Logo at top left */}
        <div className="absolute top-6 left-6 z-20">
          <div className="text-white">
            <span className="text-lg font-bold">Aman </span>
            <span className="text-lg" style={{ fontFamily: "'outfit', cursive" }}>Bangera</span>
          </div>
        </div>

        {/* Fluid Water Motion Background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ filter: 'blur(80px)', opacity: 0.6 }}
        >
          {/* Mouse-following blob - Large oval */}
          <div
            ref={mouseBlobRef}
            className="absolute bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-600"
            style={{
              width: '480px',
              height: '300px',
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              willChange: 'transform, left, top',
              boxShadow: '0 0 60px rgba(99, 102, 241, 0.3), 0 0 120px rgba(99, 102, 241, 0.1)',
              filter: 'blur(1px)',
            }}
          />
          
          {/* Animated blob 1 - Large irregular */}
          <div 
            className="absolute bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600 animate-blob1"
            style={{
              width: '620px',
              height: '380px',
              borderRadius: '70% 30% 60% 40% / 50% 70% 30% 50%',
              boxShadow: '0 0 40px rgba(147, 51, 234, 0.2)',
            }}
          />

          {/* Animated blob 2 - Medium teardrop */}
          <div 
            className="absolute bg-gradient-to-br from-indigo-300 via-indigo-400 to-purple-500 animate-blob2"
            style={{
              width: '400px',
              height: '520px',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 0 35px rgba(129, 140, 248, 0.25)',
            }}
          />
          
          {/* Animated blob 3 - Small round */}
          <div 
            className="absolute bg-gradient-to-br from-purple-300 via-purple-400 to-indigo-500 animate-blob3"
            style={{
              width: '260px',
              height: '260px',
              borderRadius: '40% 60% 70% 30% / 40% 50% 50% 60%',
              boxShadow: '0 0 30px rgba(196, 181, 253, 0.3)',
            }}
          />

          {/* Animated blob 4 - Extra large organic */}
          <div 
            className="absolute bg-gradient-to-br from-violet-400 via-violet-500 to-purple-600 animate-blob4"
            style={{
              width: '720px',
              height: '430px',
              borderRadius: '80% 20% 50% 50% / 30% 80% 20% 70%',
              boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)',
            }}
          />
        </div>

        {/* Clean edge vignette */}
        <div
          className="fixed inset-0"
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
          .shiny-text {
            color: #b5b5b5a4;
            background: linear-gradient(
              120deg,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0) 60%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            display: inline-block;
            animation: shine 5s linear infinite;
          }
          
          @keyframes shine {
            0% {
              background-position: 100%;
            }
            100% {
              background-position: -100%;
            }
          }
          
          .shiny-text.disabled {
            animation: none;
          }
          
          @keyframes blob1 {
            0%, 100% { transform: translate(15vw, 25vh) scale(1) rotate(0deg); }
            25% { transform: translate(35vw, 45vh) scale(1.1) rotate(45deg); }
            50% { transform: translate(65vw, 15vh) scale(0.95) rotate(90deg); }
            75% { transform: translate(25vw, 75vh) scale(1.05) rotate(135deg); }
          }
          @keyframes blob2 {
            0%, 100% { transform: translate(75vw, 65vh) scale(1) rotate(0deg); }
            25% { transform: translate(55vw, 35vh) scale(1.08) rotate(30deg); }
            50% { transform: translate(25vw, 55vh) scale(0.92) rotate(60deg); }
            75% { transform: translate(65vw, 85vh) scale(1.12) rotate(90deg); }
          }
          @keyframes blob3 {
            0%, 100% { transform: translate(45vw, 45vh) scale(1) rotate(0deg); }
            25% { transform: translate(25vw, 25vh) scale(0.95) rotate(60deg); }
            50% { transform: translate(75vw, 35vh) scale(1.15) rotate(120deg); }
            75% { transform: translate(35vw, 65vh) scale(1.02) rotate(180deg); }
          }
          @keyframes blob4 {
            0%, 100% { transform: translate(35vw, 75vh) scale(1) rotate(0deg); }
            25% { transform: translate(65vw, 25vh) scale(0.88) rotate(40deg); }
            50% { transform: translate(15vw, 45vh) scale(1.2) rotate(80deg); }
            75% { transform: translate(85vw, 65vh) scale(0.98) rotate(120deg); }
          }
          .animate-blob1 {
            animation: blob1 28s ease-in-out infinite;
          }
          .animate-blob2 {
            animation: blob2 32s ease-in-out infinite alternate;
          }
          .animate-blob3 {
            animation: blob3 24s ease-in-out infinite;
          }
          .animate-blob4 {
            animation: blob4 36s ease-in-out infinite alternate;
          }
        `}</style>
        
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="fixed inset-0 z-10 flex flex-col items-center justify-center min-h-screen"
          style={{ pointerEvents: 'none' }}
        >
          <div className="w-full flex flex-col items-center justify-center">
            {/* Main text */}
            <div className="text-center relative">
              <h1 className="text-3xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-wide mb-2 opacity-60 relative z-10">
                <span className="font-light">I'm </span>
                <span className="font-bold font-['Outfit']">Aman</span>
              </h1>
              {/* Bangera in elegant script - overlapping */}
              <div className="relative -mt-4 md:-mt-8 lg:-mt-12">
                <span 
                  className="text-4xl md:text-8xl lg:text-9xl block relative z-20 shiny-text"
                  style={{ 
                    fontFamily: "'Qwigley', cursive",
                    letterSpacing: '0.05em',
                    lineHeight: '1.1',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Bangera
                </span>
                {/* Subtle underline accent */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Scroll indicator at bottom of screen */}
        <div ref={scrollIndicatorRef} className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
          <p className="text-white text-sm mb-2 opacity-70">Scroll to stalk more</p>
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-white opacity-70" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Quote Section - appears on scroll */}
        <div ref={quoteRef} className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="font-black text-white text-center leading-tight tracking-tight" style={{fontSize: '12rem'}}>
            <TextPressure 
              text="Or am I?" 
              textColor="#FFFFFF"
              weight={true}
              scale={true}
              minFontSize={120}
            />
          </div>
        </div>
      </main>
    </>
  );
}
