/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, formatCurrency } from '../utils/finance';
import { 
  Sparkles, 
  Send, 
  HelpCircle, 
  ShieldCheck, 
  Wifi, 
  CheckCircle2, 
  AlertCircle, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Clock,
  ArrowRight
} from 'lucide-react';

interface AICopilotSectionProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
  onOpenVoiceConversation?: () => void;
}

interface SampleQ {
  id: string;
  question: string;
  answerTitle: string;
  answerSummary: string;
  dataPoints: { label: string; value: string; positive?: boolean }[];
  cautions: string;
}

export const AICopilotSection: React.FC<AICopilotSectionProps> = ({
  currency,
  onOpenEarlyAccess,
  onOpenVoiceConversation,
}) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q1');
  const [customInput, setCustomInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sampleQuestions: SampleQ[] = [
    {
      id: 'q1',
      question: 'Where did my money go this month?',
      answerTitle: 'October Outflow Synthesis',
      answerSummary: `You have spent ${formatCurrency(68240, currency)} of your ${formatCurrency(95000, currency)} monthly ceiling. Housing and groceries comprise 68% of your outflows. Discretionary dining is 14% higher than September, but overall spending is pacing 4 days ahead of budget.`,
      dataPoints: [
        { label: 'Essential Needs', value: formatCurrency(44200, currency) },
        { label: 'Discretionary Wants', value: formatCurrency(24040, currency) },
        { label: 'Remaining Safe Buffer', value: formatCurrency(26760, currency), positive: true },
      ],
      cautions: 'Dining category exceeded its ₹10,000 target by ₹1,400 due to 3 weekend restaurant visits.',
    },
    {
      id: 'q2',
      question: 'How has my spending changed compared to last quarter?',
      answerTitle: 'Q3 vs Q4 Spending Trend',
      answerSummary: `Your monthly average dropped by 5.4% compared to Q3. The primary reduction was in transportation fuel (down ₹3,800/mo due to remote work days), while recurring software subscriptions increased by ₹649.`,
      dataPoints: [
        { label: 'Q3 Monthly Average', value: formatCurrency(72150, currency) },
        { label: 'October Current Run', value: formatCurrency(68240, currency), positive: true },
        { label: 'Net Savings Delta', value: `+${formatCurrency(3910, currency)}/mo`, positive: true },
      ],
      cautions: 'Annual car insurance premium is scheduled to hit in November (estimated ₹14,200).',
    },
    {
      id: 'q3',
      question: 'What bills are coming up in the next 10 days?',
      answerTitle: 'Upcoming Obligation Radar',
      answerSummary: `You have 2 committed obligations totaling ${formatCurrency(35420, currency)} before 31 October: Electricity (Tata Power) in 3 days and Apartment Rent & Maintenance in 8 days.`,
      dataPoints: [
        { label: 'Tata Power Electricity', value: formatCurrency(3420, currency) },
        { label: 'Apartment Rent & Maintenance', value: formatCurrency(32000, currency) },
        { label: 'Current Checking Balance', value: formatCurrency(84500, currency), positive: true },
      ],
      cautions: 'Checking account comfortably covers both bills without touching your emergency reserve.',
    },
    {
      id: 'q4',
      question: 'How much of my monthly budget remains for leisure?',
      answerTitle: 'Discretionary Leisure Headroom',
      answerSummary: `You have ${formatCurrency(8600, currency)} unallocated in your "Wants & Leisure" envelope for the remaining 9 days of October, which equates to roughly ${formatCurrency(955, currency)} per day.`,
      dataPoints: [
        { label: 'Original Leisure Budget', value: formatCurrency(20000, currency) },
        { label: 'Spent to Date', value: formatCurrency(11400, currency) },
        { label: 'Daily Allowed Burn', value: `${formatCurrency(955, currency)}/day`, positive: true },
      ],
      cautions: 'If you have plans for Diwali shopping, consider adjusting next week’s leisure envelope.',
    },
    {
      id: 'q5',
      question: 'Can I afford a ₹45,000 weekend trip right now?',
      answerTitle: 'Purchase Affordability Simulation',
      answerSummary: `Yes, you can afford it without taking on credit debt. However, funding it will reduce your liquid safety runway from 6.2 months to 5.2 months. It will not compromise any of your scheduled bills.`,
      dataPoints: [
        { label: 'Liquid Savings Before', value: formatCurrency(274000, currency) },
        { label: 'Liquid Savings After', value: formatCurrency(229000, currency) },
        { label: 'Runway Impact', value: '6.2 mo → 5.2 mo', positive: true },
      ],
      cautions: 'Recommendation: Pay via CC for reward points but settle balance before the 14-day grace period expires.',
    },
  ];

  const currentQ = sampleQuestions.find((q) => q.id === selectedQuestionId) || sampleQuestions[0];

  const handleSelectQuestion = (id: string) => {
    setIsTyping(true);
    setSelectedQuestionId(id);
    setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setCustomInput('');
    }, 600);
  };

  return (
    <section id="ai-copilot" className="py-24 bg-[#F7F8F4] border-b border-[#E1E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <Sparkles className="w-4 h-4 text-[#07856D]" />
            <span>Intelligent Financial Clarification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            Ask better questions about your finances.
          </h2>
          <p className="text-base sm:text-lg text-[#637184] leading-relaxed">
            Explore spending, budgets, and financial patterns with an AI assistant that uses the financial context available to it—grounded in your actual numbers, not generic advice.
          </p>
        </div>

        {/* 2-Column Layout: Ground Truth Ledger Metrics on Left, Interactive Chat on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Ground Truth Context Box */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E1E8E4] p-6 lg:p-8 flex flex-col justify-between text-left shadow-xs">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E1E8E4]">
                <span className="text-xs font-bold text-[#101C2D] uppercase tracking-wider">
                  Ground Truth Context
                </span>
                <span className="text-[10px] text-[#07856D] bg-[#E2F5ED] px-2 py-0.5 rounded font-mono font-semibold">
                  Local Ledger Sync
                </span>
              </div>
              <p className="text-xs text-[#637184] leading-relaxed">
                Copilot does not hallucinate answers. Every response is synthesized by analyzing these real, verified local records:
              </p>

              {/* Data Table */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] flex items-center justify-between">
                  <span className="text-[#637184]">Monthly Income (October):</span>
                  <span className="font-extrabold text-[#101C2D]">{formatCurrency(125000, currency)}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] flex items-center justify-between">
                  <span className="text-[#637184]">Total Month-to-Date Spend:</span>
                  <span className="font-extrabold text-[#101C2D]">{formatCurrency(68240, currency)}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] flex items-center justify-between">
                  <span className="text-[#637184]">Active Budget Ceiling:</span>
                  <span className="font-extrabold text-[#07856D]">{formatCurrency(95000, currency)}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] flex items-center justify-between">
                  <span className="text-[#637184]">Upcoming 10-Day Bills:</span>
                  <span className="font-extrabold text-amber-700">{formatCurrency(35420, currency)}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F8F4] border border-[#E1E8E4] flex items-center justify-between">
                  <span className="text-[#637184]">Liquid Savings & FDs:</span>
                  <span className="font-extrabold text-[#07856D]">{formatCurrency(274000, currency)}</span>
                </div>
              </div>
            </div>

            {/* Privacy Architecture Notice */}
            <div className="mt-6 pt-4 border-t border-[#E1E8E4] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07856D]">
                <ShieldCheck className="w-4 h-4 text-[#07856D]" />
                <span>Ephemerality & Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-[#637184] leading-relaxed">
                When you ask a question, summarized totals are sent via TLS 1.3 to Gemini AI. Queries are never used to train public models, and raw banking passwords are never transmitted.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Copilot Chat Window */}
          <div className="lg:col-span-7 bg-[#101C2D] text-white rounded-2xl border border-white/10 p-6 lg:p-8 flex flex-col justify-between text-left shadow-xl">
            
            <div className="space-y-6">
              
              {/* Top Bar of Copilot */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#19B99A] text-[#101C2D] flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Octopus Copilot</div>
                    <div className="text-[10px] text-slate-400">Contextual Financial Intelligence</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onOpenVoiceConversation && (
                    <button
                      type="button"
                      onClick={onOpenVoiceConversation}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-[#062016] bg-[#26D07C] hover:bg-[#19B99A] active:scale-95 rounded-lg shadow-sm transition-all"
                      title="Launch Gemini 3.8 Live Voice Mode"
                    >
                      <Sparkles className="w-3 h-3 text-[#062016]" />
                      <span>Live Voice Mode</span>
                    </button>
                  )}
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    <Wifi className="w-3 h-3" />
                    <span>Cloud AI Connected</span>
                  </div>
                </div>
              </div>

              {/* Sample Prompt Selector Buttons */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">
                  Select a Real-Life Question to Test:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sampleQuestions.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleSelectQuestion(q.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedQuestionId === q.id
                          ? 'bg-[#19B99A] text-[#101C2D] font-bold shadow-xs'
                          : 'bg-white/10 text-slate-300 hover:bg-white/15'
                      }`}
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Interaction Display */}
              <div className="space-y-4 pt-2">
                
                {/* User Bubble */}
                <div className="flex justify-end">
                  <div className="p-3 rounded-2xl rounded-tr-xs bg-[#07856D] text-white text-xs max-w-md font-medium shadow-sm">
                    {currentQ.question}
                  </div>
                </div>

                {/* Copilot Response Bubble */}
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl rounded-tl-xs bg-slate-800/90 border border-white/10 text-xs max-w-lg space-y-3">
                    
                    {isTyping ? (
                      <div className="flex items-center gap-2 text-slate-400 py-2">
                        <span className="w-2 h-2 rounded-full bg-[#19B99A] animate-ping" />
                        <span className="text-xs font-mono">Analyzing local ledger records...</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between pb-1 border-b border-white/10">
                          <span className="font-bold text-[#19B99A] text-xs">
                            {currentQ.answerTitle}
                          </span>
                          <span className="text-[10px] text-slate-400">Ground Truth Verified</span>
                        </div>

                        <p className="text-slate-200 leading-relaxed text-xs">
                          {currentQ.answerSummary}
                        </p>

                        {/* Data Points Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                          {currentQ.dataPoints.map((dp, i) => (
                            <div key={i} className="p-2 rounded-lg bg-black/30 border border-white/5 space-y-0.5">
                              <span className="text-[10px] text-slate-400 block">{dp.label}</span>
                              <span className={`text-xs font-bold tabular-nums ${dp.positive ? 'text-[#19B99A]' : 'text-white'}`}>
                                {dp.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Caution Note */}
                        <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-start gap-2 text-[11px] text-amber-300">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{currentQ.cautions}</span>
                        </div>
                      </>
                    )}

                  </div>
                </div>

              </div>

            </div>

            {/* Custom Input Box Simulation */}
            <form onSubmit={handleCustomSubmit} className="mt-6 pt-4 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Ask a question about your spending, bills, or net worth..."
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#19B99A]"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-1.5 bg-[#19B99A] hover:bg-[#159e84] text-[#101C2D] rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Send</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1.5 block">
                BYOK (Bring Your Own AI Key) mode is currently in beta roadmap testing.
              </span>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
