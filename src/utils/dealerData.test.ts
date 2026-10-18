import test from 'node:test';
import assert from 'node:assert/strict';
import {
  initialCompanies,
  initialBranches,
  filterCompanies,
  filterBranches,
  calculateFleetStats,
  calculateMonthlyEmi,
} from './dealerData.ts';

test('filterCompanies filters by query accurately', () => {
  const result = filterCompanies(initialCompanies, 'Prime', 'ALL');
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Prime Rides Group LLC');
});

test('filterCompanies filters by tax registration query', () => {
  const result = filterCompanies(initialCompanies, '009', 'ALL');
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'DEXGO Mobility Logistics');
});

test('calculateMonthlyEmi calculates correct loan amortization', () => {
  // 100,000 AED car, 20,000 down payment => 80,000 principal at 5% for 60 months
  const result = calculateMonthlyEmi(100000, 20000, 5, 60, 0, 0);
  assert.equal(result.financeAmount, 80000);
  assert.ok(result.monthlyEmi > 1500 && result.monthlyEmi < 1550);
  assert.ok(result.totalPayable > 80000);
});

test('calculateMonthlyEmi handles zero downpayment and added fees', () => {
  const result = calculateMonthlyEmi(50000, 0, 4.5, 36, 2500, 1000);
  assert.equal(result.financeAmount, 53500);
  assert.ok(result.monthlyEmi > 1500 && result.monthlyEmi < 1650);
});

test('calculateFleetStats returns aggregated metrics', () => {
  const stats = calculateFleetStats(initialCompanies, initialBranches);
  assert.equal(stats.totalCompanies, 3);
  assert.equal(stats.activeCompanies, 3);
  assert.equal(stats.totalBranches, 4);
  assert.equal(stats.complianceRate, 100);
});
