"use client";

import { useState } from 'react';

interface ToastProps {
  onDismiss: () => void;
}

export default function Toast({ onDismiss }: ToastProps) {
  const [toastReplied, setToastReplied] = useState(false);

  const handleToastReply = () => {
    setToastReplied(true);
    setTimeout(() => {
      onDismiss();
    }, 2000);
  };

  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl animate-slide-in">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="text-white font-medium text-sm">Chef's Notice</span>
          </div>
          <button 
            onClick={onDismiss}
            className="text-gray-400 hover:text-white transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
        
        {!toastReplied ? (
          <>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              This site's still cooking, peek at your own risk! 👀
            </p>
            <div className="flex gap-2">
              <button 
                onClick={handleToastReply}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:scale-105"
              >
                I like it uncooked 🥩
              </button>
              <button 
                onClick={onDismiss}
                className="px-3 py-1.5 text-gray-400 hover:text-white text-xs transition-colors"
              >
                I'll wait...
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-400 text-sm mb-2">🤝 A person of culture!</p>
            <p className="text-gray-300 text-xs">Enjoy the unfinished cookie</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
