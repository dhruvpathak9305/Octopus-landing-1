/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Currency, formatCurrency } from '../utils/finance';
import { AmbientCanvas } from './AmbientCanvas';
import { BrandLogo } from './BrandLogo';
import { OctopusMindMap } from './OctopusMindMap';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'motion/react';
import { 
  ArrowRight, 
  HardDrive, 
  RefreshCw, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Wallet, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Play, 
  Layers, 
  ChevronRight, 
  Zap, 
  Activity 
} from 'lucide-react';

interface HeroProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
  onExploreProduct: () => void;
  onOpenVoiceConversation?: () => void;
  reducedMotion?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  currency,
  onOpenEarlyAccess,
  onExploreProduct,
  onOpenVoiceConversation,
  reducedMotion = false,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'spending' | 'budget'>('overview');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('all');
  const [demoVideoModalOpen, setDemoVideoModalOpen] = useState<boolean>(false);
  const [heroViewMode, setHeroViewMode] = useState<'mindmap' | 'chassis'>('mindmap');

  // Scroll-based parallax target ref
  const heroRef = useRef<HTMLElement | null>(null);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Spring smoothing for silky parallax physics
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Layered parallax transforms (disabled when reducedMotion is active)
  const yBg = useTransform(smoothScroll, [0, 1], [0, reducedMotion ? 0 : 120]);
  const yText = useTransform(smoothScroll, [0, 1], [0, reducedMotion ? 0 : 70]);
  const yButtons = useTransform(smoothScroll, [0, 1], [0, reducedMotion ? 0 : 40]);
  const yChassis = useTransform(smoothScroll, [0, 1], [0, reducedMotion ? 0 : -65]);
  const rotateXChassis = useTransform(smoothScroll, [0, 1], [0, reducedMotion ? 0 : 4]);
  const rotateYChassis = useTransform(smoothScroll, [0, 1], [0, reducedMotion ? 0 : -3]);

  // Framer Motion Variants for Staggered Entrance
  const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.13,
        delayChildren: reducedMotion ? 0 : 0.06,
      },
    },
  };

  const heroItemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 26, 
      filter: reducedMotion ? 'none' : 'blur(6px)' 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 20,
        mass: 0.75,
      },
    },
  };

  const buttonClusterVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 240,
        damping: 22,
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const buttonItemVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 14, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 280,
        damping: 20,
      },
    },
  };

  const propositionsContainerVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 24,
        staggerChildren: reducedMotion ? 0 : 0.08,
      },
    },
  };

  const propositionCardVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 22,
      },
    },
  };

  const chassisVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 42, 
      scale: reducedMotion ? 1 : 0.95, 
      filter: reducedMotion ? 'none' : 'blur(8px)' 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 190,
        damping: 24,
        mass: 1.05,
        delay: reducedMotion ? 0 : 0.28,
      },
    },
  };

  const baseNetWorth = 2485420;
  const baseMonthlySpend = 68240;
  const baseBudgetLimit = 95000;
  const baseDelta = 42300;

  const accounts = [
    { id: 'hdfc', name: 'HDFC Priority', balance: 142800, type: 'Savings', isSynced: true },
    { id: 'icici', name: 'ICICI Salary', balance: 84500, type: 'Checking', isSynced: true },
    { id: 'zerodha', name: 'Zerodha Demat', balance: 2320220, type: 'Investment', isSynced: true },
    { id: 'axis', name: 'Axis Magnus CC', balance: -62100, type: 'Credit Card', isSynced: false },
  ];

  const recentTransactions = [
    { id: '1', title: 'Nature Basket Groceries', category: 'Groceries', amount: -2850, date: 'Today, 2:15 PM', status: 'local' },
    { id: '2', title: 'Airtel Fiber Broadband', category: 'Utilities', amount: -1499, date: 'Yesterday', status: 'synced' },
    { id: '3', title: 'Freelance Design Retainer', category: 'Income', amount: 45000, date: '20 Oct', status: 'synced' },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[94vh] flex items-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F7F8F4] via-[#f0f6f3] to-[#F7F8F4]"
    >
      {/* Living Ambient Canvas in Background with Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        <AmbientCanvas reducedMotion={reducedMotion} />
      </motion.div>

      {/* Atmospheric Soft Light Wells with Parallax */}
      <motion.div 
        style={{ y: yBg }}
        aria-hidden="true" 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-br from-[#19B99A]/20 via-[#07856D]/12 to-transparent rounded-full blur-3xl pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col space-y-8 items-center text-center">
          
          {/* Framer Motion Staggered Editorial Copy */}
          <motion.div 
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: yText }}
            className="max-w-4xl mx-auto space-y-6"
          >
            
            {/* Top Logo & Studio Emblem (Sequential Entrance Element 1) */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap items-center justify-center gap-3">
              <div className="p-1 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E1E8E4] shadow-2xs inline-flex items-center">
                <BrandLogo size="sm" />
              </div>
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2F5ED] border border-[#19B99A]/30 text-xs font-bold uppercase tracking-wider text-[#07856D] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#19B99A] animate-ping" />
                <span>Offline-First Personal Finance</span>
                <span className="text-[#637184]" aria-hidden="true">·</span>
                <span className="text-[#07856D] font-mono lowercase">v2.4 preview</span>
              </div>
            </motion.div>

            {/* Headline (Sequential Entrance Element 2) */}
            <motion.h1 
              variants={heroItemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#101C2D] tracking-tight leading-[1.08] drop-shadow-xs"
            >
              Your entire financial life,{' '}
              <span className="text-[#07856D] relative inline-block underline decoration-[#19B99A]/40 decoration-wavy decoration-2 underline-offset-8">
                organized.
              </span>
            </motion.h1>

            {/* Primary Narrative (Sequential Entrance Element 3) */}
            <motion.p 
              variants={heroItemVariants}
              className="text-lg sm:text-xl text-[#101C2D]/85 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Track every rupee you record, manage budgets and upcoming bills, understand your net worth, and use AI-powered insights to make better decisions.
            </motion.p>

            {/* Secondary Architecture Descriptor (Sequential Entrance Element 4) */}
            <motion.p 
              variants={heroItemVariants}
              className="text-sm sm:text-base text-[#637184] leading-relaxed max-w-xl mx-auto"
            >
              Designed to work offline for your core financial records, with supported online synchronisation and cloud-powered AI when you need it.
            </motion.p>

            {/* Action Buttons Cluster with Spring Physics (Sequential Entrance Element 5) */}
            <motion.div 
              variants={buttonClusterVariants}
              style={{ y: yButtons }}
              className="pt-2 flex flex-wrap items-center justify-center gap-3.5"
            >
              {/* Primary Early Access CTA */}
              <motion.button
                variants={buttonItemVariants}
                whileHover={reducedMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                type="button"
                onClick={onOpenEarlyAccess}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#07856D] to-[#19B99A] hover:opacity-95 rounded-full shadow-lg shadow-[#07856D]/30 transition-all duration-200"
              >
                <span>Join Early Access</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              {/* Translucent Mint Pill (Watch Preview) */}
              <motion.button
                variants={buttonItemVariants}
                whileHover={reducedMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                type="button"
                onClick={() => setDemoVideoModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-[#07856D] bg-[#E2F5ED]/80 hover:bg-[#E2F5ED] border border-[#19B99A]/40 rounded-full shadow-xs backdrop-blur-md transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-[#07856D] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Preview</span>
              </motion.button>

              {/* Voice Copilot CTA */}
              {onOpenVoiceConversation && (
                <motion.button
                  variants={buttonItemVariants}
                  whileHover={reducedMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={reducedMotion ? {} : { scale: 0.97 }}
                  type="button"
                  onClick={onOpenVoiceConversation}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-bold text-[#062016] bg-[#26D07C] hover:bg-[#19B99A] rounded-full shadow-md shadow-[#26D07C]/20 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 text-[#062016] group-hover:rotate-12 transition-transform" />
                  <span>Voice Copilot</span>
                </motion.button>
              )}
            </motion.div>

            {/* Proposition Triad (Sequential Entrance Element 6) */}
            <motion.div 
              variants={propositionsContainerVariants}
              className="pt-6 border-t border-[#E1E8E4]/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-3xl mx-auto"
            >
              <motion.div variants={propositionCardVariants} className="space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#101C2D]">
                  <HardDrive className="w-3.5 h-3.5 text-[#07856D]" />
                  <span>Works 100% Offline</span>
                </div>
                <p className="text-xs text-[#637184]">
                  SQLite local ledger. Zero latency on-device.
                </p>
              </motion.div>

              <motion.div variants={propositionCardVariants} className="space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#101C2D]">
                  <RefreshCw className="w-3.5 h-3.5 text-[#19B99A]" />
                  <span>Syncs When Connected</span>
                </div>
                <p className="text-xs text-[#637184]">
                  Encrypted delta sync across your devices.
                </p>
              </motion.div>

              <motion.div variants={propositionCardVariants} className="space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#101C2D]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C79B48]" />
                  <span>Cloud AI Insights</span>
                </div>
                <p className="text-xs text-[#637184]">
                  Contextual analysis with Gemini intelligence.
                </p>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* View Mode Switcher Header Pill */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl pt-2 pb-1 gap-4">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E1E8E4] shadow-xs">
              <button
                type="button"
                onClick={() => setHeroViewMode('mindmap')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  heroViewMode === 'mindmap'
                    ? 'bg-[#101C2D] text-white shadow-md'
                    : 'text-[#637184] hover:text-[#101C2D]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#19B99A]" />
                <span>🐙 Octopus 15-Feature Mind Map</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroViewMode('chassis')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  heroViewMode === 'chassis'
                    ? 'bg-[#101C2D] text-white shadow-md'
                    : 'text-[#637184] hover:text-[#101C2D]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#07856D]" />
                <span>💻 Live OS Ledger</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-[#07856D] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#19B99A] animate-ping" />
                <span>{heroViewMode === 'mindmap' ? 'Interactive Constellation · 15 Systems Ready' : 'macOS Financial Ledger Active'}</span>
              </span>
            </div>
          </div>

          {/* Main Full-Width Stage: OctopusMindMap or Financial Chassis */}
          <motion.div 
            style={{ 
              y: yChassis,
              rotateX: heroViewMode === 'chassis' ? rotateXChassis : 0,
              rotateY: heroViewMode === 'chassis' ? rotateYChassis : 0,
              transformPerspective: 1200,
            }}
            variants={chassisVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {heroViewMode === 'mindmap' ? (
              <OctopusMindMap
                currency={currency}
                onOpenEarlyAccess={onOpenEarlyAccess}
                onOpenVoiceConversation={onOpenVoiceConversation}
                reducedMotion={reducedMotion}
              />
            ) : (
              <div className="relative mx-auto max-w-4xl">
              
              {/* Floating Glow Frame */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#19B99A]/35 via-[#07856D]/25 to-[#C79B48]/25 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

              {/* Outer App Chassis */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E1E8E4] shadow-2xl overflow-hidden transition-all duration-300">
                
                {/* Chassis Top Navigation Bar */}
                <div className="px-5 py-3.5 bg-[#101C2D] text-white flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="ml-2 text-xs font-mono font-medium text-slate-300 tracking-wider">
                      OCTOPUS OS · LOCAL LEDGER
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#07856D] text-white shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      SQLITE ACTIVE
                    </span>
                  </div>
                </div>

                {/* Sub-Tabs Selector */}
                <div className="px-5 py-2.5 bg-[#F7F8F4] border-b border-[#E1E8E4] flex items-center justify-between">
                  <div className="flex items-center gap-1 p-0.5 bg-slate-200/60 rounded-xl">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'spending', label: 'Spending Trends' },
                      { id: 'budget', label: 'Budget Guardrails' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-white text-[#101C2D] shadow-xs'
                            : 'text-[#637184] hover:text-[#101C2D]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-[#637184]">
                    October 2026
                  </span>
                </div>

                {/* Chassis Main Canvas */}
                <div className="p-5 space-y-5 bg-white text-left">
                  
                  {/* Top Metric Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Net Worth Card */}
                    <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#E1E8E4] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#637184]">Calculated Net Worth</span>
                        <span className="text-[11px] font-bold text-[#07856D] flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          +{formatCurrency(baseDelta, currency)}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-[#101C2D] tracking-tight tabular-nums">
                        {formatCurrency(baseNetWorth, currency)}
                      </div>
                      <div className="text-[10px] text-[#637184]">
                        4 accounts · Reconciled locally
                      </div>
                    </div>

                    {/* Monthly Budget Card */}
                    <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#E1E8E4] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#637184]">October Budget</span>
                        <span className="text-[11px] font-bold text-[#101C2D]">72% spent</span>
                      </div>
                      <div className="text-2xl font-black text-[#101C2D] tracking-tight tabular-nums">
                        {formatCurrency(baseMonthlySpend, currency)}{' '}
                        <span className="text-xs font-medium text-[#637184]">
                          / {formatCurrency(baseBudgetLimit, currency)}
                        </span>
                      </div>
                      {/* Animated Progress Bar */}
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                        <div 
                          className="bg-[#07856D] h-full rounded-full transition-all duration-700" 
                          style={{ width: '71.8%' }} 
                        />
                      </div>
                    </div>

                  </div>

                  {/* Dynamic Tab Body */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      
                      {/* Accounts Mini Grid */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#637184]">
                            Accounts & Obligations
                          </span>
                          <span className="text-[11px] text-[#07856D] font-bold">Encrypted Cache</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {accounts.map((acc) => (
                            <div
                              key={acc.id}
                              className="p-3 rounded-xl border border-[#E1E8E4] bg-white hover:border-[#19B99A] transition-colors"
                            >
                              <div className="flex items-center justify-between text-xs font-medium text-[#101C2D]">
                                <span className="truncate">{acc.name}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#19B99A]" />
                              </div>
                              <div className={`text-sm font-extrabold mt-1 tabular-nums ${acc.balance < 0 ? 'text-amber-700' : 'text-[#101C2D]'}`}>
                                {formatCurrency(acc.balance, currency)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Ledger Entries */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#637184]">
                            Recent Ledger Activity
                          </span>
                          <span className="text-[11px] text-[#637184]">Instant offline capture</span>
                        </div>
                        <div className="space-y-2">
                          {recentTransactions.map((tx) => (
                            <div
                              key={tx.id}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] text-xs hover:bg-white transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                {tx.status === 'local' ? (
                                  <span title="Saved locally offline" className="inline-flex shrink-0">
                                    <HardDrive className="w-4 h-4 text-[#07856D]" />
                                  </span>
                                ) : (
                                  <span title="Synced to cloud" className="inline-flex shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-[#19B99A]" />
                                  </span>
                                )}
                                <div>
                                  <div className="font-bold text-[#101C2D]">{tx.title}</div>
                                  <div className="text-[10px] text-[#637184]">{tx.category} · {tx.date}</div>
                                </div>
                              </div>
                              <div className={`tabular-nums font-extrabold ${tx.amount > 0 ? 'text-[#07856D]' : 'text-[#101C2D]'}`}>
                                {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount, currency)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {activeTab === 'spending' && (
                    <div className="space-y-3">
                      <div className="text-xs text-[#637184] flex items-center justify-between">
                        <span>Weekly Flow Dynamics</span>
                        <span className="font-bold text-[#101C2D]">Pacing: Under Budget</span>
                      </div>
                      
                      {/* Animated Chart Line + Bars */}
                      <div className="p-4 bg-[#F7F8F4] rounded-2xl border border-[#E1E8E4]">
                        <div className="flex items-end justify-between h-28 gap-2 pt-2 px-1">
                          {[
                            { week: 'W1', amount: 15200, height: '55%' },
                            { week: 'W2', amount: 22400, height: '80%' },
                            { week: 'W3', amount: 18100, height: '65%' },
                            { week: 'W4 (Now)', amount: 12540, height: '45%' },
                          ].map((bar, i) => (
                            <div key={bar.week} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                              <span className="text-[9px] tabular-nums font-semibold text-[#637184]">{formatCurrency(bar.amount, currency)}</span>
                              <div 
                                className={`w-full rounded-t-lg transition-all duration-500 ${
                                  i === 3 ? 'bg-[#07856D]' : 'bg-[#19B99A]/60 hover:bg-[#19B99A]'
                                }`}
                                style={{ height: bar.height }}
                              />
                              <span className="text-[10px] font-semibold text-[#101C2D]">{bar.week}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'budget' && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#637184]">
                        Active Envelope Caps
                      </span>
                      <div className="space-y-2">
                        {[
                          { name: 'Housing & Rent', spent: 32000, cap: 35000, pct: 91 },
                          { name: 'Groceries & Household', spent: 14200, cap: 20000, pct: 71 },
                          { name: 'Dining & Outings', spent: 11400, cap: 15000, pct: 76 },
                          { name: 'Transit & Fuel', spent: 10640, cap: 15000, pct: 71 },
                        ].map((cat) => (
                          <div key={cat.name} className="p-2.5 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-[#101C2D]">{cat.name}</span>
                              <span className="tabular-nums font-semibold text-[#637184]">
                                {formatCurrency(cat.spent, currency)} / {formatCurrency(cat.cap, currency)} ({cat.pct}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${cat.pct > 85 ? 'bg-amber-600' : 'bg-[#07856D]'}`} 
                                style={{ width: `${cat.pct}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upcoming Bill Alert Badge */}
                  <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-amber-900">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="font-bold">Next Obligation:</span> Tata Power ({formatCurrency(3420, currency)}) in 3 days
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
                      Protected
                    </span>
                  </div>

                  {/* Copilot Insight Pill */}
                  <div className="p-4 bg-[#101C2D] text-white rounded-2xl border border-white/10 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#19B99A]/20 text-[#19B99A] shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-[#19B99A] uppercase tracking-wider">
                        Copilot Financial Intelligence
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Groceries are 12% lower than September. You have <strong className="text-white tabular-nums">{formatCurrency(26760, currency)}</strong> safe headroom remaining before month-end.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Chassis Footer */}
                <div className="px-5 py-3 bg-[#F7F8F4] border-t border-[#E1E8E4] flex items-center justify-between text-[11px] text-[#637184]">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    WatermelonDB Engine Ready
                  </span>
                  <span className="font-semibold text-[#07856D]">Interactive Live Demo</span>
                </div>
              </div>
            </div>
            )}
          </motion.div>

        </div>
      </div>

      {/* Demo Preview Modal */}
      {demoVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#101C2D] text-white rounded-3xl border border-white/20 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#19B99A] animate-ping" />
                <h3 className="text-lg font-bold text-white">Octopus Organizer · Live System Preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setDemoVideoModalOpen(false)}
                className="px-3 py-1 text-xs font-bold text-slate-300 hover:text-white bg-white/10 rounded-full"
              >
                Close ✕
              </button>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-white/10 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#07856D]/30 border border-[#19B99A] text-[#19B99A] flex items-center justify-center mx-auto">
                <Activity className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-white">Experience Zero-Latency Local Finance</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Watch how transactions are parsed instantly from bank statements, stored in your device SQLite tables, synchronized upon internet reconnect, and clarified by Gemini AI.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDemoVideoModalOpen(false);
                    onOpenEarlyAccess();
                  }}
                  className="px-6 py-3 rounded-full bg-[#19B99A] text-[#101C2D] font-bold text-xs hover:bg-[#159e84] transition-colors"
                >
                  Join Private Beta Cohort
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDemoVideoModalOpen(false);
                    onExploreProduct();
                  }}
                  className="px-5 py-3 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors"
                >
                  Explore Interactive Modules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
