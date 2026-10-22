/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency, formatCurrency } from '../utils/finance';
import {
  Database,
  Mic,
  Compass,
  ShieldCheck,
  Wallet,
  RefreshCw,
  Globe,
  Layers,
  Watch,
  FileText,
  Bell,
  Lock,
  Target,
  Flame,
  Download,
  Sparkles,
  ChevronRight,
  X,
  Play,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';

export interface MindMapFeature {
  id: string;
  number: number;
  title: string;
  shortLabel: string;
  category: 'core' | 'ai' | 'budget' | 'ecosystem' | 'privacy';
  icon: React.ElementType;
  description: string;
  highlight: string;
  devices: ('desktop' | 'tablet' | 'mobile' | 'watch')[];
  status: 'active' | 'live-ai' | 'offline-ready';
  tag: string;
  demoData?: {
    metricLabel: string;
    metricValue: string;
    sublabel: string;
  };
}

export const TOP_15_FEATURES: MindMapFeature[] = [
  {
    id: 'offline-sqlite',
    number: 1,
    title: 'Offline SQLite Ledger',
    shortLabel: 'Offline Core',
    category: 'core',
    icon: Database,
    description: 'Zero-latency on-device SQLite database. Works uninterrupted on subways, flights, or off-grid without network connectivity.',
    highlight: 'Instant sub-millisecond writes',
    devices: ['desktop', 'tablet', 'mobile'],
    status: 'offline-ready',
    tag: 'Sovereign Local',
    demoData: {
      metricLabel: 'Local Write Latency',
      metricValue: '0.42 ms',
      sublabel: 'Encrypted SQLite on disk',
    },
  },
  {
    id: 'voice-copilot',
    number: 2,
    title: 'Gemini Voice Copilot',
    shortLabel: 'Live Voice AI',
    category: 'ai',
    icon: Mic,
    description: 'Bidirectional conversational voice assistant powered by Gemini 3.8 Live API. Ask about spending, runway, and financial trends naturally.',
    highlight: '24kHz low-latency speech',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'live-ai',
    tag: 'Gemini 3.8 Live',
    demoData: {
      metricLabel: 'Audio Sampling',
      metricValue: '24,000 Hz',
      sublabel: 'Full duplex conversation',
    },
  },
  {
    id: 'net-worth-radar',
    number: 3,
    title: 'Net Worth Radar',
    shortLabel: 'Net Worth Radar',
    category: 'budget',
    icon: Compass,
    description: 'Holistic real-time balance sheet reconciling savings, checking, stock brokerages, retirement funds, and liabilities.',
    highlight: 'Unified balance sheet',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'active',
    tag: 'Assets vs Liabilities',
    demoData: {
      metricLabel: 'Calculated Net Worth',
      metricValue: '₹24,85,420',
      sublabel: '+₹42,300 this month',
    },
  },
  {
    id: 'runway-predictor',
    number: 4,
    title: 'Runway Predictor',
    shortLabel: 'Runway Predictor',
    category: 'budget',
    icon: ShieldCheck,
    description: 'Calculates exactly how many months your liquid assets can sustain standard monthly burn in case of income interruptions.',
    highlight: 'Safety buffer calculation',
    devices: ['desktop', 'tablet', 'mobile'],
    status: 'active',
    tag: 'Emergency Buffer',
    demoData: {
      metricLabel: 'Current Safety Runway',
      metricValue: '6.4 Months',
      sublabel: 'Healthy tier (target: 6 mo)',
    },
  },
  {
    id: 'envelope-budgets',
    number: 5,
    title: 'Envelope Guardrails',
    shortLabel: 'Envelope Budgets',
    category: 'budget',
    icon: Wallet,
    description: 'Support for 50/30/20, Zero-Based, and Custom Envelope budgeting with dynamic burn-rate pacing alerts.',
    highlight: 'No rigid constraints',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'active',
    tag: 'Budget Strategy',
    demoData: {
      metricLabel: 'October Allocation',
      metricValue: '72% Utilized',
      sublabel: '₹26,760 safe headroom',
    },
  },
  {
    id: 'encrypted-sync',
    number: 6,
    title: 'Encrypted Delta Sync',
    shortLabel: 'Delta Sync',
    category: 'core',
    icon: RefreshCw,
    description: 'Cryptographically signed differential updates sync across your hardware seamlessly when internet access resumes.',
    highlight: 'Conflict-free delta resolution',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'offline-ready',
    tag: 'Zero-Knowledge Sync',
    demoData: {
      metricLabel: 'Sync Protocol',
      metricValue: 'E2E Differential',
      sublabel: 'Only encrypted deltas travel',
    },
  },
  {
    id: 'multi-currency',
    number: 7,
    title: 'Multi-Currency Engine',
    shortLabel: 'Multi-Currency',
    category: 'core',
    icon: Globe,
    description: 'Instant zero-lag conversion between INR, USD, EUR, GBP, and custom travel currencies with cached offline forex matrices.',
    highlight: 'Zero latency conversion',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'active',
    tag: 'Global Forex',
    demoData: {
      metricLabel: 'Offline Rates Cache',
      metricValue: '5 Currencies',
      sublabel: 'Instant math on device',
    },
  },
  {
    id: 'device-continuity',
    number: 8,
    title: 'Multi-Device Flow',
    shortLabel: 'All 4 Devices',
    category: 'ecosystem',
    icon: Layers,
    description: 'Unified financial operating system across Desktop Mac/Web, iPad Tablet, iPhone Mobile, and Apple Watch Ultra.',
    highlight: 'Seamless device handover',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'active',
    tag: 'Ecosystem',
    demoData: {
      metricLabel: 'Platform Support',
      metricValue: 'Web + iOS + Watch',
      sublabel: 'Fluid responsive layout',
    },
  },
  {
    id: 'watch-glance',
    number: 9,
    title: 'Wearable Watch Glance',
    shortLabel: 'Watch Glance',
    category: 'ecosystem',
    icon: Watch,
    description: 'Check daily remaining burn rate, recent transaction confirmations, and record cash expenses directly from your smartwatch.',
    highlight: 'Wrist-speed interaction',
    devices: ['watch'],
    status: 'active',
    tag: 'WatchOS Suite',
    demoData: {
      metricLabel: 'Daily Allowed Burn',
      metricValue: '₹955 / day',
      sublabel: 'Glanceable complication',
    },
  },
  {
    id: 'statement-ocr',
    number: 10,
    title: 'Statement OCR Import',
    shortLabel: 'Statement OCR',
    category: 'ai',
    icon: FileText,
    description: 'Intelligent extraction of bank statements (HDFC, ICICI, SBI, Axis) and receipts with automated category assignment.',
    highlight: 'Smart format normalization',
    devices: ['desktop', 'tablet', 'mobile'],
    status: 'active',
    tag: 'Document Ingestion',
    demoData: {
      metricLabel: 'Auto-Category Accuracy',
      metricValue: '99.4%',
      sublabel: 'Over 14 Indian banks supported',
    },
  },
  {
    id: 'bill-sentinel',
    number: 11,
    title: 'Bill & Leak Sentinel',
    shortLabel: 'Bill Sentinel',
    category: 'budget',
    icon: Bell,
    description: 'Radar for upcoming committed obligations, credit card due dates, utility bills, and creeping subscription price hikes.',
    highlight: 'Zero missed penalties',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'active',
    tag: 'Upcoming Obligations',
    demoData: {
      metricLabel: 'Next 10-Day Bills',
      metricValue: '2 Obligations',
      sublabel: '₹35,420 protected in checking',
    },
  },
  {
    id: 'sovereign-vault',
    number: 12,
    title: 'Sovereign Privacy Vault',
    shortLabel: 'Privacy Vault',
    category: 'privacy',
    icon: Lock,
    description: 'Zero advertising trackers, zero sales of personal telemetry, and complete encryption keys held exclusively on your hardware.',
    highlight: 'No third-party data broker access',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'offline-ready',
    tag: '100% Sovereign',
    demoData: {
      metricLabel: 'Telemetry Trackers',
      metricValue: '0 Trackers',
      sublabel: 'Verified private by design',
    },
  },
  {
    id: 'goal-milestones',
    number: 13,
    title: 'Life Goal Milestones',
    shortLabel: 'Goal Milestones',
    category: 'budget',
    icon: Target,
    description: 'Scenario-based milestone planning for down payments, vacations, emergency reserves, and major family milestones.',
    highlight: 'Visual future trajectory',
    devices: ['desktop', 'tablet', 'mobile'],
    status: 'active',
    tag: 'Future Planning',
    demoData: {
      metricLabel: 'Goal Completion Pace',
      metricValue: '84% on Track',
      sublabel: 'Target: Emergency Fund v2',
    },
  },
  {
    id: 'discretionary-burn',
    number: 14,
    title: 'Discretionary Headroom',
    shortLabel: 'Daily Headroom',
    category: 'budget',
    icon: Flame,
    description: 'Dynamic calculations of how much you can spend today without touching committed bills or starving savings targets.',
    highlight: 'Guilt-free daily budget',
    devices: ['desktop', 'tablet', 'mobile', 'watch'],
    status: 'active',
    tag: 'Safe-To-Spend',
    demoData: {
      metricLabel: 'Safe to Spend Today',
      metricValue: '₹1,240',
      sublabel: 'After bills & savings reserved',
    },
  },
  {
    id: 'data-freedom',
    number: 15,
    title: 'Instant Data Freedom',
    shortLabel: 'Data Freedom',
    category: 'privacy',
    icon: Download,
    description: 'Export your complete financial history to standard open JSON, CSV, or SQLite dumps anytime. No vendor lock-in.',
    highlight: 'Your data belongs to you',
    devices: ['desktop', 'tablet'],
    status: 'offline-ready',
    tag: 'Zero Lock-In',
    demoData: {
      metricLabel: 'Export Formats',
      metricValue: 'JSON · CSV · SQL',
      sublabel: 'One-click full archive',
    },
  },
];

interface OctopusMindMapProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
  onOpenVoiceConversation?: () => void;
  reducedMotion?: boolean;
}

