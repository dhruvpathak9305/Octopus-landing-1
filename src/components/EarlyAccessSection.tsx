/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { validateEarlyAccessForm } from '../utils/finance';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Sparkles, 
  AlertCircle,
  Copy,
  Check,
  Watch
} from 'lucide-react';

interface EarlyAccessSectionProps {
  onExploreProduct: () => void;
}

export const EarlyAccessSection: React.FC<EarlyAccessSectionProps> = ({
  onExploreProduct,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [platform, setPlatform] = useState<string>('android');
  const [goal, setGoal] = useState<string>('budget');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    ticketId: string;
    email: string;
    platform: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Check if previously submitted in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('octopus_early_access_ticket');
      if (saved) {
        setSubmittedData(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEarlyAccessForm(email, fullName);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = `OCT-${Math.floor(100000 + Math.random() * 900000)}`;
      const payload = {
        ticketId,
        email: email.trim(),
        platform,
      };
      try {
        localStorage.setItem('octopus_early_access_ticket', JSON.stringify(payload));
      } catch {
        // ignore
      }
      setSubmittedData(payload);
      setIsSubmitting(false);
    }, 800);
  };

  const handleCopyTicket = () => {
    if (submittedData?.ticketId) {
      navigator.clipboard.writeText(submittedData.ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('octopus_early_access_ticket');
    } catch {
      // ignore
    }
    setSubmittedData(null);
    setFullName('');
    setEmail('');
  };

  return (
    <section id="early-access" className="py-24 bg-[#101C2D] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#07856D]/20 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#19B99A]">
            <Sparkles className="w-4 h-4" />
            <span>Private Preview Cohort</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Take control of your financial future.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Start bringing your financial life together with Octopus Organizer. Reserve your spot for the upcoming private testing wave.
          </p>
        </div>

        {/* Waitlist Form or Confirmation Card */}
        <div className="bg-slate-900/90 rounded-2xl border border-white/10 p-6 sm:p-10 text-left shadow-2xl backdrop-blur-md">
          
          {submittedData ? (
            <div className="space-y-6 text-center py-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#19B99A]/20 text-[#19B99A] flex items-center justify-center mx-auto border border-[#19B99A]/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  You’re on the Early Access List!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  We have registered <strong className="text-white">{submittedData.email}</strong> for the upcoming {submittedData.platform.toUpperCase()} invite wave.
                </p>
              </div>

              {/* Pass Badge */}
              <div className="p-4 bg-white/5 border border-white/15 rounded-xl max-w-sm mx-auto flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                    Access Pass Reference
                  </span>
                  <span className="text-lg font-mono font-black text-[#19B99A]">
                    {submittedData.ticketId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Copy pass reference"
                  aria-label="Copy ticket pass"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onExploreProduct}
                  className="px-5 py-2.5 rounded-xl bg-[#19B99A] text-[#101C2D] font-bold text-xs hover:bg-[#159e84] transition-colors"
                >
                  Explore Interactive Demos
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Register another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-semibold text-slate-200">
                    Your Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dhruv Pathak"
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#19B99A]"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-200">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#19B99A]"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Platform Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Target Operating System
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'desktop', label: 'macOS / Web', icon: Laptop },
                    { id: 'ios', label: 'iOS / iPadOS', icon: Smartphone },
                    { id: 'watch', label: 'Apple Watch', icon: Watch },
                    { id: 'android', label: 'Android Beta', icon: Smartphone },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = platform === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlatform(p.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#19B99A] text-[#101C2D] font-bold border-[#19B99A]'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Goal Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Primary Financial Focus
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'budget', label: 'Budget Discipline' },
                    { id: 'networth', label: 'Net Worth Tracking' },
                    { id: 'offline', label: 'Offline Security' },
                    { id: 'copilot', label: 'AI Clarification' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoal(g.id)}
                      className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-colors ${
                        goal === g.id
                          ? 'bg-white text-[#101C2D] font-bold border-white'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#19B99A] hover:bg-[#159e84] active:bg-[#128a73] text-[#101C2D] font-bold text-sm transition-all shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering your pass...</span>
                  ) : (
                    <>
                      <span>Submit for Early Access Invitation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#19B99A]" />
                <span>Zero spam guarantee. Invitations are delivered directly to your inbox.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
