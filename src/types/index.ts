/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  account: string;
  type: 'expense' | 'income';
  syncState: 'local' | 'synced';
}

export interface AccountItem {
  id: string;
  name: string;
  type: 'bank' | 'credit' | 'investment' | 'cash';
  institution: string;
  balance: number;
  lastUpdated: string;
}

export interface UpcomingBill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  daysRemaining: number;
  category: string;
  isAutoPay: boolean;
}

export interface BudgetCategoryItem {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface PersonaProfile {
  id: string;
  label: string;
  role: string;
  tagline: string;
  question: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  keyMetricLabel: string;
  keyMetricValue: string;
  advice: string;
  breakdown: { label: string; amount: number; percentage: number }[];
}

export type LegalModalType = 
  | 'privacy' 
  | 'terms' 
  | 'data_safety' 
  | 'licenses' 
  | 'contact' 
  | 'account_deletion' 
  | null;
