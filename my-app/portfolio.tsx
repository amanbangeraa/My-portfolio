'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Github, Linkedin, ExternalLink, Sun, Moon, MapPin, Phone, Quote } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Refs for GSAP targeting
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  
  // Quote refs
  const quote1Ref = useRef<HTMLDivElement>(null)
  const quote2Ref = useRef<HTMLDivElement>(null)
  const quote3Ref = useRef<HTMLDivElement>(null)
  const quote4Ref = useRef<HTMLDivElement>(null)

  // Floating elements refs
  const floatingElementsRef = useRef<HTMLDivElement>(null)

  const quotes = [
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
      ref: quote1Ref
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      ref: quote2Ref
    },
    {
      text: "Design is not just what it looks like — design is how it works.",
      author: "Steve Jobs",
      ref: quote3Ref
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      ref: quote4Ref
    }
  ]

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Complex hero animations with multiple elements
      const heroTl = gsap.timeline()
      
      // Create floating background elements
      gsap.set(".floating-element", {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        rotation: "random(0, 360)",
        scale: "random(0.5, 1.5)"
      })

      // Animate floating elements
      gsap.to(".floating-element", {
        x: "+=random(-50, 50)",
        y: "+=random(-50, 50)",
        rotation: "+=random(-180, 180)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      })

      // Enhanced hero entrance
      heroTl.fromTo(".hero-bg-element", 
        { scale: 0, rotation: 180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 2, ease: "back.out(1.7)", stagger: 0.2 }
      )
      .fromTo(nameRef.current?.children as any, 
        { y: 100, opacity: 0, rotationX: 90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: "power3.out", stagger: 0.1 },
        "-=1.5"
      )
      .fromTo(titleRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
        "-=1"
      )

      // Complex hero parallax with multiple layers
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Main hero transformation
          gsap.to(heroRef.current, {
            scale: 1 - progress * 0.15,
            opacity: 1 - progress * 0.7,
            y: progress * -100,
            rotationX: progress * 10,
            duration: 0.3
          })

          // Floating elements parallax
          gsap.to(".floating-element", {
            y: progress * -200,
            rotation: progress * 360,
            scale: 1 - progress * 0.5,
            duration: 0.3,
            stagger: 0.1
          })

          // Background elements
          gsap.to(".hero-bg-element", {
            y: progress * -150,
            rotation: progress * 180,
            scale: 1 + progress * 0.5,
            duration: 0.3,
            stagger: 0.05
          })
        }
      })

      // Quote 1 - Transition to About
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(quote1Ref.current, {
            opacity: progress < 0.5 ? progress * 2 : (1 - progress) * 2,
            scale: 1 + progress * 0.2,
            y: progress * -50,
            duration: 0.3
          })
        }
      })

      // Enhanced About section reveal with morphing effect
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        animation: gsap.fromTo(aboutRef.current, 
          { 
            yPercent: 100,
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            skewY: 5
          },
          { 
            yPercent: 0,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            skewY: 0,
            ease: "none"
          }
        )
      })

      // Complex about content animations
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 70%",
        onEnter: () => {
          const aboutTl = gsap.timeline()
          
          // Title with text reveal effect
          aboutTl.fromTo(".about-title",
            { 
              clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              x: -50
            },
            { 
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              x: 0,
              duration: 1.2,
              ease: "power3.out"
            }
          )
          // Staggered content with different animations
          .fromTo(".about-text",
            { y: 60, opacity: 0, rotationX: 45 },
            { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power2.out", stagger: 0.2 },
            "-=0.8"
          )
          // Skills with bounce and rotation
          .fromTo(".skill-item",
            { scale: 0, rotation: 180, y: 50 },
            { scale: 1, rotation: 0, y: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.1 },
            "-=0.6"
          )
        }
      })

      // Quote 2 - Transition to Experience
      ScrollTrigger.create({
        trigger: experienceRef.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(quote2Ref.current, {
            opacity: progress < 0.5 ? progress * 2 : (1 - progress) * 2,
            scale: 1 + progress * 0.3,
            rotationY: progress * 20,
            duration: 0.3
          })
        }
      })

      // Experience section with wave reveal
      ScrollTrigger.create({
        trigger: experienceRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        animation: gsap.fromTo(experienceRef.current, 
          { 
            yPercent: 100,
            clipPath: "polygon(0 20%, 100% 0%, 100% 100%, 0 100%)"
          },
          { 
            yPercent: 0,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            ease: "none"
          }
        )
      })

      // Complex experience animations
      ScrollTrigger.create({
        trigger: experienceRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(".experience-item",
            { 
              x: -100, 
              opacity: 0, 
              rotationY: -45,
              transformOrigin: "right center"
            },
            { 
              x: 0, 
              opacity: 1, 
              rotationY: 0,
              duration: 1.2, 
              ease: "power3.out", 
              stagger: 0.2 
            }
          )
          
          // Animate timeline dots
          gsap.fromTo(".timeline-dot",
            { scale: 0, rotation: 180 },
            { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1, delay: 0.5 }
          )
        }
      })

      // Quote 3 - Transition to Projects
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(quote3Ref.current, {
            opacity: progress < 0.5 ? progress * 2 : (1 - progress) * 2,
            scale: 1 + progress * 0.25,
            x: Math.sin(progress * Math.PI) * 30,
            duration: 0.3
          })
        }
      })

      // Projects section with diagonal reveal
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        animation: gsap.fromTo(projectsRef.current, 
          { 
            yPercent: 100,
            clipPath: "polygon(0 100%, 100% 80%, 100% 100%, 0 100%)"
          },
          { 
            yPercent: 0,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            ease: "none"
          }
        )
      })

      // Advanced project cards animation
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(".project-card",
            { 
              y: 100, 
              opacity: 0, 
              rotationX: 45,
              scale: 0.8,
              transformOrigin: "center bottom"
            },
            { 
              y: 0, 
              opacity: 1, 
              rotationX: 0,
              scale: 1,
              duration: 1.2, 
              ease: "power3.out", 
              stagger: {
                amount: 0.8,
                from: "center"
              }
            }
          )
        }
      })

      // Quote 4 - Transition to Contact
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(quote4Ref.current, {
            opacity: progress < 0.5 ? progress * 2 : (1 - progress) * 2,
            scale: 1 + progress * 0.4,
            rotationZ: progress * 10,
            duration: 0.3
          })
        }
      })

      // Contact section with circular reveal
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        animation: gsap.fromTo(contactRef.current, 
          { 
            yPercent: 100,
            clipPath: "circle(0% at 50% 100%)"
          },
          { 
            yPercent: 0,
            clipPath: "circle(150% at 50% 100%)",
            ease: "none"
          }
        )
      })

      // Contact items with elastic animation
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(".contact-item",
            { 
              scale: 0, 
              y: 50, 
              rotation: 180 
            },
            { 
              scale: 1, 
              y: 0, 
              rotation: 0,
              duration: 1, 
              ease: "elastic.out(1, 0.5)", 
              stagger: 0.15 
            }
          )
        }
      })

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={`relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Floating Quote Overlays */}
      {quotes.map((quote, index) => (
        <div
          key={index}
          ref={quote.ref}
          className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0"
        >
          <div className="text-center px-6 max-w-2xl">
            <Quote className="w-12 h-12 mx-auto mb-6 text-gray-400 dark:text-gray-500" />
            <blockquote className="text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
              "{quote.text}"
            </blockquote>
            <cite className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              — {quote.author}
            </cite>
          </div>
        </div>
      ))}

      {/* Fixed Hero Background */}
      <div 
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center z-0 overflow-hidden"
      >
        {/* Complex background elements */}
        <div ref={floatingElementsRef} className="absolute inset-0">
          {/* Floating geometric shapes */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute opacity-10 dark:opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className={`w-${8 + i * 2} h-${8 + i * 2} bg-gradient-to-br from-blue-500 to-purple-500 rounded-full`} />
            </div>
          ))}
          
          {/* Background pattern elements */}
          <div className="hero-bg-element absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
          <div className="hero-bg-element absolute bottom-32 right-32 w-80 h-80 bg-gradient-radial from-pink-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />
          <div className="hero-bg-element absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-2xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 
            ref={nameRef}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            <span className="inline-block">Aman</span>{' '}
            <span className="inline-block">Bangera</span>
          </h1>
          <p 
            ref={titleRef}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light tracking-wide"
          >
            Full-Stack Developer & UI/UX Designer
          </p>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 dark:text-gray-500">
          <div className="flex flex-col items-center">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-400 dark:via-gray-500 to-transparent mb-2 animate-pulse" />
            <span className="text-xs tracking-widest font-medium animate-bounce">SCROLL</span>
          </div>
        </div>
      </div>

      {/* Scrolling Container */}
      <div ref={scrollContainerRef} className="relative z-10">
        {/* Spacer for hero */}
        <div className="h-screen" />

        {/* About Section */}
        <div 
          ref={aboutRef}
          className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="about-title text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-12 tracking-tight">
                About Me
              </h2>
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <p className="about-text text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-light">
                    I'm a passionate full-stack developer with over 5 years of experience 
                    creating digital solutions that bridge the gap between design and functionality. 
                    My approach combines technical expertise with creative problem-solving.
                  </p>
                  <p className="about-text text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                    I specialize in building scalable web applications and crafting intuitive 
                    user experiences that make complex problems feel simple.
                  </p>
                </div>
                <div>
                  <h3 className="about-text text-xl font-medium text-gray-900 dark:text-white mb-6">
                    Core Technologies
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'React & Next.js',
                      'TypeScript',
                      'Node.js',
                      'Python',
                      'PostgreSQL',
                      'AWS',
                      'Figma',
                      'Tailwind CSS'
                    ].map((skill) => (
                      <div 
                        key={skill}
                        className="skill-item text-sm text-gray-600 dark:text-gray-400 py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div 
          ref={experienceRef}
          className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center relative overflow-hidden"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-16 tracking-tight">
                Experience
              </h2>
              
              <div className="space-y-12 relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-20 top-0 bottom-0 w-px bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600" />
                
                {[
                  {
                    period: '2022 - Present',
                    role: 'Senior Full-Stack Developer',
                    company: 'TechCorp Solutions',
                    description: 'Leading development of enterprise web applications, mentoring junior developers, and architecting scalable solutions for clients across various industries.'
                  },
                  {
                    period: '2020 - 2022',
                    role: 'Frontend Developer',
                    company: 'Digital Innovation Lab',
                    description: 'Developed responsive web applications using React and modern JavaScript frameworks. Collaborated closely with design teams to implement pixel-perfect interfaces.'
                  },
                  {
                    period: '2019 - 2020',
                    role: 'UI/UX Designer & Developer',
                    company: 'Creative Studio',
                    description: 'Designed and developed user interfaces for mobile and web applications. Conducted user research and usability testing to improve product experiences.'
                  }
                ].map((exp, index) => (
                  <div key={index} className="experience-item relative">
                    {/* Timeline dot */}
                    <div className="timeline-dot absolute left-0 md:left-20 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full transform -translate-x-1/2 border-4 border-white dark:border-gray-900" />
                    
                    <div className="grid md:grid-cols-4 gap-6 items-start pl-8 md:pl-32">
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                        {exp.period}
                      </div>
                      <div className="md:col-span-3">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="text-lg text-gray-600 dark:text-gray-300 mb-3 font-light">
                          {exp.company}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div 
          ref={projectsRef}
          className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-16 tracking-tight text-center">
                Selected Projects
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'E-Commerce Platform',
                    description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
                    tech: 'Next.js, Stripe, PostgreSQL',
                    category: 'Web Application'
                  },
                  {
                    title: 'Task Management App',
                    description: 'Collaborative project management tool with real-time updates and team features.',
                    tech: 'React, Node.js, Socket.io',
                    category: 'SaaS Product'
                  },
                  {
                    title: 'Portfolio Website',
                    description: 'Custom portfolio site with advanced animations and responsive design.',
                    tech: 'Next.js, GSAP, Tailwind',
                    category: 'Web Design'
                  },
                  {
                    title: 'Mobile Banking App',
                    description: 'Secure mobile banking interface with biometric authentication.',
                    tech: 'React Native, Firebase',
                    category: 'Mobile App'
                  },
                  {
                    title: 'Analytics Dashboard',
                    description: 'Real-time data visualization dashboard for business intelligence.',
                    tech: 'React, D3.js, Python',
                    category: 'Data Visualization'
                  },
                  {
                    title: 'Learning Platform',
                    description: 'Online education platform with video streaming and progress tracking.',
                    tech: 'Next.js, AWS, MongoDB',
                    category: 'EdTech'
                  }
                ].map((project, index) => (
                  <div
                    key={index}
                    className="project-card group cursor-pointer"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700 h-full hover:scale-105 hover:-rotate-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase mb-3">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-light">
                        {project.description}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                        {project.tech}
                      </div>
                      <div className="flex items-center text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span className="text-sm font-medium mr-2">View Project</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div 
          ref={contactRef}
          className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center relative overflow-hidden"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-16 tracking-tight">
                Let's Connect
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="contact-item">
                  <Mail className="w-6 h-6 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light">aman@example.com</p>
                </div>
                <div className="contact-item">
                  <Phone className="w-6 h-6 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light">+1 (555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <Github className="w-6 h-6 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light">@amanbangera</p>
                </div>
                <div className="contact-item">
                  <Linkedin className="w-6 h-6 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light">/amanbangera</p>
                </div>
              </div>

              <div className="contact-item">
                <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get In Touch
                </button>
              </div>

              <div className="mt-16 text-sm text-gray-500 dark:text-gray-400 font-light">
                © 2024 Aman Bangera. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
