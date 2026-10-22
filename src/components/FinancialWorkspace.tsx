/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Currency, 
  formatCurrency, 
  calculateBudgetStrategy, 
  BudgetStrategy 
} from '../utils/finance';
import { 
  Wallet, 
  BarChart3, 
  Sliders, 
  Calendar, 
  Layers, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface FinancialWorkspaceProps {
  currency: Currency;
  onOpenEarlyAccess: () => void;
}

export const FinancialWorkspace: React.FC<FinancialWorkspaceProps> = ({
  currency,
  onOpenEarlyAccess,
}) => {
  const [activeTab, setActiveTab] = useState<string>('budgeting');
  const [selectedStrategy, setSelectedStrategy] = useState<BudgetStrategy>('fifty_thirty_twenty');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);

  const budgetResult = calculateBudgetStrategy(monthlyIncome, selectedStrategy);

  const modules = [
    { id: 'accounts', label: 'Accounts & Ledger', icon: Wallet },
    { id: 'spending', label: 'Spending Intelligence', icon: BarChart3 },
    { id: 'budgeting', label: 'Flexible Budgeting', icon: Sliders },
    { id: 'bills', label: 'Bills & Subscriptions', icon: Calendar },
    { id: 'networth', label: 'Net Worth Ledger', icon: Layers },
    { id: 'statements', label: 'Statement Import', icon: FileText },
    { id: 'copilot', label: 'AI Copilot', icon: Sparkles },
    { id: 'milestones', label: 'Milestones & Runway', icon: TrendingUp },
    { id: 'export', label: 'Data Export & Control', icon: Download },
  ];

  return (
    <section id="financial-planning" className="py-24 bg-white border-b border-[#E1E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#07856D]" />
            <span>Unified Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            More than a budget tracker. A complete financial workspace.
          </h2>
          <p className="text-base sm:text-lg text-[#637184] leading-relaxed">
            Every module connects to the same local ledger. No more jumping between five separate apps to track cash, stocks, bills, and monthly allocations.
          </p>
        </div>

        {/* Horizontal Module Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {modules.map((m) => {
            const Icon = m.icon;
            const isCurrent = activeTab === m.id;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveTab(m.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isCurrent
                    ? 'bg-[#101C2D] text-white border-[#101C2D] shadow-xs'
                    : 'bg-[#F7F8F4] text-[#637184] border-[#E1E8E4] hover:text-[#101C2D] hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#19B99A]' : 'text-[#637184]'}`} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Display Window */}
        <div className="bg-[#F7F8F4] rounded-2xl border border-[#E1E8E4] p-6 lg:p-10 text-left">
          
          {/* TAB 1: FLEXIBLE BUDGETING (THE SIGNATURE DEMO) */}
          {activeTab === 'budgeting' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">
                  Signature Capability · Strategy-Agnostic Budgeting
                </span>
                <h3 className="text-2xl font-bold text-[#101C2D]">
                  Budgeting is not one-size-fits-all. Choose the framework that fits your life.
                </h3>
                <p className="text-sm text-[#637184] leading-relaxed">
                  Most budgeting tools force you into an aggressive zero-sum game. Octopus Organizer lets you select proven financial frameworks or switch methods seamlessly.
                </p>
              </div>

              {/* Strategy Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'fifty_thirty_twenty', label: '50 / 30 / 20 Rule', desc: 'Balanced & intuitive' },
                  { id: 'zero_based', label: 'Zero-Based (ZBB)', desc: 'Every rupee has a job' },
                  { id: 'envelope', label: 'Digital Envelopes', desc: 'Strict category caps' },
                  { id: 'pay_yourself_first', label: 'Pay Yourself First', desc: 'Reverse wealth-first' },
                ].map((strat) => (
                  <button
                    key={strat.id}
                    type="button"
                    onClick={() => setSelectedStrategy(strat.id as BudgetStrategy)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedStrategy === strat.id
                        ? 'bg-white border-[#07856D] ring-2 ring-[#07856D]/20 shadow-xs'
                        : 'bg-white/60 border-[#E1E8E4] hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#101C2D]">{strat.label}</div>
                    <div className="text-[11px] text-[#637184] mt-0.5">{strat.desc}</div>
                  </button>
                ))}
              </div>

              {/* Interactive Income Slider */}
              <div className="p-5 rounded-xl bg-white border border-[#E1E8E4] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#101C2D]">
                    Simulate Your Monthly Net Take-Home:
                  </span>
                  <span className="text-base font-extrabold text-[#07856D] tabular-nums">
                    {formatCurrency(monthlyIncome, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="500000"
                  step="5000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-[#07856D]"
                  aria-label="Monthly income slider"
                />
                <div className="flex justify-between text-[10px] text-[#637184]">
                  <span>{formatCurrency(25000, currency)}</span>
                  <span>{formatCurrency(250000, currency)}</span>
                  <span>{formatCurrency(500000, currency)}</span>
                </div>
              </div>

              {/* Calculated Strategy Breakdown */}
              <div className="p-6 rounded-xl bg-white border border-[#E1E8E4] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E1E8E4] gap-2">
                  <div>
                    <h4 className="text-base font-bold text-[#101C2D]">{budgetResult.title}</h4>
                    <p className="text-xs text-[#637184]">{budgetResult.description}</p>
                  </div>
                  <div className="text-xs text-[#07856D] bg-[#E2F5ED] px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
                    Best for: {budgetResult.bestFor}
                  </div>
                </div>

                {/* Stacked Progress Bar */}
                <div className="w-full h-4 rounded-full overflow-hidden flex">
                  {budgetResult.allocations.map((alloc) => (
                    <div
                      key={alloc.category}
                      style={{
                        width: `${alloc.percentage}%`,
                        backgroundColor: alloc.color,
                      }}
                      title={`${alloc.category}: ${formatCurrency(alloc.amount, currency)} (${alloc.percentage}%)`}
                    />
                  ))}
                </div>

                {/* Allocation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {budgetResult.allocations.map((alloc) => (
                    <div
                      key={alloc.category}
                      className="p-3.5 rounded-xl border border-[#E1E8E4] bg-[#F7F8F4] space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: alloc.color }}
                        />
                        <span className="text-xs font-bold text-[#101C2D] truncate">
                          {alloc.category}
                        </span>
                      </div>
                      <div className="text-lg font-extrabold text-[#101C2D]">
                        {formatCurrency(alloc.amount, currency)}
                      </div>
                      <p className="text-[10px] text-[#637184] leading-relaxed">
                        {alloc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ACCOUNTS & LEDGER */}
          {activeTab === 'accounts' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Local Account Aggregation</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">One ledger for all accounts and obligation balances.</h3>
                <p className="text-sm text-[#637184]">
                  Manage savings accounts, credit cards, cash wallets, demat equities, and provident funds without ever handing over bank passwords.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'HDFC Salary Priority', type: 'Checking', bal: 142800, badge: 'Liquid Cash' },
                  { name: 'ICICI Emergency Reserve', type: 'Savings', bal: 270000, badge: 'Safety Buffer' },
                  { name: 'Zerodha Demat Portfolio', type: 'Equities', bal: 2134720, badge: 'Long-term' },
                  { name: 'Axis Magnus Credit Card', type: 'Liability', bal: -62100, badge: 'Due in 14d' },
                ].map((acc) => (
                  <div key={acc.name} className="p-4 rounded-xl bg-white border border-[#E1E8E4] space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#637184]">
                      <span>{acc.type}</span>
                      <span className="text-[10px] font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {acc.badge}
                      </span>
                    </div>
                    <div className="font-bold text-[#101C2D]">{acc.name}</div>
                    <div className={`text-xl font-extrabold ${acc.bal < 0 ? 'text-amber-700' : 'text-[#07856D]'}`}>
                      {formatCurrency(acc.bal, currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SPENDING INTELLIGENCE */}
          {activeTab === 'spending' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Spending Intelligence</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">Automatic pattern detection without cloud scraping.</h3>
                <p className="text-sm text-[#637184]">
                  Identifies recurring monthly leaks, unmasks cryptic merchant codes, and breaks down essential needs vs discretionary desires.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-white border border-[#E1E8E4] space-y-2">
                  <span className="text-xs font-bold text-[#07856D]">Merchant Normalization</span>
                  <p className="text-xs text-[#637184]">
                    Cryptic codes like <code>POS/38912/BLNK-IND</code> are automatically translated to <strong>Blinkit · Groceries</strong> on your local device.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white border border-[#E1E8E4] space-y-2">
                  <span className="text-xs font-bold text-[#07856D]">Subscription Leak Radar</span>
                  <p className="text-xs text-[#637184]">
                    Flags services charged monthly that haven't been opened in 60+ days (e.g. gym memberships, redundant streaming apps).
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white border border-[#E1E8E4] space-y-2">
                  <span className="text-xs font-bold text-[#07856D]">Weekend Surge Warning</span>
                  <p className="text-xs text-[#637184]">
                    Calculates your average weekday vs weekend burn rate to protect your discretionary budget before Saturday night.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BILLS & RECURRING */}
          {activeTab === 'bills' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Obligation Scheduling</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">Never get surprised by an annual subscription or utility due date.</h3>
                <p className="text-sm text-[#637184]">
                  Track due dates and cash commitments against your scheduled salary paydays.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Tata Power Electricity', amount: 3420, due: 'In 3 days', auto: false },
                  { name: 'Apartment Rent & Society', amount: 32000, due: 'In 8 days', auto: true },
                  { name: 'Star Health Family Insurance', amount: 18500, due: 'In 18 days', auto: false },
                ].map((bill) => (
                  <div key={bill.name} className="p-4 rounded-xl bg-white border border-[#E1E8E4] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-800 font-semibold">{bill.due}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {bill.auto ? 'Auto-Debit' : 'Manual Pay'}
                      </span>
                    </div>
                    <div className="font-bold text-[#101C2D]">{bill.name}</div>
                    <div className="text-lg font-extrabold text-[#101C2D]">
                      {formatCurrency(bill.amount, currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NET WORTH */}
          {activeTab === 'networth' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Holistic Balance Sheet</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">Track what you own minus what you owe.</h3>
                <p className="text-sm text-[#637184]">
                  Real-time net worth calculation that updates with every transaction, market valuation, and debt principal payment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border border-[#E1E8E4] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#07856D]">
                    <span>Total Assets</span>
                    <span>{formatCurrency(2647520, currency)}</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#637184]">
                    <div className="flex justify-between"><span>Bank Savings & FDs:</span><strong className="text-[#101C2D]">{formatCurrency(412800, currency)}</strong></div>
                    <div className="flex justify-between"><span>Mutual Funds & Stocks:</span><strong className="text-[#101C2D]">{formatCurrency(2134720, currency)}</strong></div>
                    <div className="flex justify-between"><span>Gold & Digital Silver:</span><strong className="text-[#101C2D]">{formatCurrency(100000, currency)}</strong></div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E1E8E4] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>Total Liabilities</span>
                    <span>{formatCurrency(162100, currency)}</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#637184]">
                    <div className="flex justify-between"><span>Credit Card Current Cycle:</span><strong className="text-amber-800">{formatCurrency(62100, currency)}</strong></div>
                    <div className="flex justify-between"><span>Consumer Electronics EMI:</span><strong className="text-amber-800">{formatCurrency(100000, currency)}</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STATEMENT IMPORT */}
          {activeTab === 'statements' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Local Statement Processing</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">Zero bank passwords. Pure client-side statement parsing.</h3>
                <p className="text-sm text-[#637184]">
                  Import your downloaded bank statements. The file is extracted and parsed completely inside your device memory.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { bank: 'HDFC Bank', format: 'PDF & CSV Supported', status: 'Verified' },
                  { bank: 'ICICI Bank', format: 'e-Statement PDF', status: 'Verified' },
                  { bank: 'State Bank of India', format: 'PDF & Excel XLS', status: 'Verified' },
                  { bank: 'Axis Bank', format: 'Standard CSV / PDF', status: 'Verified' },
                ].map((b) => (
                  <div key={b.bank} className="p-4 rounded-xl bg-white border border-[#E1E8E4] text-center space-y-1">
                    <div className="text-xs font-bold text-[#101C2D]">{b.bank}</div>
                    <div className="text-[10px] text-[#637184]">{b.format}</div>
                    <div className="text-[10px] text-[#07856D] font-semibold">{b.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: AI COPILOT */}
          {activeTab === 'copilot' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Contextual AI Assistant</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">Ask questions. Get calculated clarity.</h3>
                <p className="text-sm text-[#637184]">
                  Powered by cloud Gemini AI, Copilot examines your spending patterns to answer complex questions without revealing confidential details.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#101C2D] text-white text-xs space-y-2">
                <div className="text-[#19B99A] font-bold">Try the interactive Copilot Demo in the section below!</div>
                <p className="text-slate-300">
                  Scroll down to Section 07 to test the live conversational financial intelligence engine with real calculation grounding.
                </p>
              </div>
            </div>
          )}

          {/* TAB 8: MILESTONES & RUNWAY */}
          {activeTab === 'milestones' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Financial Health & Safety Runway</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">Know exactly how many months of freedom you have.</h3>
                <p className="text-sm text-[#637184]">
                  Calculates emergency runway based on your actual mandatory living costs, not arbitrary guesswork.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E1E8E4] grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-[#E2F5ED] rounded-lg">
                  <div className="text-[10px] text-[#07856D] font-bold uppercase">Calculated Runway</div>
                  <div className="text-2xl font-black text-[#07856D] mt-1">6.2 Months</div>
                  <div className="text-[10px] text-[#07856D]">Safe against sudden job transition</div>
                </div>
                <div className="p-3 bg-[#F7F8F4] rounded-lg">
                  <div className="text-[10px] text-[#637184] font-bold uppercase">Mandatory Burn</div>
                  <div className="text-xl font-bold text-[#101C2D] mt-1">{formatCurrency(44200, currency)}/mo</div>
                  <div className="text-[10px] text-[#637184]">Rent + Food + Utilities</div>
                </div>
                <div className="p-3 bg-[#F7F8F4] rounded-lg">
                  <div className="text-[10px] text-[#637184] font-bold uppercase">Liquid Cash Reserves</div>
                  <div className="text-xl font-bold text-[#101C2D] mt-1">{formatCurrency(274000, currency)}</div>
                  <div className="text-[10px] text-[#637184]">Instant access in FDs/Savings</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: DATA EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl space-y-1">
                <span className="text-xs font-bold text-[#07856D] uppercase tracking-wider">Zero Vendor Lock-In</span>
                <h3 className="text-2xl font-bold text-[#101C2D]">Your data belongs to you. Export anytime.</h3>
                <p className="text-sm text-[#637184]">
                  Download your entire history as clean CSV, structured JSON, or a raw SQLite database file. No proprietary formats, no trapped records.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white border border-[#E1E8E4] text-center space-y-2">
                  <div className="font-bold text-[#101C2D] text-xs">Full SQLite Database (.sqlite)</div>
                  <p className="text-[10px] text-[#637184]">Direct dump of your WatermelonDB local ledger.</p>
                  <button type="button" onClick={onOpenEarlyAccess} className="text-xs font-bold text-[#07856D] hover:underline">
                    Available in App →
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E1E8E4] text-center space-y-2">
                  <div className="font-bold text-[#101C2D] text-xs">Standard CSV (.csv)</div>
                  <p className="text-[10px] text-[#637184]">Compatible with Excel, Google Sheets, or tax tools.</p>
                  <button type="button" onClick={onOpenEarlyAccess} className="text-xs font-bold text-[#07856D] hover:underline">
                    Available in App →
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E1E8E4] text-center space-y-2">
                  <div className="font-bold text-[#101C2D] text-xs">Structured JSON (.json)</div>
                  <p className="text-[10px] text-[#637184]">For developers and custom financial pipelines.</p>
                  <button type="button" onClick={onOpenEarlyAccess} className="text-xs font-bold text-[#07856D] hover:underline">
                    Available in App →
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
