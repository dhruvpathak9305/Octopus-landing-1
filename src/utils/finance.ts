/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'INR' | 'USD' | 'EUR';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

export const CURRENCY_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
};

/**
 * Format currency with appropriate locale and symbol
 */
export function formatCurrency(amount: number, currency: Currency = 'INR'): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '₹';
  const converted = amount * (CURRENCY_RATES[currency] || 1);
  const isNegative = converted < 0;
  const absVal = Math.abs(converted);

  if (currency === 'INR') {
    // Indian numbering format (lakhs, crores)
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(Math.round(absVal));
    return isNegative ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
  }

  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(absVal));
  return isNegative ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export type BudgetStrategy = 'fifty_thirty_twenty' | 'zero_based' | 'envelope' | 'pay_yourself_first';

export interface BudgetAllocation {
  category: string;
  percentage: number;
  amount: number;
  description: string;
  color: string;
}

export interface BudgetStrategyResult {
  strategy: BudgetStrategy;
  title: string;
  description: string;
  bestFor: string;
  allocations: BudgetAllocation[];
}

/**
 * Calculate budget allocation based on income and selected strategy
 */
export function calculateBudgetStrategy(monthlyIncome: number, strategy: BudgetStrategy): BudgetStrategyResult {
  const income = Math.max(0, monthlyIncome);

  switch (strategy) {
    case 'fifty_thirty_twenty':
      return {
        strategy,
        title: '50 / 30 / 20 Rule',
        description: 'Classic balanced framework dividing income into essential needs, discretionary wants, and future savings.',
        bestFor: 'Those looking for simple, intuitive guardrails without micromanaging every line item.',
        allocations: [
          {
            category: 'Needs & Essentials (50%)',
            percentage: 50,
            amount: Math.round(income * 0.5),
            description: 'Rent, groceries, utilities, transit, insurance, minimum debt obligations',
            color: '#07856D', // Emerald
          },
          {
            category: 'Wants & Lifestyle (30%)',
            percentage: 30,
            amount: Math.round(income * 0.3),
            description: 'Dining out, entertainment, subscriptions, hobbies, shopping',
            color: '#19B99A', // Bright Teal
          },
          {
            category: 'Savings & Debt Payoff (20%)',
            percentage: 20,
            amount: Math.round(income * 0.2),
            description: 'Emergency fund, SIP / equity investments, extra debt principal',
            color: '#C79B48', // Gold
          },
        ],
      };

    case 'zero_based':
      return {
        strategy,
        title: 'Zero-Based Budgeting (ZBB)',
        description: 'Every rupee has a predefined job before the month starts: Income minus all allocations equals exactly zero.',
        bestFor: 'Detail-oriented planners, freelancers, or anyone with ambitious debt repayment goals.',
        allocations: [
          {
            category: 'Fixed Living Costs (42%)',
            percentage: 42,
            amount: Math.round(income * 0.42),
            description: 'Housing rent/EMI, electricity, broadband, groceries, commute',
            color: '#07856D',
          },
          {
            category: 'Scheduled Sinking Funds (15%)',
            percentage: 15,
            amount: Math.round(income * 0.15),
            description: 'Annual insurance premiums, car maintenance, holiday gifts fund',
            color: '#19B99A',
          },
          {
            category: 'Priority Investments (25%)',
            percentage: 25,
            amount: Math.round(income * 0.25),
            description: 'Direct mutual funds, PPF, retirement accounts',
            color: '#C79B48',
          },
          {
            category: 'Flexible Discretionary (18%)',
            percentage: 18,
            amount: Math.round(income * 0.18),
            description: 'Personal spending, weekend leisure, dining, self-care',
            color: '#637184',
          },
        ],
      };

    case 'envelope':
      return {
        strategy,
        title: 'Digital Envelope System',
        description: 'Segregates spending into dedicated category wallets. Once an envelope is empty, spending stops until reload.',
        bestFor: 'Those working to curb variable overspending in specific categories like food or shopping.',
        allocations: [
          {
            category: 'Groceries & Household (22%)',
            percentage: 22,
            amount: Math.round(income * 0.22),
            description: 'Fresh produce, supermarket runs, household supplies',
            color: '#07856D',
          },
          {
            category: 'Dining & Socializing (14%)',
            percentage: 14,
            amount: Math.round(income * 0.14),
            description: 'Restaurants, coffee runs, weekends out with friends',
            color: '#19B99A',
          },
          {
            category: 'Fixed Bills & Housing (40%)',
            percentage: 40,
            amount: Math.round(income * 0.4),
            description: 'Direct debits, recurring utilities, rent',
            color: '#101C2D',
          },
          {
            category: 'Emergency & Goals (24%)',
            percentage: 24,
            amount: Math.round(income * 0.24),
            description: 'Untouchable cash reserve and long-term targets',
            color: '#C79B48',
          },
        ],
      };

    case 'pay_yourself_first':
      return {
        strategy,
        title: 'Pay Yourself First (Reverse Budgeting)',
        description: 'Diverts wealth-building savings immediately upon salary receipt; whatever remains is guilt-free spending.',
        bestFor: 'Busy professionals who prioritize financial independence without logging micro-transactions.',
        allocations: [
          {
            category: 'Automatic Wealth SIP (30%)',
            percentage: 30,
            amount: Math.round(income * 0.3),
            description: 'Transferred on Day 1 to index funds, debt reduction, safety reserve',
            color: '#07856D',
          },
          {
            category: 'Committed Essentials (45%)',
            percentage: 45,
            amount: Math.round(income * 0.45),
            description: 'Rent, food staples, loan EMIs, utility bills',
            color: '#101C2D',
          },
          {
            category: 'Guilt-Free Spending (25%)',
            percentage: 25,
            amount: Math.round(income * 0.25),
            description: 'Spend freely on dining, tech gadgets, travel without tracking every coin',
            color: '#19B99A',
          },
        ],
      };
  }
}

