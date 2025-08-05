"use client"

import { Button } from "@/components/ui/button"
import { Menu, Mail, Github, Home, User, Briefcase, MessageCircle, Moon, Sun, Code, Palette, Zap } from "lucide-react"
import { Outfit } from "next/font/google"
import { useState, useEffect } from "react"

const outfit = Outfit({ subsets: ["latin"] })

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorTrails, setCursorTrails] = useState<Array<{ x: number; y: number; id: number; velocity: { x: number; y: number } }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition(prev => {
        const velocity = {
          x: (e.clientX - prev.x) * 0.05,
          y: (e.clientY - prev.y) * 0.05
        }
        
        // Add new trail point with smoother spacing
        const distance = Math.sqrt(
          Math.pow(e.clientX - prev.x, 2) + Math.pow(e.clientY - prev.y, 2)
        )
        
        // Only add new trail point if mouse moved enough distance for smoother trail
        if (distance > 15) {
          const newTrail = { 
            x: e.clientX, 
            y: e.clientY, 
            id: Date.now() + Math.random(),
            velocity
          }
          setCursorTrails(prev => [...prev.slice(-6), newTrail]) // Reduced to 7 points for cleaner look
        }
        
        return { x: e.clientX, y: e.clientY }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-300 ${outfit.className}`}>
      {/* Smooth Liquid Orange Cursor Trail */}
      <svg
        className="fixed pointer-events-none z-50 w-full h-full top-0 left-0"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <radialGradient id="orangeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.95)" />
            <stop offset="60%" stopColor="rgba(234, 88, 12, 0.7)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
          </radialGradient>
        </defs>
        
        <g filter="url(#gooey)">
          {/* Main cursor blob with smooth scaling */}
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="10"
            fill="url(#orangeGradient)"
            style={{
              transition: 'all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
          
          {/* Cleaner trail blobs */}
          {cursorTrails.map((trail, index) => {
            const progress = (index + 1) / cursorTrails.length
            const size = 6 + progress * 6
            const opacity = Math.pow(progress, 1.5) * 0.9
            
            return (
              <circle
                key={trail.id}
                cx={trail.x}
                cy={trail.y}
                r={size}
                fill="url(#orangeGradient)"
                opacity={opacity}
                style={{
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
            )
          })}
        </g>
      </svg>

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-circle" />
        <div className="shape shape-triangle" />
        <div className="shape shape-square" />
        <div className="shape shape-hexagon" />
      </div>
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:p-8 animate-fade-in">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Aman Bangera</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="secondary"
            className="bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full px-6"
          >
            Learn more
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-8 py-16 md:py-24 text-center relative overflow-hidden cursor-interactive-area">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white leading-tight mb-12 animate-slide-up">
            Not just a portfolio
            <br />a reflection of my <span className="text-orange-500 animate-pulse-slow">Soul.</span>
          </h2>

          {/* Enhanced 3D Mechanical Keyboard Buttons */}
          <div className="flex justify-center gap-8 mb-8 animate-float">
            <div className="mechanical-key-3d mechanical-key-wide" onClick={() => (window.location.href = "#work")}>
              <div className="key-top">
                <span className="key-text">Ctrl</span>
              </div>
              <div className="key-front"></div>
              <div className="key-right"></div>
            </div>
            <div className="mechanical-key-3d" onClick={() => (window.location.href = "#contact")}>
              <div className="key-top">
                <span className="key-text">Z</span>
              </div>
              <div className="key-front"></div>
              <div className="key-right"></div>
            </div>
          </div>

          <p className="text-zinc-600 dark:text-zinc-300 text-lg max-w-md mx-auto animate-fade-in-delay">
            Turn ordinary layouts into captivating, retro-inspired visuals that engage
          </p>

          {/* Animated Navigation Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 animate-pulse-sequence ${
                  index === 0 ? "bg-orange-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Me Section */}
      <section id="about" className="px-6 md:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 dark:border-zinc-700 animate-slide-in-left">
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-8 text-center">About Me</h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Developer</h4>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  Crafting clean, efficient code with modern technologies
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-700/50 hover:scale-105 transition-transform duration-300">
                <div
                  className="w-12 h-12 bg-zinc-700 dark:bg-zinc-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Designer</h4>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  Creating beautiful, user-centered experiences
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 hover:scale-105 transition-transform duration-300">
                <div
                  className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Innovator</h4>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">Pushing boundaries with creative solutions</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="animate-count-up">
                <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Projects</div>
              </div>
              <div className="animate-count-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-3xl font-bold text-orange-500 mb-2">3+</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Years</div>
              </div>
              <div className="animate-count-up" style={{ animationDelay: "0.4s" }}>
                <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                <div className="text-zinc-600 dark:text-zinc-300 text-sm">Passion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Work Section */}
      <section id="work" className="px-6 md:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 dark:border-zinc-700 animate-slide-in-right">
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 text-center">My Work</h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed text-center mb-8">
              Explore my portfolio of projects that showcase creativity and technical expertise.
            </p>

            {/* Enhanced Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-50 dark:bg-zinc-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="w-full h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Web Application</h4>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">Modern responsive web app with intuitive UX</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="w-full h-32 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-xl mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Mobile Design</h4>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  Clean mobile interface with smooth interactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 md:px-8 py-16">
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 dark:border-zinc-700 animate-slide-in-left">
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 text-center">Experience</h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed text-center mb-8">
            With years of experience in design and development, I bring ideas to life with precision and passion.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-orange-500 pl-6 hover:pl-8 transition-all duration-300">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Senior Frontend Developer</h4>
              <p className="text-orange-500 text-sm mb-2">2022 - Present</p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                Leading frontend development projects with modern technologies
              </p>
            </div>
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6 hover:pl-8 transition-all duration-300">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">UI/UX Designer</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">2020 - 2022</p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                Designed user-centered interfaces for web and mobile applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section id="contact" className="px-6 md:px-8 py-16">
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 dark:border-zinc-700 animate-slide-in-right">
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 text-center">Contact Me</h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed text-center mb-8">
            {"Let's connect and collaborate on exciting projects. Feel free to reach out!"}
          </p>

          <div className="flex justify-center gap-4">
            <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-full px-8 hover:scale-105 transition-transform duration-200">
              <Mail className="h-4 w-4 mr-2" />
              Email Me
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 bg-transparent hover:scale-105 transition-transform duration-200 border-zinc-300 dark:border-zinc-600 dark:text-white hover:border-orange-500 dark:hover:border-orange-500"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-8 py-8 text-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">© 2024 Aman Bangera. All rights reserved.</p>
      </footer>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up-delay">
        <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors hover:scale-110 transform duration-200"
            >
              <Home className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </a>
            <a
              href="#about"
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors hover:scale-110 transform duration-200"
            >
              <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </a>
            <a
              href="#work"
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors hover:scale-110 transform duration-200"
            >
              <Briefcase className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </a>
            <a
              href="#contact"
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors hover:scale-110 transform duration-200"
            >
              <MessageCircle className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
