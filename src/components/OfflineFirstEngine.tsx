/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, formatCurrency, createLocalLedgerTransaction, LocalLedgerItem } from '../utils/finance';
import { 
  WifiOff, 
  Wifi, 
  Sparkles, 
  HardDrive, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Lock, 
  ShieldCheck, 
  Cloud, 
  Plus, 
  Smartphone, 
  Laptop
} from 'lucide-react';

interface OfflineFirstEngineProps {
  currency: Currency;
}

export const OfflineFirstEngine: React.FC<OfflineFirstEngineProps> = ({ currency }) => {
  const [activeState, setActiveState] = useState<'offline' | 'connected' | 'ai'>('offline');
  const [isSimulatedOnline, setIsSimulatedOnline] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed'>('idle');

  // Simulated live transactions
  const [transactions, setTransactions] = useState<LocalLedgerItem[]>([
    {
      id: 'tx_init_1',
      title: 'Metro Commute Card Reload',
      amount: 500,
      type: 'expense',
      category: 'Transit',
      account: 'Cash Wallet',
      timestamp: Date.now() - 3600000,
      syncState: 'local_only',
    },
    {
      id: 'tx_init_2',
      title: 'Farmer Market Vegetables',
      amount: 680,
      type: 'expense',
      category: 'Groceries',
      account: 'HDFC Savings',
      timestamp: Date.now() - 7200000,
      syncState: 'local_only',
    },
  ]);

  const handleAddOfflineTransaction = () => {
    const merchants = [
      { name: 'Pharmacy Medicine Refill', amt: 420, cat: 'Health' },
      { name: 'Chai & Snacks', amt: 90, cat: 'Food' },
      { name: 'Auto Rickshaw UPI', amt: 140, cat: 'Transit' },
      { name: 'Bookstore Purchase', amt: 850, cat: 'Education' },
    ];
    const item = merchants[Math.floor(Math.random() * merchants.length)];
    const newTx = createLocalLedgerTransaction(item.name, item.amt, item.cat, 'Offline Cash', isSimulatedOnline);
    setTransactions([newTx, ...transactions]);
  };

  const handleSimulateSync = () => {
    if (!isSimulatedOnline) {
      setIsSimulatedOnline(true);
    }
    setSyncStatus('syncing');
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((tx) => ({ ...tx, syncState: 'synced_cloud' }))
      );
      setSyncStatus('completed');
    }, 1200);
  };

  return (
    <section id="offline-engine" className="py-24 bg-[#101C2D] text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 -left-48 w-96 h-96 bg-[#07856D]/30 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-0 w-96 h-96 bg-[#19B99A]/20 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#19B99A]">
            <HardDrive className="w-4 h-4" />
            <span>Architecture & Data Sovereignty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your money works offline. Your financial picture grows when you’re connected.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Manage your core financial records locally, then synchronise supported data when a connection is available. Use connected services for features that require them.
          </p>
        </div>

        {/* 3-State Interactive Mode Selector */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {[
            {
              id: 'offline',
              label: 'State A · Offline Mode',
              icon: WifiOff,
              subtitle: 'Local SQLite & WatermelonDB',
            },
            {
              id: 'connected',
              label: 'State B · Connected Sync',
              icon: Wifi,
              subtitle: 'Encrypted Multi-Device Delta',
            },
            {
              id: 'ai',
              label: 'State C · Financial Insights',
              icon: Sparkles,
              subtitle: 'Cloud AI Copilot (Opt-In)',
            },
          ].map((mode) => {
            const Icon = mode.icon;
            const isCurrent = activeState === mode.id;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveState(mode.id as any);
                  if (mode.id === 'offline') setIsSimulatedOnline(false);
                  if (mode.id === 'connected') setIsSimulatedOnline(true);
                }}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-[#19B99A]/20 border-[#19B99A] text-white ring-1 ring-[#19B99A]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className={`p-2 rounded-lg ${isCurrent ? 'bg-[#19B99A] text-[#101C2D]' : 'bg-white/10 text-white'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">{mode.label}</div>
                  <div className="text-[10px] text-slate-400">{mode.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Central Interactive Demonstration Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual Display (Phone/Desktop Canvas) */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-between">
            
            {/* Top Bar of Demonstration */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#19B99A]" />
                  <span className="text-xs font-bold text-white">Your Primary Device</span>
                </div>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-[11px] font-mono text-slate-400">Database: /app/local.sqlite</span>
              </div>

              {/* Live Connectivity Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    isSimulatedOnline
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSimulatedOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {isSimulatedOnline ? 'ONLINE (Sync Active)' : 'OFFLINE (Zero Connection)'}
                </span>
              </div>
            </div>

            {/* Central Animated Scene */}
            <div className="py-8">
              
              {/* State A: Offline View */}
              {activeState === 'offline' && (
                <div className="space-y-6 text-left">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#19B99A] uppercase tracking-wider">
                        Local Ledger State (Isolated)
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Zero Network Latency</span>
                    </div>
                    <p className="text-sm text-slate-200">
                      Even in flight mode, underground metro tunnels, or remote zones with zero cell service, your full financial history, account ledger, and budget calculations function instantly.
                    </p>
                  </div>

                  {/* Live Transaction Ledger inside Device */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Simulated Local SQLite Table:</span>
                      <span>{transactions.length} records in cache</span>
                    </div>

                    <div className="space-y-2">
                      {transactions.slice(0, 3).map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div>
                              <div className="font-semibold text-white">{tx.title}</div>
                              <div className="text-[10px] text-slate-400">
                                {tx.category} · {tx.account} · Status: <span className="text-amber-400 font-mono font-bold">{tx.syncState}</span>
                              </div>
                            </div>
                          </div>
                          <div className="tabular-nums font-bold text-white">
                            {formatCurrency(-tx.amount, currency)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Your core financial records remain available offline.</span>
                  </div>
                </div>
              )}

              {/* State B: Connected Sync View */}
              {activeState === 'connected' && (
                <div className="space-y-6 text-left">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#19B99A] uppercase tracking-wider">
                        Delta Synchronisation & Conflict Resolution
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono">TLS 1.3 + E2EE</span>
                    </div>
                    <p className="text-sm text-slate-200">
                      When internet connectivity resumes, Octopus initiates differential sync. High-watermark timestamps resolve any edits made across devices without overwriting newer records.
                    </p>
                  </div>

                  {/* Device-to-Device Sync Visualizer */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="p-3 bg-white/10 rounded-lg text-center space-y-1">
                      <Smartphone className="w-5 h-5 text-[#19B99A] mx-auto" />
                      <div className="text-xs font-bold text-white">Mobile Device</div>
                      <div className="text-[10px] text-slate-400">2 local edits</div>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#19B99A]">
                        <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                        <span>{syncStatus === 'syncing' ? 'Replicating...' : 'Sync Active'}</span>
                      </div>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-[#19B99A] transition-all duration-700 ${
                            syncStatus === 'completed' ? 'w-full' : syncStatus === 'syncing' ? 'w-2/3' : 'w-1/3'
                          }`} 
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-white/10 rounded-lg text-center space-y-1">
                      <Laptop className="w-5 h-5 text-emerald-400 mx-auto" />
                      <div className="text-xs font-bold text-white">Laptop Applet</div>
                      <div className="text-[10px] text-slate-400">Mirror Synced</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-500/30 text-xs text-teal-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Synchronise supported records when you’re online.</span>
                  </div>
                </div>
              )}

              {/* State C: AI Copilot Cloud View */}
              {activeState === 'ai' && (
                <div className="space-y-6 text-left">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#19B99A] uppercase tracking-wider">
                        Opt-In Cloud Intelligence
                      </span>
                      <span className="text-[11px] text-amber-400 font-mono">Requires Internet</span>
                    </div>
                    <p className="text-sm text-slate-200">
                      AI is not forced into every view. When you invoke Copilot, only relevant summarized metrics (never unencrypted banking passwords) are sent securely to the AI model to synthesize guidance.
                    </p>
                  </div>

                  {/* AI Interaction Simulation */}
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-[#19B99A]/40 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#19B99A]">
                      <Sparkles className="w-4 h-4" />
                      <span>Copilot Query Execution</span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono bg-black/30 p-2.5 rounded">
                      &gt; Calculating: Discretionary spend trend across Q3 vs Q4...
                    </div>
                    <div className="text-xs text-white leading-relaxed">
                      "Your discretionary spending increased by 9.2% in September, primarily from food delivery and festive travel tickets. Your ₹15,000 festival sinking fund absorbed the surge safely."
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Use cloud-powered AI when you want help understanding your finances.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Interactive Playground Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddOfflineTransaction}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors border border-white/15"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Log Offline Entry (+1)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSimulatedOnline(!isSimulatedOnline)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                >
                  {isSimulatedOnline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isSimulatedOnline ? 'Simulate Disconnect' : 'Simulate Reconnect'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSimulateSync}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#101C2D] bg-[#19B99A] hover:bg-[#159e84] rounded-lg transition-colors shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Trigger Delta Sync</span>
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Highlights */}
          <div className="lg:col-span-4 space-y-4 text-left">
            
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#19B99A]">
                <Database className="w-4 h-4" />
                <span>WatermelonDB + SQLite Core</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Records live in binary SQLite tables on your device storage. Reading 10,000 transactions takes under 15 milliseconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#19B99A]">
                <Lock className="w-4 h-4" />
                <span>No Third-Party Bank Logins</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Octopus does not require you to provide your net banking username or OTP. Maintain entries manually or import your encrypted bank statements locally.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#19B99A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Honest Boundaries</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We make no false claims that large LLM models execute on-device. Copilot runs in the cloud; your raw ledger stays on your phone.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
