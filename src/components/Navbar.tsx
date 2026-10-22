/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Currency, CURRENCY_SYMBOLS } from '../utils/finance';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight, Zap, Play, Sparkles } from 'lucide-react';

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenEarlyAccess: () => void;
  onOpenInteractivePreview?: () => void;
  onOpenVoiceConversation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  reducedMotion,
  onToggleReducedMotion,
  onOpenEarlyAccess,
  onOpenInteractivePreview,
  onOpenVoiceConversation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#product' },
    { label: 'Devices', href: '#multi-device' },
    { label: 'Chapters', href: '#chapters' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Offline Core', href: '#offline-engine' },
    { label: 'AI Copilot', href: '#ai-copilot' },
    { label: 'Privacy', href: '#privacy-control' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={reducedMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left: Brand Logo in a translucent glass badge */}
        <a
          href="#"
          className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-[#E1E8E4] shadow-xs transition-all duration-200 hover:-translate-y-0.5"
          aria-label="Octopus Organizer Home"
        >
          <BrandLogo size="sm" />
        </a>

        {/* Center: Translucent Sage/Mint Floating Nav Pill (Inspired by Meadowbell) */}
        <nav
          className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E2F5ED]/75 hover:bg-[#E2F5ED]/90 backdrop-blur-md border border-[#19B99A]/30 shadow-sm transition-all duration-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-1.5 text-xs font-semibold text-[#101C2D]/80 hover:text-[#07856D] hover:bg-white/60 rounded-full transition-all"
              >
                {link.label}
              </a>
              {idx < navLinks.length - 1 && (
                <span className="text-[#19B99A]/50 text-xs select-none" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right: Currency & Interactive CTA Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center p-0.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E1E8E4] text-xs">
            {(['INR', 'USD', 'EUR'] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onCurrencyChange(c)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  currency === c
                    ? 'bg-[#101C2D] text-white shadow-xs'
                    : 'text-[#637184] hover:text-[#101C2D]'
                }`}
                aria-label={`Switch currency to ${c}`}
              >
                {CURRENCY_SYMBOLS[c]}
              </button>
            ))}
          </div>

          {/* Reduced Motion Toggle (Desktop/Tablet) */}
          <button
            type="button"
            onClick={onToggleReducedMotion}
            className={`hidden sm:flex p-2 rounded-full border backdrop-blur-md transition-all ${
              reducedMotion
                ? 'bg-[#07856D] text-white border-[#07856D]'
                : 'bg-white/80 text-[#637184] border-[#E1E8E4] hover:text-[#101C2D]'
            }`}
            title={reducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
            aria-label="Toggle reduced motion"
          >
            <Zap className="w-3.5 h-3.5" />
          </button>

          {/* Voice Copilot Button (Gemini 3.8 Live API) */}
          {onOpenVoiceConversation && (
            <button
              type="button"
              onClick={onOpenVoiceConversation}
              className="group relative inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-[#062016] bg-[#26D07C] hover:bg-[#19B99A] active:scale-95 rounded-full shadow-md shadow-[#26D07C]/25 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26D07C]"
              title="Open Gemini 3.8 Live Voice Conversation"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#062016] animate-pulse" />
              <span className="hidden sm:inline">Voice Copilot</span>
              <span className="sm:hidden text-[11px]">AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#062016] animate-ping" />
            </button>
          )}

          {/* Primary Join Us Pill Button */}
          <button
            type="button"
            onClick={onOpenEarlyAccess}
            className="group relative inline-flex items-center gap-1 px-3 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white bg-[#07856D] hover:bg-[#066c59] active:scale-95 rounded-full shadow-md shadow-[#07856D]/20 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07856D]"
          >
            <span>Join</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-full bg-white/80 border border-[#E1E8E4] text-[#101C2D] backdrop-blur-md"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-sm mx-auto mt-2 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E1E8E4] shadow-xl pointer-events-auto space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-sm font-semibold text-[#101C2D] hover:bg-[#E2F5ED] rounded-xl flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#07856D]">→</span>
              </a>
            ))}
          </div>

          {onOpenVoiceConversation && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVoiceConversation();
              }}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#26D07C] text-[#062016] flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Live Voice Copilot</span>
            </button>
          )}

          <div className="pt-2 border-t border-[#E1E8E4] flex items-center justify-between">
            <span className="text-xs font-medium text-[#637184]">Currency:</span>
            <div className="flex gap-1">
              {(['INR', 'USD', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCurrencyChange(c)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    currency === c ? 'bg-[#101C2D] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E1E8E4] flex items-center justify-between">
            <span className="text-xs font-medium text-[#637184]">Reduced Motion:</span>
            <button
              type="button"
              onClick={onToggleReducedMotion}
              className={`px-3 py-1 rounded-md text-xs font-bold ${
                reducedMotion ? 'bg-[#07856D] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {reducedMotion ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
};
