/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency, formatCurrency } from '../utils/finance';
import {
  Monitor,
  Tablet,
  Smartphone,
  Watch,
  HardDrive,
  RefreshCw,
  Sparkles,
  Wifi,
  WifiOff,
  Plus,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  PieChart,
  Calendar,
  Layers,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface MultiDeviceEcosystemProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
  reducedMotion?: boolean;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile' | 'watch' | 'all';

export const MultiDeviceEcosystem: React.FC<MultiDeviceEcosystemProps> = ({
  currency,
  onOpenEarlyAccess,
  reducedMotion = false,
}) => {
  const [activeDevice, setActiveDevice] = useState<DeviceMode>('desktop');
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [testTransactionCount, setTestTransactionCount] = useState<number>(3);

  // Dynamic values that update simultaneously across all simulated devices
  const netWorthBase = 2485420 - (testTransactionCount - 3) * 1450;
  const monthlySpendBase = 68240 + (testTransactionCount - 3) * 1450;
  const budgetCeiling = 95000;
  const remainingHeadroom = budgetCeiling - monthlySpendBase;
  const dailyBurnAllowed = Math.round(remainingHeadroom / 9);

  const handleAddMockExpense = () => {
    setTestTransactionCount((c) => c + 1);
  };

  const devicesList = [
    { id: 'desktop', label: 'Desktop Mac / Web', icon: Monitor, tag: 'Full Workspace' },
    { id: 'tablet', label: 'iPad Pro', icon: Tablet, tag: 'Touch & Canvas' },
    { id: 'mobile', label: 'iPhone 16 Pro', icon: Smartphone, tag: 'Pocket Ledger' },
    { id: 'watch', label: 'Apple Watch Ultra', icon: Watch, tag: 'Wrist Glance' },
    { id: 'all', label: 'Spatial 3D View', icon: Layers, tag: 'Unified Flow' },
  ];

  return (
    <section id="multi-device" className="py-24 bg-[#0A101D] text-white relative overflow-hidden border-b border-white/10">
      {/* Background Lighting Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-gradient-to-br from-[#07856D]/20 via-[#19B99A]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-tl from-[#C79B48]/15 via-[#07856D]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#19B99A]/15 border border-[#19B99A]/40 text-[#19B99A] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Continuous Form Factors</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            One financial brain. Everywhere you move.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Experience flawless parity across Desktop, Tablet, Mobile, and Smartwatch. Your ledger writes locally to SQLite on each device, then synchronizes seamlessly when connected.
          </p>

          {/* Interactive Simulation Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleAddMockExpense}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all active:scale-95 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#19B99A]" />
              <span>Simulate Local Expense (-{formatCurrency(1450, currency)})</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSimulatedOffline(!isSimulatedOffline)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                isSimulatedOffline
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                  : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              }`}
            >
              {isSimulatedOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Network: Offline (SQLite Local)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Network: Online (Encrypted Delta Sync)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Device Switcher Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            {devicesList.map((dev) => {
              const IconComp = dev.icon;
              const isActive = activeDevice === dev.id;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => setActiveDevice(dev.id as DeviceMode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#07856D] to-[#19B99A] text-white shadow-lg shadow-[#07856D]/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{dev.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Device Display Stage */}
        <div className="relative min-h-[540px] flex items-center justify-center">
          
          {/* 1. DESKTOP VIEWPORT */}
          {activeDevice === 'desktop' && (
            <motion.div
              key="desktop"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl rounded-2xl bg-[#101C2D] border border-white/15 shadow-2xl overflow-hidden"
            >
              {/* MacBook Top Bar */}
              <div className="px-5 py-3 bg-[#0A101D] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-3">
                    Octopus Workspace · macOS Desktop / Chrome
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isSimulatedOffline ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                  }`}>
                    {isSimulatedOffline ? 'SQLite Offline' : 'Delta Synced'}
                  </span>
                  <span className="text-slate-400">v2.4.0</span>
                </div>
              </div>

              {/* Desktop Dashboard Interface */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                {/* Left 4 Cols: Net Worth & Accounts */}
                <div className="md:col-span-4 space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                      Calculated Net Worth
                    </span>
                    <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                      {formatCurrency(netWorthBase, currency)}
                    </div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+₹42,300 reconciled this month</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                      Liquid Runway Indicator
                    </span>
                    <div className="text-xl font-bold text-white font-mono">
                      6.4 Months Safety
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#07856D] to-[#19B99A] w-3/4 rounded-full" />
                    </div>
                    <span className="text-[11px] text-slate-400 block">
                      Liquid checking & savings cover obligations through April 2027.
                    </span>
                  </div>
                </div>

                {/* Center 8 Cols: Spending, Transactions & Budgets */}
                <div className="md:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                        October Outflow Run
                      </span>
                      <div className="text-xl font-bold text-white font-mono tabular-nums">
                        {formatCurrency(monthlySpendBase, currency)}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Ceiling: {formatCurrency(budgetCeiling, currency)} (72% Burn)
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                        Discretionary Safe Headroom
                      </span>
                      <div className="text-xl font-bold text-[#19B99A] font-mono tabular-nums">
                        {formatCurrency(remainingHeadroom, currency)}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {formatCurrency(dailyBurnAllowed, currency)} / day remaining
                      </span>
                    </div>
                  </div>

                  {/* Transactions Table Preview */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                      <span>Live Ledger Feed ({testTransactionCount} Records)</span>
                      <span className="text-emerald-400 font-mono text-[10px]">Instant Local Writes</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-3.5 h-3.5 text-[#19B99A]" />
                          <span className="font-bold text-white">Nature Basket Groceries</span>
                        </div>
                        <span className="font-mono font-bold text-white">-{formatCurrency(2850, currency)}</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-3.5 h-3.5 text-[#07856D]" />
                          <span className="font-bold text-white">Airtel Fiber Broadband</span>
                        </div>
                        <span className="font-mono font-bold text-white">-{formatCurrency(1499, currency)}</span>
                      </div>

                      {testTransactionCount > 3 && (
                        <div className="flex items-center justify-between p-2 rounded-lg bg-[#07856D]/20 border border-[#19B99A]/30">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#19B99A] animate-ping" />
                            <span className="font-bold text-emerald-300">New Local Simulated Expense</span>
                          </div>
                          <span className="font-mono font-bold text-emerald-300">-{formatCurrency(1450, currency)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. TABLET IPAD PRO VIEWPORT */}
          {activeDevice === 'tablet' && (
            <motion.div
              key="tablet"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl rounded-[32px] bg-[#101C2D] border-8 border-slate-800 shadow-2xl p-5 text-left"
            >
              {/* Tablet Top Notch & Status */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <span className="font-bold text-white">iPad Pro 11″ · Octopus Touch</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span>9:41 AM</span>
                  <span className="text-emerald-400">● 100% Battery</span>
                </div>
              </div>

              {/* Tablet Content */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    Touch Envelope Allocations
                  </span>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Needs (50%)</span>
                        <span className="font-mono">{formatCurrency(44200, currency)}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-[#07856D] w-[65%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Wants (30%)</span>
                        <span className="font-mono">{formatCurrency(24040, currency)}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-[#19B99A] w-[80%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                      Live Reconciled Net Worth
                    </span>
                    <div className="text-2xl font-black text-white font-mono mt-1">
                      {formatCurrency(netWorthBase, currency)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#07856D]/20 border border-[#19B99A]/30 text-xs text-emerald-300 font-medium">
                    Optimized for iPadOS multi-window and Apple Pencil gesture adjustments.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. MOBILE IPHONE 16 PRO VIEWPORT */}
          {activeDevice === 'mobile' && (
            <motion.div
              key="mobile"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xs rounded-[44px] bg-[#101C2D] border-8 border-slate-800 shadow-2xl p-4 text-left relative overflow-hidden"
            >
              {/* Dynamic Island */}
              <div className="w-28 h-6 bg-black rounded-full mx-auto mb-4 flex items-center justify-between px-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[9px] font-mono text-emerald-400">SQLite</span>
              </div>

              {/* Mobile Dashboard */}
              <div className="space-y-3.5">
                <div className="text-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Net Worth
                  </span>
                  <div className="text-2xl font-black text-white font-mono tabular-nums">
                    {formatCurrency(netWorthBase, currency)}
                  </div>
                </div>

                {/* Quick Glance Card */}
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    Daily Safe Spend
                  </span>
                  <div className="text-lg font-bold text-[#19B99A] font-mono">
                    {formatCurrency(dailyBurnAllowed, currency)}
                  </div>
                  <span className="text-[9px] text-slate-400">
                    Guilt-free remaining today
                  </span>
                </div>

                {/* Mobile Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={handleAddMockExpense}
                    className="p-2.5 rounded-xl bg-[#07856D] hover:bg-[#066c59] text-white font-bold flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-slate-200 font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#19B99A]" />
                    <span>Voice AI</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5 text-[11px]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Recent Pocket Ledger
                  </span>
                  <div className="flex justify-between font-medium">
                    <span>Groceries</span>
                    <span className="font-mono text-white">-{formatCurrency(2850, currency)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Fiber Net</span>
                    <span className="font-mono text-white">-{formatCurrency(1499, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-4" />
            </motion.div>
          )}

          {/* 4. APPLE WATCH ULTRA VIEWPORT */}
          {activeDevice === 'watch' && (
            <motion.div
              key="watch"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[280px] rounded-[52px] bg-[#0A101D] border-8 border-slate-700 shadow-2xl p-5 text-center relative overflow-hidden"
            >
              {/* Digital Crown & Button Simulation */}
              <div className="absolute -right-2.5 top-12 w-2 h-10 bg-slate-600 rounded-r-md" />
              <div className="absolute -right-2.5 top-28 w-2 h-6 bg-slate-600 rounded-r-md" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 px-1">
                  <span>OCTOPUS</span>
                  <span>10:09</span>
                </div>

                {/* Watch Activity Rings / Circular Metric */}
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      stroke="#19B99A"
                      strokeWidth="10"
                      strokeDasharray="314"
                      strokeDashoffset="80"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-slate-400 font-mono">TODAY</span>
                    <span className="text-base font-extrabold font-mono text-white">
                      {formatCurrency(dailyBurnAllowed, currency)}
                    </span>
                    <span className="text-[9px] text-[#19B99A] font-bold">LEFT</span>
                  </div>
                </div>

                {/* Complications */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="p-1.5 rounded-lg bg-white/10 font-mono">
                    <span className="text-slate-400 block text-[8px]">RUNWAY</span>
                    <span className="font-bold text-white">6.4 MO</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/10 font-mono">
                    <span className="text-slate-400 block text-[8px]">NEXT BILL</span>
                    <span className="font-bold text-amber-300">3 DAYS</span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 font-mono">
                  Instant offline haptic glance
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. SPATIAL 3D PERSPECTIVE VIEW (ALL 4 DEVICES) */}
          {activeDevice === 'all' && (
            <motion.div
              key="all"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
            >
              {/* Desktop Mini Card */}
              <div className="p-4 rounded-2xl bg-[#101C2D] border border-white/15 text-left space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Monitor className="w-4 h-4 text-[#19B99A]" />
                  <span>Desktop Workspace</span>
                </div>
                <div className="text-sm font-black font-mono text-white">
                  {formatCurrency(netWorthBase, currency)}
                </div>
                <p className="text-[11px] text-slate-400">
                  Full statement OCR, ledger categorization & deep reports.
                </p>
              </div>

              {/* Tablet Mini Card */}
              <div className="p-4 rounded-2xl bg-[#101C2D] border border-white/15 text-left space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Tablet className="w-4 h-4 text-[#19B99A]" />
                  <span>iPad Tablet</span>
                </div>
                <div className="text-sm font-black font-mono text-white">
                  Touch Envelopes
                </div>
                <p className="text-[11px] text-slate-400">
                  Tactile budget allocations, drag-and-drop cashflow envelopes.
                </p>
              </div>

              {/* Mobile Mini Card */}
              <div className="p-4 rounded-2xl bg-[#101C2D] border border-white/15 text-left space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Smartphone className="w-4 h-4 text-[#19B99A]" />
                  <span>iPhone Mobile</span>
                </div>
                <div className="text-sm font-black font-mono text-white">
                  Instant Capture
                </div>
                <p className="text-[11px] text-slate-400">
                  Record transactions in 1.2s offline with zero cloud lag.
                </p>
              </div>

              {/* Watch Mini Card */}
              <div className="p-4 rounded-2xl bg-[#101C2D] border border-white/15 text-left space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Watch className="w-4 h-4 text-[#19B99A]" />
                  <span>Apple Watch</span>
                </div>
                <div className="text-sm font-black font-mono text-white">
                  {formatCurrency(dailyBurnAllowed, currency)}/day
                </div>
                <p className="text-[11px] text-slate-400">
                  Live wrist glance complications & tactile budget pacing.
                </p>
              </div>
            </motion.div>
          )}

        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#07856D]/20 via-black/40 to-[#19B99A]/20 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-white">
              Ready to experience true multi-device financial sovereignty?
            </h4>
            <p className="text-xs text-slate-300">
              Join the private preview waitlist to receive macOS, iOS, iPadOS, and watchOS test builds.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenEarlyAccess}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#26D07C] to-[#19B99A] hover:opacity-95 text-[#0A101D] font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#26D07C]/20 transition-all shrink-0"
          >
            <span>Request Device Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
