/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, formatCurrency } from '../utils/finance';
import { 
  HelpCircle, 
  Search, 
  Calendar, 
  PieChart, 
  Layers, 
  AlertTriangle, 
  MessageSquareText, 
  ArrowRight,
  CheckCircle2,
  Sliders,
  DollarSign
} from 'lucide-react';

interface PainPointsProps {
  currency: Currency;
}

interface PainPointItem {
  id: string;
  quote: string;
  label: string;
  description: string;
  icon: React.ElementType;
  solutionTitle: string;
  solutionDetail: string;
  interactiveDemo: (currency: Currency) => React.ReactNode;
}

export const PainPoints: React.FC<PainPointsProps> = ({ currency }) => {
  const [activeCard, setActiveCard] = useState<string>('a');

  // Interactive micro-demo states
  const [coffeeSpend, setCoffeeSpend] = useState<number>(250);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(45000);

  const painPoints: PainPointItem[] = [
    {
      id: 'a',
      label: 'Cumulative Leakage',
      quote: '“I earn well every month, but I still don’t know where my money goes.”',
      description: 'Small daily UPI payments, food deliveries, and untracked subscriptions quietly drain 25% of take-home pay without leaving a clear footprint.',
      icon: Search,
      solutionTitle: 'Unified Local Ledger & Auto-Categorization',
      solutionDetail: 'Instantly records micro-spends locally, auto-tagging merchants and revealing true cumulative leakages.',
      interactiveDemo: (curr) => {
        const monthlyCoffee = coffeeSpend * 30;
        const annualCoffee = monthlyCoffee * 12;
        return (
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between text-[#637184]">
              <span>Small daily spend simulation:</span>
              <span className="font-bold text-[#101C2D]">{formatCurrency(coffeeSpend, curr)}/day</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={coffeeSpend}
              onChange={(e) => setCoffeeSpend(Number(e.target.value))}
              className="w-full accent-[#07856D]"
              aria-label="Daily expense slider"
            />
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#E2F5ED] border border-[#19B99A]/30">
                <div className="text-[10px] text-[#07856D] font-medium">Monthly Invisible Drain</div>
                <div className="text-sm font-bold text-[#07856D]">{formatCurrency(monthlyCoffee, curr)}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#F7F8F4] border border-[#E1E8E4]">
                <div className="text-[10px] text-[#637184]">Annualized Reality</div>
                <div className="text-sm font-bold text-[#101C2D]">{formatCurrency(annualCoffee, curr)}</div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: 'b',
      label: 'Cashflow Clashes',
      quote: '“Recurring bills always seem to hit right when my account balance is lowest.”',
      description: 'Subscriptions, electricity, insurance premiums, and rent hit at unpredictable intervals, creating artificial cash crunches.',
      icon: Calendar,
      solutionTitle: 'Forward-Looking Obligation Radar',
      solutionDetail: 'Projects upcoming obligations against projected income cycles so you never get caught off-guard.',
      interactiveDemo: (curr) => (
        <div className="space-y-2 pt-2 text-xs">
          <div className="text-[11px] font-semibold text-[#101C2D]">Upcoming Obligations Timeline</div>
          <div className="space-y-1.5">
            {[
              { name: 'Broadband (Airtel)', days: '2 days', amt: 1499, clash: false },
              { name: 'Car Loan EMI', days: '6 days', amt: 18500, clash: true },
              { name: 'Health Insurance Premium', days: '12 days', amt: 14200, clash: false },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded bg-[#F7F8F4] border border-[#E1E8E4]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.clash ? 'bg-amber-500' : 'bg-[#07856D]'}`} />
                  <span className="font-medium text-[#101C2D]">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#101C2D]">{formatCurrency(item.amt, curr)}</div>
                  <div className="text-[10px] text-[#637184]">in {item.days}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'c',
      label: 'Fragmented Net Worth',
      quote: '“My savings, credit cards, mutual funds and debts are scattered in 6 different apps.”',
      description: 'You see account balances independently, but calculating your true net position requires mental gymnastics and custom spreadsheets.',
      icon: Layers,
      solutionTitle: 'Comprehensive Asset & Liability Ledger',
      solutionDetail: 'Brings savings, demat portfolios, PF, real estate, and credit debt into one private offline-first ledger.',
      interactiveDemo: (curr) => (
        <div className="space-y-2 pt-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded bg-[#E2F5ED] text-[#07856D] font-bold">
            <span>True Net Worth:</span>
            <span>{formatCurrency(2485420, curr)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-[#F7F8F4] border border-[#E1E8E4]">
              <span className="text-[#637184]">Liquid & Assets</span>
              <div className="font-bold text-[#07856D] mt-0.5">{formatCurrency(2647520, curr)}</div>
            </div>
            <div className="p-2 rounded bg-[#F7F8F4] border border-[#E1E8E4]">
              <span className="text-[#637184]">Liabilities & CC</span>
              <div className="font-bold text-amber-700 mt-0.5">-{formatCurrency(162100, curr)}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'd',
      label: 'Rigid Budgeting',
      quote: '“Strict zero-based budgeting feels exhausting, but no budget means chaos.”',
      description: 'Most budgeting apps force you into their dogmatic framework. If you overspend one category by ₹200, the whole system breaks.',
      icon: Sliders,
      solutionTitle: 'Strategy-Agnostic Budgeting Engine',
      solutionDetail: 'Choose between 50/30/20, Zero-Based, Envelope Wallets, or Pay-Yourself-First with adaptable headroom.',
      interactiveDemo: (curr) => (
        <div className="space-y-2 pt-2 text-xs">
          <div className="text-[11px] font-semibold text-[#101C2D]">Supported Budget Frameworks:</div>
          <div className="grid grid-cols-2 gap-1.5">
            {['50/30/20 Rule', 'Zero-Based (ZBB)', 'Digital Envelopes', 'Pay Yourself First'].map((strat, i) => (
              <div key={strat} className={`p-1.5 text-center rounded border text-[11px] font-medium ${i === 0 ? 'bg-[#07856D] text-white border-[#07856D]' : 'bg-[#F7F8F4] text-[#101C2D] border-[#E1E8E4]'}`}>
                {strat}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'e',
      label: 'Big Decision Anxiety',
      quote: '“Can I actually afford this holiday, gadget, or car without blowing my safety net?”',
      description: 'Checking your current bank balance gives false confidence. It doesn’t tell you whether a purchase will cannibalize next quarter’s emergency fund.',
      icon: AlertTriangle,
      solutionTitle: 'Pre-Purchase Headroom Simulator',
      solutionDetail: 'Tests immediate major purchases against your real 90-day cash commitments before you swipe.',
      interactiveDemo: (curr) => {
        const canAfford = purchaseAmount <= 55000;
        return (
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center justify-between text-[#637184]">
              <span>Contemplated Purchase:</span>
              <span className="font-bold text-[#101C2D]">{formatCurrency(purchaseAmount, curr)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(Number(e.target.value))}
              className="w-full accent-[#07856D]"
              aria-label="Contemplated purchase slider"
            />
            <div className={`p-2 rounded text-center font-semibold text-[11px] ${
              canAfford ? 'bg-[#E2F5ED] text-[#07856D]' : 'bg-amber-100 text-amber-900'
            }`}>
              {canAfford 
                ? 'Safe: Leaves 4.8 months emergency runway intact' 
                : 'Warning: Depletes cash below 3-month safety minimum'}
            </div>
          </div>
        );
      },
    },
    {
      id: 'f',
      label: 'Financial Jargon Fatigue',
      quote: '“I don’t want to become a chartered accountant just to understand my money.”',
      description: 'Complex financial ratios, cryptic banking statements, and jargon-filled portals alienate normal people who just want honest clarity.',
      icon: MessageSquareText,
      solutionTitle: 'Plain-English AI Explanations',
      solutionDetail: 'Ask conversational questions in plain language and get calm, direct explanations grounded in your actual numbers.',
      interactiveDemo: (curr) => (
        <div className="space-y-2 pt-2 text-xs">
          <div className="p-2 rounded bg-[#101C2D] text-white">
            <div className="text-[10px] text-[#19B99A] font-semibold">Q: "Where did my bonus go?"</div>
            <div className="text-[11px] text-slate-300 mt-1 leading-snug">
              60% allocated to Emergency Fund ({formatCurrency(60000, curr)}), 25% to mutual funds, and 15% used for Diwali travel.
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-[#E1E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#07856D]" />
            <span>Real Financial Frustrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            Sound familiar?
          </h2>
          <p className="text-base sm:text-lg text-[#637184] leading-relaxed">
            Managing money gets complicated when the information you need is scattered across accounts, cards, bills, and spreadsheets. Here is how Octopus Organizer untangles each friction point.
          </p>
        </div>

        {/* 6 Responsive Problem-to-Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item) => {
            const Icon = item.icon;
            const isSelected = activeCard === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveCard(item.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#07856D] bg-[#F7F8F4] shadow-md ring-1 ring-[#07856D]'
                    : 'border-[#E1E8E4] bg-white hover:border-[#19B99A]/60 hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#07856D] uppercase tracking-wider">
                      {item.label}
                    </span>
                    <div className="p-2 rounded-lg bg-[#E2F5ED] text-[#07856D]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Emotional Quote */}
                  <h3 className="text-base font-bold text-[#101C2D] leading-snug mb-2">
                    {item.quote}
                  </h3>

                  {/* Problem Description */}
                  <p className="text-xs text-[#637184] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Solution Box & Micro-Interaction */}
                <div className="pt-4 border-t border-[#E1E8E4]/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#07856D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#19B99A] shrink-0" />
                    <span>{item.solutionTitle}</span>
                  </div>
                  <p className="text-[11px] text-[#637184] leading-relaxed">
                    {item.solutionDetail}
                  </p>

                  {/* Render the interactive micro-demo */}
                  {item.interactiveDemo(currency)}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
