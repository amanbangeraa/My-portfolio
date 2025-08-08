'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SpaceHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const planetsRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const nebulaRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const transitionRef = useRef<HTMLDivElement>(null)
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hero animations
      const heroTl = gsap.timeline()
      
      heroTl.fromTo(titleRef.current, 
        { scale: 0, opacity: 0, rotationY: 180 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 2, ease: "back.out(1.7)" }
      )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=1"
      )

      // Floating animation for planets
      gsap.to(".planet", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      })

      // Twinkling stars
      gsap.to(".star", {
        opacity: "random(0.3, 1)",
        scale: "random(0.5, 1.2)",
        duration: "random(1, 3)",
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.1
      })

      // Nebula floating animation
      gsap.to(".nebula", {
        rotation: 360,
        duration: 60,
        ease: "none",
        repeat: -1
      })

      // Scroll-triggered transition animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Hero scaling and fading
          gsap.to(heroRef.current, {
            scale: 1 - progress * 0.3,
            opacity: 1 - progress * 0.7,
            duration: 0.3
          })

          // Transition overlay
          gsap.to(transitionRef.current, {
            scale: 1 + progress * 2,
            opacity: progress,
            duration: 0.3
          })
        }
      })

      // About section reveal
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".about-content",
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.2 }
          )
        }
      })

    })

    return () => ctx.revert()
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    gsap.to(".planet", {
      x: mousePosition.x * 30,
      y: mousePosition.y * 20,
      duration: 2,
      ease: "power2.out",
      stagger: 0.1
    })

    gsap.to(".star", {
      x: mousePosition.x * 10,
      y: mousePosition.y * 5,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.05
    })

    gsap.to(".nebula", {
      x: mousePosition.x * 50,
      y: mousePosition.y * 30,
      duration: 3,
      ease: "power2.out"
    })
  }, [mousePosition])

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Hero Section */}
      <div 
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden z-10"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Stars */}
          <div ref={starsRef} className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="star absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              />
            ))}
          </div>

          {/* Nebula Clouds */}
          <div ref={nebulaRef} className="absolute inset-0">
            <div className="nebula absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
            <div className="nebula absolute bottom-32 right-32 w-80 h-80 bg-gradient-radial from-cyan-500/15 via-teal-500/8 to-transparent rounded-full blur-3xl" />
            <div className="nebula absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Floating Planets */}
          <div ref={planetsRef} className="absolute inset-0">
            {/* Large Planet */}
            <div className="planet absolute top-32 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-600 shadow-2xl">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-300/30 to-transparent" />
              <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-orange-200/40" />
            </div>

            {/* Medium Planet */}
            <div className="planet absolute bottom-40 left-16 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-xl">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-300/40 to-transparent" />
            </div>

            {/* Small Planets */}
            <div className="planet absolute top-1/3 left-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg" />
            <div className="planet absolute bottom-1/3 right-1/3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-violet-600 shadow-md" />
            <div className="planet absolute top-2/3 right-1/4 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-sm" />

            {/* Asteroid Belt */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="planet absolute w-2 h-2 bg-gray-400 rounded-full shadow-sm"
                style={{
                  left: `${20 + i * 4}%`,
                  top: `${60 + Math.sin(i) * 10}%`,
                  transform: `rotate(${i * 24}deg)`
                }}
              />
            ))}
          </div>

          {/* Shooting Stars */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-20 bg-gradient-to-b from-white to-transparent opacity-60"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  transform: `rotate(45deg)`,
                  animation: `shootingStar ${3 + i}s infinite ${i * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="text-center px-6">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold mb-6 text-white"
              style={{
                background: 'linear-gradient(45deg, #ffffff, #a855f7, #06b6d4, #ffffff)',
                backgroundSize: '300% 300%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 4s ease-in-out infinite'
              }}
            >
              COSMOS
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Explore the infinite universe of possibilities
            </p>
            
            {/* Glowing Border */}
            <div className="absolute inset-0 rounded-lg border border-cyan-400/30 shadow-[0_0_50px_rgba(6,182,212,0.3)]" 
                 style={{
                   left: '50%',
                   top: '50%',
                   transform: 'translate(-50%, -50%)',
                   width: '600px',
                   height: '200px',
                   pointerEvents: 'none'
                 }} 
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 tracking-widest">SCROLL TO EXPLORE</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      <div 
        ref={transitionRef}
        className="fixed top-1/2 left-1/2 w-20 h-20 bg-gradient-radial from-white via-cyan-400 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0 z-30 pointer-events-none"
        style={{ transformOrigin: 'center' }}
      />

      {/* Spacer for scroll */}
      <div className="h-screen" />

      {/* About Section */}
      <div 
        ref={aboutRef}
        className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white flex items-center justify-center relative z-40"
      >
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="about-content text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About the Universe
            </h2>
            <p className="about-content text-xl text-gray-300 mb-8 leading-relaxed">
              Journey through the cosmos and discover the wonders that lie beyond our world. 
              From distant galaxies to mysterious black holes, the universe holds infinite secrets 
              waiting to be explored.
            </p>
            <p className="about-content text-lg text-gray-400 leading-relaxed">
              Our mission is to bring the beauty and mystery of space closer to you through 
              interactive experiences that ignite curiosity and wonder about the cosmos we call home.
            </p>
            
            {/* Cosmic Stats */}
            <div className="about-content grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">13.8B</div>
                <div className="text-gray-400">Years Old</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">2T</div>
                <div className="text-gray-400">Galaxies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">∞</div>
                <div className="text-gray-400">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shootingStar {
          0% { transform: translateX(-100px) translateY(-100px) rotate(45deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100px) translateY(100px) rotate(45deg); opacity: 0; }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
