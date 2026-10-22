/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, formatCurrency } from '../utils/finance';
import { PersonaProfile } from '../types';
import { 
  GraduationCap, 
  Briefcase, 
  HeartHandshake, 
  Baby, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface PersonasSectionProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
}

export const PersonasSection: React.FC<PersonasSectionProps> = ({
  currency,
  onOpenEarlyAccess,
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('pro');

  const personas: PersonaProfile[] = [
    {
      id: 'student',
      label: 'The Student',
      role: 'College & Early Career',
      tagline: 'Variable stipends & shared campus living',
      question: '“Will my money last until the next payday or allowance?”',
      monthlyIncome: 28000,
      monthlyExpenses: 21500,
      keyMetricLabel: 'Remaining Burn Buffer',
      keyMetricValue: formatCurrency(6500, currency),
      advice: 'Set an automatic daily spending cap of ₹350 for food delivery and café runs so hostel rent and semester books are protected.',
      breakdown: [
        { label: 'Hostel Rent & Mess', amount: 12000, percentage: 43 },
        { label: 'Books & Course Materials', amount: 3500, percentage: 12 },
        { label: 'Social & Canteen', amount: 6000, percentage: 21 },
        { label: 'Savings Reserve', amount: 6500, percentage: 24 },
      ],
    },
    {
      id: 'pro',
      label: 'The Professional',
      role: 'Tech & Knowledge Worker',
      tagline: 'High salary, multiple cards & mutual fund SIPs',
      question: '“Where did my salary go, and how can I plan better for wealth creation?”',
      monthlyIncome: 165000,
      monthlyExpenses: 98000,
      keyMetricLabel: 'Monthly Investment Surplus',
      keyMetricValue: formatCurrency(67000, currency),
      advice: 'Use "Pay Yourself First" mode: Day-1 automated transfer of ₹50,000 to index funds and emergency reserves leaves ₹1,15,000 for living and leisure without guilt.',
      breakdown: [
        { label: 'Rent / Home Loan EMI', amount: 45000, percentage: 27 },
        { label: 'Living & Groceries', amount: 28000, percentage: 17 },
        { label: 'Discretionary Lifestyle', amount: 25000, percentage: 15 },
        { label: 'Wealth Investments (SIP)', amount: 67000, percentage: 41 },
      ],
    },
    {
      id: 'household',
      label: 'The Couple',
      role: 'Shared Household Expenses',
      tagline: 'Individual bank accounts with joint commitments',
      question: '“How do we track shared bills without losing individual autonomy?”',
      monthlyIncome: 240000,
      monthlyExpenses: 145000,
      keyMetricLabel: 'Joint Sinking Fund',
      keyMetricValue: formatCurrency(45000, currency),
      advice: 'Maintain separate offline accounts for personal discretion while routing joint rent, groceries, and vacations through a shared envelope ledger.',
      breakdown: [
        { label: 'Joint Rent & Maintenance', amount: 60000, percentage: 25 },
        { label: 'Groceries & Utilities', amount: 35000, percentage: 15 },
        { label: 'Personal Allowances', amount: 50000, percentage: 21 },
        { label: 'Joint Long-Term Fund', amount: 95000, percentage: 39 },
      ],
    },
    {
      id: 'parent',
      label: 'The Parent',
      role: 'Family & Children Care',
      tagline: 'School fees, insurance & healthcare buffers',
      question: '“What will upcoming family expenses mean for our overall runway?”',
      monthlyIncome: 210000,
      monthlyExpenses: 155000,
      keyMetricLabel: 'Family Safety Runway',
      keyMetricValue: '8.4 Months',
      advice: 'Quarterly school fees and pediatric healthcare are modeled as sinking funds so tuition due dates never disrupt monthly household operations.',
      breakdown: [
        { label: 'Household Living Costs', amount: 70000, percentage: 33 },
        { label: 'Schooling & Tuition Fund', amount: 40000, percentage: 19 },
        { label: 'Family Health & Insurance', amount: 20000, percentage: 10 },
        { label: 'Future Education Corpus', amount: 80000, percentage: 38 },
      ],
    },
    {
      id: 'planner',
      label: 'The Future Planner',
      role: 'Targeting Major Milestones',
      tagline: 'Downpayment for home, car, or sabbatical',
      question: '“Can I prepare for a major purchase without risking financial stress?”',
      monthlyIncome: 190000,
      monthlyExpenses: 95000,
      keyMetricLabel: 'Downpayment Target Progress',
      keyMetricValue: '68% Reached',
      advice: 'Headroom simulator projects that a ₹12,00,000 home downpayment is achievable in 14 months while keeping 6 months emergency runway fully intact.',
      breakdown: [
        { label: 'Fixed Essentials', amount: 55000, percentage: 29 },
        { label: 'Controlled Discretionary', amount: 25000, percentage: 13 },
        { label: 'Dedicated Downpayment SIP', amount: 85000, percentage: 45 },
        { label: 'Liquid Buffer', amount: 25000, percentage: 13 },
      ],
    },
  ];

  const currentPersona = personas.find((p) => p.id === selectedPersonaId) || personas[1];

  const getIcon = (id: string) => {
    switch (id) {
      case 'student': return GraduationCap;
      case 'pro': return Briefcase;
      case 'household': return HeartHandshake;
      case 'parent': return Baby;
      case 'planner': return Compass;
      default: return Briefcase;
    }
  };

  return (
    <section className="py-24 bg-white border-b border-[#E1E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#07856D]" />
            <span>Versatile Across Every Life Stage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            Different people. Different goals. One organised financial life.
          </h2>
          <p className="text-base sm:text-lg text-[#637184] leading-relaxed">
            Whether you are stretching your first paycheck or stewarding multi-decade investments, Octopus adapts to your financial reality.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {personas.map((p) => {
            const Icon = getIcon(p.id);
            const isSelected = selectedPersonaId === p.id;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPersonaId(p.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#101C2D] text-white border-[#101C2D] shadow-sm'
                    : 'bg-[#F7F8F4] text-[#101C2D] border-[#E1E8E4] hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#19B99A]' : 'text-[#07856D]'}`} />
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#19B99A]" />}
                </div>
                <div className="text-xs font-bold">{p.label}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-[#637184]'}`}>
                  {p.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Detail Canvas */}
        <div className="bg-[#F7F8F4] rounded-2xl border border-[#E1E8E4] p-6 lg:p-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Context & Question */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold text-[#07856D] uppercase tracking-wider">
                {currentPersona.tagline}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101C2D] leading-snug">
                {currentPersona.question}
              </h3>
              <p className="text-sm text-[#637184] leading-relaxed">
                {currentPersona.advice}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenEarlyAccess}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#07856D] hover:bg-[#066c59] rounded-xl shadow-xs"
                >
                  <span>Experience This Setup in Early Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Tailored Financial Snapshot */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-[#E1E8E4] p-6 space-y-5 shadow-xs">
              
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E1E8E4]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#637184]">Monthly Inflow</span>
                  <div className="text-xl font-extrabold text-[#101C2D] mt-0.5">
                    {formatCurrency(currentPersona.monthlyIncome, currency)}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#637184]">{currentPersona.keyMetricLabel}</span>
                  <div className="text-xl font-extrabold text-[#07856D] mt-0.5">
                    {currentPersona.keyMetricValue}
                  </div>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#101C2D] uppercase tracking-wider">
                  Organized Allocation Strategy
                </span>

                <div className="space-y-2">
                  {currentPersona.breakdown.map((item, i) => (
                    <div key={item.label} className="text-xs space-y-1">
                      <div className="flex justify-between text-[#637184]">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-bold text-[#101C2D]">
                          {formatCurrency(item.amount, currency)} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${i === 3 ? 'bg-[#07856D]' : i === 0 ? 'bg-[#101C2D]' : 'bg-[#19B99A]'}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