/**
 * Calculate Net Worth
 */
export function calculateNetWorth(assetsTotal: number, liabilitiesTotal: number): {
  netWorth: number;
  debtToAssetRatio: number;
} {
  const netWorth = assetsTotal - liabilitiesTotal;
  const debtToAssetRatio = assetsTotal > 0 ? (liabilitiesTotal / assetsTotal) * 100 : 0;
  return {
    netWorth,
    debtToAssetRatio: Math.round(debtToAssetRatio * 10) / 10,
  };
}

/**
 * Calculate Emergency Fund Runway in Months
 */
export function calculateEmergencyRunway(liquidSavings: number, monthlyMandatoryExpenses: number): {
  runwayMonths: number;
  status: 'critical' | 'moderate' | 'healthy' | 'exceptional';
  recommendedSavings: number;
} {
  if (monthlyMandatoryExpenses <= 0) {
    return {
      runwayMonths: 99,
      status: 'exceptional',
      recommendedSavings: 0,
    };
  }

  const runwayMonths = Math.round((liquidSavings / monthlyMandatoryExpenses) * 10) / 10;
  const recommendedSavings = monthlyMandatoryExpenses * 6; // Standard 6-month safety buffer

  let status: 'critical' | 'moderate' | 'healthy' | 'exceptional' = 'critical';
  if (runwayMonths >= 6) {
    status = 'exceptional';
  } else if (runwayMonths >= 3) {
    status = 'healthy';
  } else if (runwayMonths >= 1) {
    status = 'moderate';
  }

  return {
    runwayMonths,
    status,
    recommendedSavings,
  };
}

/**
 * Validate early access form input
 */
export function validateEarlyAccessForm(email: string, fullName: string): {
  valid: boolean;
  errors: { email?: string; fullName?: string };
} {
  const errors: { email?: string; fullName?: string } = {};

  if (!fullName || fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Offline Sync State machine simulator
 */
export interface LocalLedgerItem {
  id: string;
  title: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  account: string;
  timestamp: number;
  syncState: 'local_only' | 'syncing' | 'synced_cloud';
}

export function createLocalLedgerTransaction(
  title: string,
  amount: number,
  category: string,
  account: string,
  isOnline: boolean
): LocalLedgerItem {
  return {
    id: `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title,
    amount,
    type: 'expense',
    category,
    account,
    timestamp: Date.now(),
    syncState: isOnline ? 'synced_cloud' : 'local_only',
  };
}
