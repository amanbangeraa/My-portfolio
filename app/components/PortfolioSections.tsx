'use client'

import React from 'react'

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 lg:px-12 bg-gradient-to-b from-transparent to-blue-900/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-6xl font-bold text-center mb-16">About Me</h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-white/80 leading-relaxed">
              I'm a passionate Full Stack Developer with expertise in modern web technologies. 
              I love creating efficient, scalable solutions that solve real-world problems.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              With a strong foundation in both frontend and backend development, I bring ideas 
              to life through clean code, intuitive design, and robust architecture.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <span className="px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 border border-blue-500/30">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-purple-600/20 rounded-full text-purple-300 border border-purple-500/30">
                Team Player
              </span>
              <span className="px-4 py-2 bg-green-600/20 rounded-full text-green-300 border border-green-500/30">
                Continuous Learner
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="w-56 h-56 bg-black rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-white">AB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SkillsSection() {
  const skills = [
    { name: 'React.js', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Backend' },
    { name: 'TypeScript', level: 85, category: 'Language' },
    { name: 'Next.js', level: 88, category: 'Framework' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'PostgreSQL', level: 70, category: 'Database' },
    { name: 'AWS', level: 65, category: 'Cloud' },
  ]

  return (
    <section id="skills" className="py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-6xl font-bold text-center mb-16">Skills & Technologies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{skill.name}</h3>
                <span className="text-sm text-white/60">{skill.category}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="text-sm text-white/70">{skill.level}% Proficiency</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProjectsSection() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Prisma'],
      github: '#',
      demo: '#'
    },
    {
      title: 'AI Chat Bot',
      description: 'Intelligent chatbot using Python and machine learning',
      tech: ['Python', 'TensorFlow', 'Flask', 'OpenAI'],
      github: '#',
      demo: '#'
    }
  ]

  return (
    <section id="projects" className="py-20 px-6 lg:px-12 bg-gradient-to-b from-blue-900/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-6xl font-bold text-center mb-16">Featured Projects</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
              <p className="text-white/70 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="px-3 py-1 bg-blue-600/20 rounded-full text-sm text-blue-300">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a href={project.github} className="flex-1 text-center py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors">
                  GitHub
                </a>
                <a href={project.demo} className="flex-1 text-center py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-6xl font-bold mb-8">Let's Work Together</h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          I'm always interested in new opportunities and exciting projects. 
          Let's discuss how we can bring your ideas to life.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <a href="mailto:amanbangeraa@gmail.com" className="text-white/70 hover:text-white transition-colors">
              amanbangeraa@gmail.com
            </a>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">GitHub</h3>
            <a href="https://github.com/amanbangeraa" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              @amanbangeraa
            </a>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
            <a href="https://wa.me/your-number" className="text-white/70 hover:text-white transition-colors">
              Message Me
            </a>
          </div>
        </div>
        <a href="mailto:amanbangeraa@gmail.com" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
          Get In Touch
        </a>
      </div>
    </section>
  )
}