export const OctopusMindMap: React.FC<OctopusMindMapProps> = ({
  currency,
  onOpenEarlyAccess,
  onOpenVoiceConversation,
  reducedMotion = false,
}) => {
  const [selectedFeature, setSelectedFeature] = useState<MindMapFeature>(TOP_15_FEATURES[0]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'ai' | 'budget' | 'ecosystem' | 'privacy'>('all');
  const [hoveredFeatureId, setHoveredFeatureId] = useState<string | null>(null);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Filter features
  const filteredFeatures = activeCategory === 'all'
    ? TOP_15_FEATURES
    : TOP_15_FEATURES.filter((f) => f.category === activeCategory);

  // Periodic heartbeat animation for the central Octopus core
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setPulseCount((c) => c + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative w-full rounded-3xl bg-[#0A101D] text-white border border-white/10 shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Background Aurora Lighting Gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#07856D]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#19B99A]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#07856D]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#19B99A_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Section Header with Live Status */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19B99A]/15 border border-[#19B99A]/40 text-[#19B99A] text-xs font-bold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Unified Architecture Mind Map</span>
            <span className="text-white/40">·</span>
            <span className="text-emerald-300 font-mono">15 Core Systems</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Octopus Neural Core & Top 15 Superpowers
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Tap any feature node to explore its architecture. Everything connects through an offline-first SQLite backbone with synced cloud intelligence.
          </p>
        </div>

        {/* Filter Categories Pill Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
          {[
            { id: 'all', label: 'All 15' },
            { id: 'core', label: 'Offline Core' },
            { id: 'ai', label: 'AI Voice' },
            { id: 'budget', label: 'Budgets' },
            { id: 'ecosystem', label: 'Multi-Device' },
            { id: 'privacy', label: 'Privacy' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#19B99A] text-[#0A101D] shadow-md shadow-[#19B99A]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage: Mind Map Constellation */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
        
        {/* Left Column (lg:col-span-8): The Interactive Mind Map Canvas */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl bg-black/40 border border-white/10 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden">
          
          {/* Animated SVG Tentacles & Wave Connections (Desktop & Tablet) */}
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none opacity-40 -z-0">
            <defs>
              <linearGradient id="tentacleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#07856D" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#19B99A" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C79B48" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Ambient organic tentacle splines radiating from center */}
            <path
              d="M 500 240 Q 250 120 120 90"
              stroke="url(#tentacleGlow)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="4 6"
              className="animate-pulse"
            />
            <path
              d="M 500 240 Q 750 120 880 90"
              stroke="url(#tentacleGlow)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="4 6"
            />
            <path
              d="M 500 260 Q 200 420 150 510"
              stroke="url(#tentacleGlow)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="4 6"
            />
            <path
              d="M 500 260 Q 800 420 850 510"
              stroke="url(#tentacleGlow)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="4 6"
              className="animate-pulse"
            />
            <path
              d="M 500 250 Q 300 280 80 340"
              stroke="url(#tentacleGlow)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 6"
            />
            <path
              d="M 500 250 Q 700 280 920 340"
              stroke="url(#tentacleGlow)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Central Animated Octopus Emblem */}
          <div className="relative mx-auto my-4 flex flex-col items-center text-center">
            <div className="relative">
              {/* Outer Pulsing Concentric Aura */}
              <motion.div
                animate={reducedMotion ? {} : { scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#19B99A]/30 via-[#07856D]/40 to-[#C79B48]/20 blur-xl"
              />

              {/* Orbital Ring with Rotating Nano Particle */}
              <motion.div
                animate={reducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3.5 rounded-full border border-dashed border-[#19B99A]/40"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#19B99A] shadow-[0_0_10px_#19B99A] absolute -top-1.5 left-1/2 -translate-x-1/2" />
              </motion.div>

              {/* Core Badge */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#101C2D] via-[#07856D] to-[#0A101D] p-1.5 shadow-2xl border-2 border-[#19B99A]/80 flex items-center justify-center cursor-pointer group">
                <div className="w-full h-full rounded-full bg-[#0A101D] flex flex-col items-center justify-center p-2 text-center border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  {/* Stylized Modern Vector Octopus Core */}
                  <div className="relative w-10 h-10 mb-1">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-none drop-shadow-[0_0_12px_#19B99A]">
                      {/* Octopus Head */}
                      <path
                        d="M 50 15 C 32 15, 24 28, 24 45 C 24 58, 30 65, 38 68 C 38 72, 35 78, 30 82 C 28 84, 30 87, 33 86 C 40 84, 45 76, 48 70 C 50 70, 52 70, 54 70 C 57 76, 62 84, 69 86 C 72 87, 74 84, 72 82 C 67 78, 64 72, 64 68 C 72 65, 78 58, 78 45 C 78 28, 70 15, 50 15 Z"
                        fill="url(#octoGrad)"
                      />
                      {/* Tentacle Waves */}
                      <path
                        d="M 28 55 Q 15 65 18 78 Q 20 86 28 82"
                        stroke="#19B99A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 74 55 Q 87 65 84 78 Q 82 86 74 82"
                        stroke="#19B99A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 38 66 Q 25 80 32 94"
                        stroke="#07856D"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 64 66 Q 77 80 70 94"
                        stroke="#07856D"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Intelligent Cyber Eyes */}
                      <circle cx="40" cy="42" r="4.5" fill="#FFFFFF" />
                      <circle cx="40" cy="42" r="2" fill="#0A101D" />
                      <circle cx="60" cy="42" r="4.5" fill="#FFFFFF" />
                      <circle cx="60" cy="42" r="2" fill="#0A101D" />
                      <defs>
                        <linearGradient id="octoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#26D07C" />
                          <stop offset="60%" stopColor="#07856D" />
                          <stop offset="100%" stopColor="#0A101D" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-emerald-300 uppercase">
                    Octopus OS
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-xs font-bold text-white tracking-wide">
                Central Sovereign Ledger
              </span>
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#19B99A] animate-ping" />
                <span>Zero Latency · SQLite On-Device</span>
              </div>
            </div>
          </div>

          {/* Feature Nodes Grid (Interactive Neural Constellation) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 relative z-10 pt-4">
            {filteredFeatures.map((feat) => {
              const IconComp = feat.icon;
              const isSelected = selectedFeature.id === feat.id;
              const isHovered = hoveredFeatureId === feat.id;

              return (
                <motion.button
                  key={feat.id}
                  type="button"
                  onClick={() => setSelectedFeature(feat)}
                  onMouseEnter={() => setHoveredFeatureId(feat.id)}
                  onMouseLeave={() => setHoveredFeatureId(null)}
                  whileHover={reducedMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={reducedMotion ? {} : { scale: 0.96 }}
                  className={`relative p-3 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#07856D]/80 to-[#101C2D] border-[#19B99A] shadow-lg shadow-[#19B99A]/20 ring-1 ring-[#19B99A]'
                      : isHovered
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {/* Top Bar inside Node: Number Badge & Device Icons */}
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-black/40 text-emerald-300' : 'bg-white/10 text-slate-400'
                    }`}>
                      #{feat.number.toString().padStart(2, '0')}
                    </span>
                    <IconComp className={`w-4 h-4 ${
                      isSelected ? 'text-[#19B99A]' : 'text-slate-300'
                    }`} />
                  </div>

                  {/* 2-3 Word Feature Title */}
                  <div>
                    <div className="text-xs font-bold leading-tight line-clamp-2">
                      {feat.shortLabel}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                      {feat.tag}
                    </div>
                  </div>

                  {/* Active Indicator Pip */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeFeaturePip"
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#19B99A] shadow-[0_0_8px_#19B99A]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Quick Bar below Grid */}
          <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Core Logic Offline</span>
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="flex items-center gap-1.5 text-cyan-300 font-mono text-[11px]">
                <Cpu className="w-3.5 h-3.5" />
                <span>Multi-Core Hardware Accelerated</span>
              </span>
            </div>

            <span className="text-[11px] text-slate-400">
              Click any node for real-time telemetry
            </span>
          </div>

        </div>

        {/* Right Column (lg:col-span-4): The Interactive Feature Deep-Dive Card */}
        <div className="lg:col-span-4 rounded-2xl bg-[#101C2D] border border-white/15 p-5 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden text-left">
          
          {/* Subtle Ambient Card Gradient */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#07856D]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-5 relative z-10">
            
            {/* Header: Node Number & Category */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#19B99A]/20 border border-[#19B99A]/40 text-[#19B99A] flex items-center justify-center font-bold text-xs">
                  #{selectedFeature.number}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                    {selectedFeature.category.toUpperCase()} SYSTEM
                  </span>
                  <span className="text-xs font-bold text-white">
                    {selectedFeature.tag}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                selectedFeature.status === 'offline-ready'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  : selectedFeature.status === 'live-ai'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                  : 'bg-amber-950 text-amber-300 border border-amber-500/30'
              }`}>
                {selectedFeature.status}
              </span>
            </div>

            {/* Feature Title & Description */}
            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-white leading-tight">
                {selectedFeature.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedFeature.description}
              </p>
            </div>

            {/* Key Highlight Pill */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Primary Capability
              </span>
              <div className="text-xs font-bold text-[#19B99A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedFeature.highlight}</span>
              </div>
            </div>

            {/* Simulated Live Telemetry Widget */}
            {selectedFeature.demoData && (
              <div className="p-3.5 rounded-xl bg-black/40 border border-[#19B99A]/30 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  {selectedFeature.demoData.metricLabel}
                </span>
                <div className="text-xl font-extrabold text-white font-mono tabular-nums">
                  {selectedFeature.demoData.metricValue}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  {selectedFeature.demoData.sublabel}
                </div>
              </div>
            )}

            {/* Supported Form Factors / Hardware Matrix */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2">
                Supported Form Factors
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className={`p-2 rounded-lg border flex flex-col items-center gap-1 ${
                  selectedFeature.devices.includes('desktop')
                    ? 'bg-white/10 border-emerald-500/40 text-emerald-300 font-bold'
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}>
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </div>

                <div className={`p-2 rounded-lg border flex flex-col items-center gap-1 ${
                  selectedFeature.devices.includes('tablet')
                    ? 'bg-white/10 border-emerald-500/40 text-emerald-300 font-bold'
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}>
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </div>

                <div className={`p-2 rounded-lg border flex flex-col items-center gap-1 ${
                  selectedFeature.devices.includes('mobile')
                    ? 'bg-white/10 border-emerald-500/40 text-emerald-300 font-bold'
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </div>

                <div className={`p-2 rounded-lg border flex flex-col items-center gap-1 ${
                  selectedFeature.devices.includes('watch')
                    ? 'bg-white/10 border-emerald-500/40 text-emerald-300 font-bold'
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}>
                  <Watch className="w-3.5 h-3.5" />
                  <span>Watch</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action CTAs inside Drawer */}
          <div className="pt-5 mt-4 border-t border-white/10 space-y-2 relative z-10">
            {selectedFeature.id === 'voice-copilot' && onOpenVoiceConversation ? (
              <button
                type="button"
                onClick={onOpenVoiceConversation}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#26D07C] to-[#19B99A] hover:opacity-95 text-[#0A101D] font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#26D07C]/20 transition-all"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Launch Live Voice Copilot</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenEarlyAccess}
                className="w-full py-2.5 px-4 rounded-xl bg-[#07856D] hover:bg-[#066c59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#07856D]/30 transition-all"
              >
                <span>Get Early Access to This System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <p className="text-[10px] text-slate-400 text-center">
              Runs 100% locally on your devices with optional E2E delta sync.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
