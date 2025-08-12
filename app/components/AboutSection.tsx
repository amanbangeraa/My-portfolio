"use client";

import { forwardRef } from 'react';

interface AboutSectionProps {
  className?: string;
}

const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`fixed inset-0 z-30 flex items-center justify-center pointer-events-none ${className || ''}`}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
            About Me
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light mb-12 tracking-wide">
            Professional Bug Creator
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
            I turn coffee into code and ideas into digital reality. Occasionally, I even fix the bugs I create.
          </p>
          
          {/* Single CTA */}
          <button className="px-8 py-3 text-white text-lg font-medium hover:opacity-80 transition-opacity duration-300 pointer-events-auto border border-white/20 rounded-full backdrop-blur-sm">
            Let's build something cool
          </button>
        </div>
      </div>
    );
  }
);

AboutSection.displayName = 'AboutSection';

export default AboutSection;
