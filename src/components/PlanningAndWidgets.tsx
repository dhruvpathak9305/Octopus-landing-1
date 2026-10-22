/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, formatCurrency, calculateEmergencyRunway } from '../utils/finance';
import { 
  Compass, 
  ShieldAlert, 
  Smartphone, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Mic, 
  Users, 
  Plane, 
  Sliders, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface PlanningAndWidgetsProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
}

export const PlanningAndWidgets: React.FC<PlanningAndWidgetsProps> = ({
  currency,
  onOpenEarlyAccess,
}) => {
  // Interactive Runway Simulator
  const [savingsBuffer, setSavingsBuffer] = useState<number>(270000);
  const [monthlyBurn, setMonthlyBurn] = useState<number>(45000);

  const runwayData = calculateEmergencyRunway(savingsBuffer, monthlyBurn);

  const roadmapItems = [
    {
      title: 'Voice-Based Quick Capture',
      status: 'Beta Roadmap',
      desc: 'Dictate cash spending hands-free ("Log 180 for auto rickshaw") with local transcription.',
      icon: Mic,
    },
    {
      title: 'Mobile Home-Screen Widgets',
      status: 'In Beta Development',
      desc: 'Glanceable iOS and Android lock-screen and home widgets showing budget remaining and due bills.',
      icon: Smartphone,
    },
    {
      title: 'Expanded Family Financial Visibility',
      status: 'Roadmap',
      desc: 'Granular permissions to share selective household envelopes while preserving individual privacy.',
      icon: Users,
    },
    {
      title: 'Major Purchase Decision Rules',
      status: 'Roadmap',
      desc: 'Algorithmic 30-day cooling off timers and opportunity cost calculators for large expenses.',
      icon: Sliders,
    },
    {
      title: 'Travel & Multi-Currency Stacks',
      status: 'Roadmap',
      desc: 'Dedicated offline trip ledgers with automatic forex conversion without roaming data.',
      icon: Plane,
    },
  ];

  return (
    <section className="py-24 bg-[#F7F8F4] border-b border-[#E1E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <Compass className="w-4 h-4 text-[#07856D]" />
            <span>Forward Financial Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            Your money today. Your choices tomorrow.
          </h2>
          <p className="text-base sm:text-lg text-[#637184] leading-relaxed">
            Move beyond retrospective record-keeping. Calculate your true freedom runway and preview upcoming awareness tools.
          </p>
        </div>

        {/* 2-Column Split: Active Runway Calculator on Left, Mobile Home-Screen Widget on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Left Column: Interactive Runway & Safety Net Calculator */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E1E8E4] p-6 lg:p-8 flex flex-col justify-between text-left shadow-xs">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E1E8E4]">
                <div>
                  <h3 className="text-lg font-bold text-[#101C2D]">
                    Verified Capability · Emergency Freedom Runway
                  </h3>
                  <p className="text-xs text-[#637184]">
                    How many months can you survive if income stops tomorrow?
                  </p>
                </div>
                <span className="text-xs font-bold text-[#07856D] bg-[#E2F5ED] px-2.5 py-1 rounded-md">
                  Active in App
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#637184]">
                    <span>Liquid Savings & Fixed Deposits:</span>
                    <strong className="text-[#101C2D] tabular-nums font-bold text-sm">{formatCurrency(savingsBuffer, currency)}</strong>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="10000"
                    value={savingsBuffer}
                    onChange={(e) => setSavingsBuffer(Number(e.target.value))}
                    className="w-full accent-[#07856D]"
                    aria-label="Liquid savings slider"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#637184]">
                    <span>Mandatory Monthly Living Costs (Rent + Food + Bills):</span>
                    <strong className="text-[#101C2D] tabular-nums font-bold text-sm">{formatCurrency(monthlyBurn, currency)}/mo</strong>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="150000"
                    step="5000"
                    value={monthlyBurn}
                    onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                    className="w-full accent-[#07856D]"
                    aria-label="Monthly burn slider"
                  />
                </div>
              </div>

              {/* Dynamic Result Box */}
              <div className="p-5 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white rounded-lg border border-[#E1E8E4]">
                  <span className="text-[10px] uppercase font-bold text-[#637184]">Runway Months</span>
                  <div className="text-3xl font-black text-[#07856D] mt-1 tabular-nums">
                    {runwayData.runwayMonths}
                  </div>
                  <span className="text-[10px] text-[#07856D] font-semibold">
                    {runwayData.status === 'exceptional' ? 'Robust Safety' : runwayData.status === 'healthy' ? 'Adequate Buffer' : 'Rebuilding Recommended'}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E1E8E4] sm:col-span-2 text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#637184]">6-Month Target Buffer</span>
                  <div className="text-xl font-bold text-[#101C2D] tabular-nums">
                    {formatCurrency(runwayData.recommendedSavings, currency)}
                  </div>
                  <p className="text-[11px] text-[#637184] leading-tight">
                    {savingsBuffer >= runwayData.recommendedSavings 
                      ? 'You have surpassed the recommended 6-month buffer. Excess cash can be safely deployed to long-term equity SIPs.'
                      : `You need ${formatCurrency(runwayData.recommendedSavings - savingsBuffer, currency)} more to reach gold standard 6-month resilience.`}
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#E1E8E4] flex items-center justify-between text-xs text-[#637184]">
              <span>Real-time recalculation using local ledger</span>
              <button
                type="button"
                onClick={onOpenEarlyAccess}
                className="font-bold text-[#07856D] hover:underline flex items-center gap-1"
              >
                <span>Setup Your Safety Buffer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* Right Column: Mobile Home-Screen Widget Preview */}
          <div className="lg:col-span-5 bg-[#101C2D] text-white rounded-2xl border border-white/10 p-6 lg:p-8 flex flex-col justify-between text-left shadow-xl relative overflow-hidden">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-[#19B99A] uppercase tracking-wider">
                  Mobile Widgets & Awareness
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                  Coming Soon (In Beta)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The important numbers, when you need them. Glance at your budget and upcoming bills directly on your phone home-screen without launching the app.
              </p>

              {/* Realistic Phone Bezel Widget Simulation */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-white/15 space-y-3 max-w-sm mx-auto shadow-lg">
                
                {/* 2x2 Budget Glance Widget */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-white">October Budget</span>
                    <span className="tabular-nums font-semibold text-[#19B99A]">72% Spent</span>
                  </div>
                  <div className="text-xl font-black text-white tabular-nums">
                    {formatCurrency(26760, currency)}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Safe to spend: <strong className="text-white tabular-nums">{formatCurrency(955, currency)}/day</strong>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#19B99A] h-full" style={{ width: '72%' }} />
                  </div>
                </div>

                {/* Upcoming Bill Countdown Widget */}
                <div className="p-3.5 rounded-xl bg-slate-800/90 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Tata Power Bill</div>
                      <div className="text-[10px] text-slate-400">Due in 3 days</div>
                    </div>
                  </div>
                  <div className="tabular-nums font-bold text-amber-400">
                    {formatCurrency(3420, currency)}
                  </div>
                </div>

              </div>
            </div>

            <span className="text-[10px] text-slate-400 pt-3 block text-center">
              Widgets operate natively in iOS WidgetKit and Android Glance using cached local SQLite data.
            </span>

          </div>

        </div>

        {/* Roadmap & Verified Capability Grid */}
        <div className="text-left space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#101C2D]">
              Honest Roadmap: What is Live vs What Comes Next
            </h3>
            <span className="text-xs text-[#637184]">
              We clearly distinguish verified features from works in progress.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmapItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-white border border-[#E1E8E4] space-y-2 hover:border-[#07856D]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-[#F7F8F4] text-[#07856D]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.status}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-[#101C2D]">{item.title}</div>
                  <p className="text-xs text-[#637184] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
