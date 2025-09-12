import React, { useState, useEffect } from 'react';

const PageNotFound = () => {
  const [glitch, setGlitch] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-800 via-transparent to-gray-800"
          style={parallaxStyle}
        />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          animation: 'float 20s ease-in-out infinite'
        }} />
      </div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-slate-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="relative mb-8">
          <h1 
            className={`text-9xl md:text-[12rem] font-black tracking-wider transition-all duration-200 ${
              glitch ? 'text-white animate-pulse' : 'text-slate-200'
            }`}
            style={{
              textShadow: glitch 
                ? '2px 0 0 #ff0000, -2px 0 0 #00ffff, 4px 0 0 #ff0000, -4px 0 0 #00ffff'
                : '4px 4px 0px rgba(0,0,0,0.8), 8px 8px 20px rgba(0,0,0,0.3)'
            }}
          >
            404
          </h1>
          
          <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-slate-600 transform rotate-45" />
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gray-600" />
        </div>

        <div className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-4">
            Page Not Found
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent mx-auto mb-6" />
          <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => window.history.back()}
            className="group relative px-8 py-3 bg-white text-black font-semibold rounded-none border-2 border-white transition-all duration-300 hover:bg-black hover:text-white hover:border-slate-400 transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Go Back</span>
            <div className="absolute inset-0 bg-slate-800 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="group relative px-8 py-3 bg-transparent text-slate-300 font-semibold border-2 border-slate-600 transition-all duration-300 hover:border-white hover:text-white hover:bg-slate-900 transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Home Page</span>
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-slate-500">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-ping" />
          <span className="text-sm font-mono tracking-wider">ERROR_404_NOT_FOUND</span>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-ping" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;