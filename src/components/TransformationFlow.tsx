/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, formatCurrency } from '../utils/finance';
import { 
  FileSpreadsheet, 
  Tag, 
  PieChart, 
  Sparkles, 
  ArrowRight, 
  Upload, 
  Check, 
  ShieldCheck, 
  TrendingUp, 
  Wallet,
  ArrowUpRight
} from 'lucide-react';

interface TransformationFlowProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
}

export const TransformationFlow: React.FC<TransformationFlowProps> = ({
  currency,
  onOpenEarlyAccess,
}) => {
  const [currentStage, setCurrentStage] = useState<number>(1);

  const stages = [
    {
      step: 1,
      title: 'Bring records together',
      subtitle: 'Manual entry & statement import',
      description: 'Record cash transactions instantly on your phone or drop in supported bank statements (PDF/CSV from HDFC, ICICI, SBI, Axis). The records stay in your local SQLite store without exposing bank credentials.',
      icon: FileSpreadsheet,
    },
    {
      step: 2,
      title: 'Organise the information',
      subtitle: 'Automated ledger categorization',
      description: 'Transactions are automatically tagged into standardized financial categories with merchant normalization and recurring subscription detection. You maintain full override control.',
      icon: Tag,
    },
    {
      step: 3,
      title: 'Understand the overall picture',
      subtitle: 'Holistic budget & net worth synthesis',
      description: 'Your cashflow, debt obligations, category caps, and net worth coalesce into a real-time picture of your actual financial standing—recalculated on-device without lag.',
      icon: PieChart,
    },
    {
      step: 4,
      title: 'Explore insights & next steps',
      subtitle: 'Contextual AI analysis & planning',
      description: 'Use the optional cloud-powered Copilot to query your finances in natural language. Identify seasonal leaks, calculate purchase safety, and test what comes next.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="product" className="py-24 bg-[#F7F8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#07856D]" />
            <span>The Product Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            From scattered financial records to a clearer picture.
          </h2>
          <p className="text-base sm:text-lg text-[#637184] leading-relaxed">
            Witness how raw transactions and isolated statements transform into structured intelligence, complete visibility, and confident next moves.
          </p>
        </div>

        {/* 4-Step Interactive Switcher & Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Stages list */}
          <div className="lg:col-span-5 space-y-3">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = currentStage === stage.step;

              return (
                <div
                  key={stage.step}
                  onClick={() => setCurrentStage(stage.step)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#07856D] shadow-md ring-1 ring-[#07856D]'
                      : 'bg-white/60 border-[#E1E8E4] hover:bg-white hover:border-[#19B99A]/50'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setCurrentStage(stage.step);
                    }
                  }}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                        isActive
                          ? 'bg-[#07856D] text-white'
                          : 'bg-[#E1E8E4] text-[#637184]'
                      }`}
                    >
                      {stage.step}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#101C2D]">
                          {stage.title}
                        </h3>
                        {isActive && (
                          <span className="text-[10px] font-semibold text-[#07856D] bg-[#E2F5ED] px-2 py-0.5 rounded-full">
                            Active Stage
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-[#07856D]">
                        {stage.subtitle}
                      </div>
                      <p className="text-xs text-[#637184] leading-relaxed pt-1">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Evolving Interface Canvas */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E1E8E4] shadow-xl overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {/* Header of Canvas */}
              <div className="px-6 py-4 bg-[#101C2D] text-white flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#19B99A]" />
                  <span className="text-xs font-mono font-medium text-slate-200">
                    STAGE {currentStage} OF 4 · {stages[currentStage - 1].title.toUpperCase()}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#19B99A]">
                  WatermelonDB SQLite
                </span>
              </div>

              {/* Dynamic View for each Stage */}
              <div className="p-6 flex-1 text-left">
                
                {/* Stage 1: Raw Record Capture & Bank Statement */}
                {currentStage === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div className="p-4 bg-[#F7F8F4] rounded-xl border border-dashed border-[#07856D]/40 text-center space-y-2">
                      <Upload className="w-6 h-6 text-[#07856D] mx-auto" />
                      <div className="text-xs font-bold text-[#101C2D]">
                        Local Bank Statement Parser & Manual Entry
                      </div>
                      <p className="text-[11px] text-[#637184] max-w-md mx-auto">
                        Drop in e-statements (PDF/CSV). Parsing runs 100% locally in your browser/device using regex parsers. No financial credentials are required or stored.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#637184]">
                        Incoming Raw Records (Unprocessed Queue)
                      </span>
                      {[
                        { raw: 'UPI/239012938/BLINKIT GURGAON', amt: 642, time: '10:14 AM' },
                        { raw: 'NEFT CR*SALARY*TECH CORP LTD', amt: 125000, time: 'Yesterday' },
                        { raw: 'POS/SHELL PETROL PUMP/PUNE', amt: 2200, time: '21 Oct' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#F7F8F4] border border-[#E1E8E4] font-mono text-xs">
                          <span className="text-[#101C2D] truncate pr-2">{item.raw}</span>
                          <span className="font-bold text-[#07856D] shrink-0">
                            {formatCurrency(item.amt, currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 2: Categorised Ledger */}
                {currentStage === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#637184]">
                        Normalized Financial Ledger
                      </span>
                      <span className="text-xs text-[#07856D] font-bold">100% Rules Matched</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { merchant: 'Blinkit Quick Commerce', cat: 'Groceries & Staples', sub: 'Essential Need', amt: -642, tagColor: 'bg-emerald-100 text-emerald-800' },
                        { merchant: 'Tech Corp Salary Credit', cat: 'Primary Income', sub: 'Fixed Revenue', amt: 125000, tagColor: 'bg-teal-100 text-teal-800' },
                        { merchant: 'Shell Fuel Station', cat: 'Transportation', sub: 'Commute Need', amt: -2200, tagColor: 'bg-slate-100 text-slate-800' },
                        { merchant: 'Netflix Subscription', cat: 'Entertainment', sub: 'Discretionary Want', amt: -649, tagColor: 'bg-amber-100 text-amber-800' },
                      ].map((item, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] flex items-center justify-between text-xs">
                          <div className="space-y-0.5">
                            <div className="font-bold text-[#101C2D]">{item.merchant}</div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${item.tagColor}`}>
                                {item.cat}
                              </span>
                              <span className="text-[10px] text-[#637184]">{item.sub}</span>
                            </div>
                          </div>
                          <div className={`tabular-nums font-bold text-sm ${item.amt > 0 ? 'text-[#07856D]' : 'text-[#101C2D]'}`}>
                            {item.amt > 0 ? '+' : ''}{formatCurrency(item.amt, currency)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 3: Holistic Synthesis */}
                {currentStage === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-[#E2F5ED] border border-[#19B99A]/30">
                        <span className="text-xs font-semibold text-[#07856D]">Total Net Worth</span>
                        <div className="text-2xl font-extrabold text-[#07856D] mt-1">
                          {formatCurrency(2485420, currency)}
                        </div>
                        <span className="text-[10px] text-[#07856D]">Liquid: {formatCurrency(412800, currency)}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4]">
                        <span className="text-xs font-semibold text-[#637184]">Monthly Budget Spend</span>
                        <div className="text-2xl font-extrabold text-[#101C2D] mt-1">
                          72%
                        </div>
                        <span className="text-[10px] text-[#637184]">Remaining: {formatCurrency(26760, currency)}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#E1E8E4] space-y-3">
                      <div className="text-xs font-bold text-[#101C2D]">Active Budget Guardrail: 50 / 30 / 20</div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-[#637184]">Essentials (Needs)</span>
                            <span className="font-bold text-[#101C2D]">{formatCurrency(44200, currency)} / 50%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#07856D] h-full" style={{ width: '48%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-[#637184]">Lifestyle (Wants)</span>
                            <span className="font-bold text-[#101C2D]">{formatCurrency(24040, currency)} / 30%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#19B99A] h-full" style={{ width: '28%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 4: AI Copilot Exploration */}
                {currentStage === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-[#101C2D] text-white space-y-3 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#19B99A]" />
                          <span className="text-xs font-bold text-[#19B99A]">Octopus Copilot · Connected Session</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">Ephemeral Context</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white/10 text-xs text-slate-200">
                        <span className="text-[#19B99A] font-semibold">User:</span> "Can I safely put ₹50,000 into a fixed deposit today without affecting my upcoming bills?"
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
                        <span className="text-white font-semibold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copilot Analysis:
                        </span>
                        <p className="leading-relaxed">
                          Yes, but allocate a maximum of <strong className="text-white">{formatCurrency(42000, currency)}</strong>. You have <strong className="text-amber-400">{formatCurrency(35420, currency)}</strong> in confirmed obligations (Tata Power, Rent, Health Insurance) due within the next 12 days. Keeping ₹20,000 liquid buffer prevents CC rollover interest.
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={onOpenEarlyAccess}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#07856D] hover:bg-[#066c59] rounded-lg shadow-sm"
                      >
                        <span>Test Copilot in Early Access</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Step Navigator Bar */}
              <div className="px-6 py-3 bg-[#F7F8F4] border-t border-[#E1E8E4] flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentStage === 1}
                  onClick={() => setCurrentStage((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 text-xs font-semibold rounded text-[#637184] hover:text-[#101C2D] disabled:opacity-40"
                >
                  ← Previous Step
                </button>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => setCurrentStage(s)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentStage === s ? 'w-6 bg-[#07856D]' : 'bg-[#E1E8E4]'
                      }`}
                      aria-label={`Jump to stage ${s}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentStage === 4}
                  onClick={() => setCurrentStage((prev) => Math.min(4, prev + 1))}
                  className="px-3 py-1 text-xs font-semibold rounded text-[#07856D] hover:text-[#066c59] disabled:opacity-40"
                >
                  Next Step →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
