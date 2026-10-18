import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  ChevronRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { DexgoLogo } from './DexgoLogo.tsx';

interface AuthPortalViewProps {
  onLoginSuccess: () => void;
}

export const AuthPortalView: React.FC<AuthPortalViewProps> = ({
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('admin@dexgo.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  const handleDemoLogin = (role: 'admin' | 'fleet') => {
    if (role === 'admin') {
      setEmail('master.admin@dexgo.ae');
    } else {
      setEmail('fleet.director@dexgo.ae');
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#070A11] relative overflow-hidden">
      {/* Background Cyber Grid & Animated Floating Ambient Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Unified 2-Column Responsive Card Shell with Spring Entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl rounded-2xl bg-[#0B101D]/90 border border-slate-800/80 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Left Col: Brand Vision, Value Proposition & Capabilities */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 relative">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <DexgoLogo size="lg" showTagline={true} />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dealer Operations, Re-Architected</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Keep every part of your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500">
                dealership moving.
              </span>
            </h1>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-lg">
              A high-precision operating workspace for showroom inventory, corporate
              entities, tax compliance, deals, finance, and the teams orchestrating
              every DEXGO delivery across the GCC.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8">
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs shadow-sm hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tax & Regional Specs</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Built-in TRN validation, FTA compliance, and GCC standard spec tracking.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs shadow-sm hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                  <Zap className="w-4 h-4" />
                  <span>Multi-Branch Sync</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Real-time stock transfers between Dubai, Abu Dhabi, and Sharjah showrooms.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>DEXGO Enterprise DMS v2.4</span>
            <span className="text-cyan-400">GCC Automotive Network</span>
          </div>
        </div>

        {/* Right Col: High-Tech Authentication Card */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center bg-slate-950/40">
          <div className="mb-6">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              SECURE CONSOLE
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Sign in to DEXGO
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your credentials to access the dealership executive dashboard.
            </p>
          </div>

          {/* Quick Demo Credentials 1-Click Access */}
          <div className="mb-5 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider">
                Instant Demo Access
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">1-Click</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-1.5 px-2 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <KeyRound className="w-3 h-3 text-cyan-400" />
                <span>Admin Login</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('fleet')}
                className="py-1.5 px-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <KeyRound className="w-3 h-3 text-emerald-400" />
                <span>Fleet Manager</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@dealership.ae"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset instructions dispatched to your company security administrator.');
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                />
                <span>Remember this terminal</span>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dealership OS</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <span className="text-[11px] text-slate-500">
              Encrypted end-to-end with TLS 1.3 · GCC Data Residency
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
