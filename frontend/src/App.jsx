import { useEffect, useState } from 'react';

function App() {
  const [glitchText, setGlitchText] = useState('01100011 01101111 01101101 01101001 01101110 01100111');
  const [terminalLogs, setTerminalLogs] = useState([
    'INITIALIZING SECURE PROTOCOL...',
    'BYPASSING FIREWALL [██████████] 100%',
    'ACCESSING MAINFRAME...',
  ]);

  // Matrix-style hacking text effect for "COMING SOON"
  useEffect(() => {
    const target = 'COMING SOON';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>[]{}//';
    let iteration = 0;

    const interval = setInterval(() => {
      setGlitchText(
        target
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Simulating live terminal log updates
  useEffect(() => {
    const extraLogs = [
      'UPLOADING EXPLOIT PAYLOAD...',
      'DECRYPTING NEURAL NET...',
      'ESTABLISHING ROOT CONNECTION...',
      'WARNING: TRACE DETECTED, REROUTING PROXY...',
      'SYSTEM OVERRIDE COMPLETE.',
    ];

    let index = 0;
    const logInterval = setInterval(() => {
      if (index < extraLogs.length) {
        setTerminalLogs((prev) => [...prev, extraLogs[index]]);
        index++;
      } else {
        clearInterval(logInterval);
      }
    }, 1200);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono overflow-hidden select-none px-4">
      
      {/* Background Matrix Rain / Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Top Status Bar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-xs tracking-widest uppercase border-b border-green-900 pb-2 text-green-400">
        <span className="animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          SECURE_SHELL // v4.0.26
        </span>
        <span className="hidden sm:inline opacity-70">TARGET: VIGIL_VOICE</span>
        <span className="text-red-500 font-bold animate-pulse">STATUS: BREACHED</span>
      </div>

      {/* Main Glitch Hero Section */}
      <div className="z-10 text-center my-12">
        <div className="text-xs sm:text-sm tracking-widest text-green-600 mb-4 uppercase animate-bounce">
          // System Initialization In Progress...
        </div>

        {/* Hacking / Matrix Styled Big Text */}
        <h1 className="relative text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
          {glitchText}
          <span className="animate-pulse inline-block w-4 sm:w-6 h-10 sm:h-16 bg-green-500 ml-2 align-middle"></span>
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-green-600 tracking-wider">
          DECRYPTION PROGRESS: <span className="text-green-300 font-bold">99.9%</span> — STAND BY FOR DEPLOYMENT.
        </p>
      </div>

      {/* Terminal Output Box */}
      <div className="z-10 w-full max-w-xl bg-gray-950 border border-green-800/60 rounded-lg p-4 shadow-[0_0_30px_rgba(0,255,0,0.1)] backdrop-blur-md">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-green-900 text-xs text-green-600">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
          </span>
          <span>root@mainframe:~#</span>
        </div>
        
        <div className="h-28 overflow-y-auto text-xs sm:text-sm space-y-1 scrollbar-none font-mono">
          {terminalLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-green-700">&gt;</span>
              <span className="text-green-400">{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-green-700">&gt;</span>
            <span className="animate-pulse inline-block w-2 h-4 bg-green-500"></span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-4 text-center text-[10px] sm:text-xs text-green-700 tracking-widest uppercase">
        Protected by Cipher-Shield Protocol &copy; 2026
      </div>

    </div>
  );
}

export default App;