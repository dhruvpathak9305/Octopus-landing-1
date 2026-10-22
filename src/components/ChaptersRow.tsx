/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, formatCurrency } from '../utils/finance';
import { Play, ArrowRight, ChevronRight, HardDrive, Sliders, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface ChaptersRowProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  bgGradient: string;
  accentColor: string;
  icon: React.ElementType;
  demoHighlights: string[];
}

export const ChaptersRow: React.FC<ChaptersRowProps> = ({
  currency,
  onOpenEarlyAccess,
}) => {
  const [activePreviewChapter, setActivePreviewChapter] = useState<Chapter | null>(null);

  const chapters: Chapter[] = [
    {
      id: 'chapter-1',
      number: '01',
      kicker: 'THE SOVEREIGN VAULT',
      title: 'Local-First Financial Ledger',
      tagline: 'Runs offline. Encrypted on your device. Zero cloud dependency.',
      description: 'Your money records live in a lightning-fast local SQLite database with WatermelonDB. Log transactions on a flight, in a subway tunnel, or off-grid. Instantaneous reads under 15ms.',
      bgGradient: 'from-[#101C2D] via-[#0d2a2a] to-[#07856D]',
      accentColor: '#19B99A',
      icon: HardDrive,
      demoHighlights: [
        'Local SQLite tables with zero server latency',
        'Optional encrypted delta synchronisation',
        'No third-party bank screen-scraping required',
      ],
    },
    {
      id: 'chapter-2',
      number: '02',
      kicker: 'THE ADAPTIVE HORIZON',
      title: 'Strategy-Agnostic Budgeting',
      tagline: '50/30/20, Zero-Based, or Envelopes. Built for real lives.',
      description: 'No rigid, one-size-fits-all dogmas. Switch between proven financial strategies with a single slider. Calculate your emergency freedom runway and keep bills ahead of schedule.',
      bgGradient: 'from-[#101C2D] via-[#1a2f26] to-[#07856D]',
      accentColor: '#07856D',
      icon: Sliders,
      demoHighlights: [
        'Real-time take-home income distribution slider',
        'Upcoming bill radar with payday clash warnings',
        'Pre-purchase headroom simulation before you spend',
      ],
    },
    {
      id: 'chapter-3',
      number: '03',
      kicker: 'THE COPILOT LENS',
      title: 'Contextual Financial AI',
      tagline: 'Ask plain-English questions. Get calculated mathematical truth.',
      description: 'Powered by cloud Gemini AI when you invoke it. Copilot explores spending trends, lifestyle leaks, and affordability questions without ever using your data to train public models.',
      bgGradient: 'from-[#101C2D] via-[#17253b] to-[#19B99A]',
      accentColor: '#C79B48',
      icon: Sparkles,
      demoHighlights: [
        'Grounded answers using real local ledger math',
        'Ephemeral query context with strict privacy boundary',
        'No hallucinated investments or reckless guarantees',
      ],
    },
  ];

  return (
    <section id="chapters" className="py-20 bg-[#F7F8F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapters Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#07856D] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#07856D]" />
              <span>System Core Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C2D] tracking-tight">
              Chapters of Financial Freedom
            </h2>
          </div>

          <a
            href="#product"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#07856D] hover:text-[#066c59] transition-colors"
          >
            <span>explore all system modules</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 3 Large Cinematic Chapter Cards (Meadowbell Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chapters.map((ch) => {
            const Icon = ch.icon;

            return (
              <div
                key={ch.id}
                onClick={() => setActivePreviewChapter(ch)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#101C2D] text-white p-7 flex flex-col justify-between min-h-[380px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/10 hover:border-[#19B99A]/40"
              >
                {/* Background Subtle Gradient Glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${ch.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} 
                />

                {/* Subtle Grid Accent */}
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-32 h-32" />
                </div>

                {/* Top Chapter Metadata */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#19B99A] bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      CHAPTER {ch.number}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-white/10 group-hover:bg-[#19B99A] group-hover:text-[#101C2D] transition-colors duration-200">
                      <Icon className="w-4 h-4 text-white group-hover:text-[#101C2D]" />
                    </div>
                  </div>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#19B99A]">
                    {ch.kicker}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight group-hover:text-[#19B99A] transition-colors">
                    {ch.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {ch.tagline}
                  </p>
                </div>

                {/* Bottom Interactive Play / Preview Trigger */}
                <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/10">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#19B99A] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white text-[#101C2D] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span>Inspect Chapter</span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">
                    Tap to view →
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Chapter Deep Dive Modal */}
      {activePreviewChapter && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#101C2D] text-white rounded-3xl border border-white/15 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => setActivePreviewChapter(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close chapter modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#19B99A]">
                CHAPTER {activePreviewChapter.number} · {activePreviewChapter.kicker}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activePreviewChapter.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activePreviewChapter.description}
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#19B99A]">
                Key Architectural Highlights:
              </span>
              {activePreviewChapter.demoHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#19B99A] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setActivePreviewChapter(null);
                  onOpenEarlyAccess();
                }}
                className="w-full py-3 px-5 rounded-full bg-[#07856D] hover:bg-[#066c59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Reserve Early Access Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
