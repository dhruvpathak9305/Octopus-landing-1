/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  calculateBudgetStrategy,
  calculateNetWorth,
  calculateEmergencyRunway,
  validateEarlyAccessForm,
  createLocalLedgerTransaction,
} from './finance.js';

test('formatCurrency formats INR, foreign currencies and negative amounts correctly', () => {
  assert.equal(formatCurrency(50000, 'INR'), '₹50,000');
  assert.equal(formatCurrency(-2850, 'INR'), '-₹2,850');
  assert.equal(formatCurrency(1000000, 'INR'), '₹10,00,000');
  // USD at 0.012
  assert.equal(formatCurrency(100000, 'USD'), '$1,200');
  assert.equal(formatCurrency(-50000, 'USD'), '-$600');
});

test('calculateBudgetStrategy 50/30/20 calculates exact portions', () => {
  const result = calculateBudgetStrategy(100000, 'fifty_thirty_twenty');
  assert.equal(result.allocations.length, 3);
  assert.equal(result.allocations[0].amount, 50000); // Needs
  assert.equal(result.allocations[1].amount, 30000); // Wants
  assert.equal(result.allocations[2].amount, 20000); // Savings
  assert.equal(result.allocations.reduce((sum, item) => sum + item.amount, 0), 100000);
});

test('calculateBudgetStrategy zero-based covers full 100% allocation', () => {
  const result = calculateBudgetStrategy(80000, 'zero_based');
  assert.equal(result.allocations.length, 4);
  const total = result.allocations.reduce((sum, item) => sum + item.amount, 0);
  assert.equal(total, 80000);
});

test('calculateNetWorth correctly subtracts liabilities from assets', () => {
  const { netWorth, debtToAssetRatio } = calculateNetWorth(2500000, 500000);
  assert.equal(netWorth, 2000000);
  assert.equal(debtToAssetRatio, 20); // 20%
});

test('calculateEmergencyRunway provides accurate month estimates and safety tiers', () => {
  const healthy = calculateEmergencyRunway(200000, 50000); // 4 months
  assert.equal(healthy.runwayMonths, 4);
  assert.equal(healthy.status, 'healthy');
  assert.equal(healthy.recommendedSavings, 300000); // 6 months buffer

  const critical = calculateEmergencyRunway(25000, 50000); // 0.5 months
  assert.equal(critical.status, 'critical');

  const exceptional = calculateEmergencyRunway(400000, 50000); // 8 months
  assert.equal(exceptional.status, 'exceptional');
});

test('validateEarlyAccessForm verifies name and email format', () => {
  const invalid = validateEarlyAccessForm('bad-email', 'A');
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.fullName);

  const valid = validateEarlyAccessForm('dhruv@example.com', 'Dhruv Pathak');
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('createLocalLedgerTransaction assigns sync state based on connectivity', () => {
  const offlineTx = createLocalLedgerTransaction('Groceries', 1450, 'Food', 'HDFC', false);
  assert.equal(offlineTx.syncState, 'local_only');
  assert.equal(offlineTx.amount, 1450);

  const onlineTx = createLocalLedgerTransaction('Electricity', 3200, 'Bills', 'ICICI', true);
  assert.equal(onlineTx.syncState, 'synced_cloud');
});
