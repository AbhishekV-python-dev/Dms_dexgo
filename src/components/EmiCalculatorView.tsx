import React, { useState, useId } from 'react';
import {
  Calculator,
  DollarSign,
  Plus,
  Landmark,
  Shield,
  FileCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { EmiEstimate, initialEmiEstimates, calculateMonthlyEmi, Vehicle } from '../utils/dealerData.ts';

interface EmiCalculatorViewProps {
  vehicles: Vehicle[];
}

export const EmiCalculatorView: React.FC<EmiCalculatorViewProps> = ({ vehicles }) => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'estimates'>('calculator');
  const [estimates, setEstimates] = useState<EmiEstimate[]>(initialEmiEstimates);
  const [toastSaved, setToastSaved] = useState(false);

  // Form Fields from Video 01:12 - 01:14
  const [customerName, setCustomerName] = useState('Ahmed Al Marzooqi');
  const [customerMobile, setCustomerMobile] = useState('+971 50 777 8899');
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || '');
  const [vehiclePrice, setVehiclePrice] = useState(vehicles[0]?.price || 1350000);
  const [downPayment, setDownPayment] = useState(270000);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [bank, setBank] = useState('Dubai Islamic Bank');
  const [interestRate, setInterestRate] = useState(4.85);

  // Charges toggles from video 01:13
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [insuranceCost, setInsuranceCost] = useState(18500);
  const [includeBankProcessing, setIncludeBankProcessing] = useState(true);
  const [bankProcessingFee, setBankProcessingFee] = useState(1050);
  const [servicePackage, setServicePackage] = useState<'None' | '3-Year' | '5-Year Premium'>('3-Year');

  // Service package cost mapping
  const serviceCost = servicePackage === '3-Year' ? 9500 : servicePackage === '5-Year Premium' ? 16000 : 0;

  // Real-time calculation
  const totalInsurance = includeInsurance ? insuranceCost : 0;
  const totalBankFee = includeBankProcessing ? bankProcessingFee : 0;

  const calculation = calculateMonthlyEmi(
    vehiclePrice + serviceCost,
    downPayment,
    interestRate,
    tenureMonths,
    totalInsurance,
    totalBankFee
  );

  const handleVehicleChange = (vId: string) => {
    setSelectedVehicleId(vId);
    const found = vehicles.find((v) => v.id === vId);
    if (found) {
      setVehiclePrice(found.price);
      setDownPayment(Math.round(found.price * 0.2)); // 20% standard UAE downpayment
    }
  };

  const handleSaveEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const selCar = vehicles.find((v) => v.id === selectedVehicleId);
    const newEst: EmiEstimate = {
      id: `EMI-000${estimates.length + 9}`,
      customerName,
      customerMobile,
      vehicle: selCar ? `${selCar.year} ${selCar.make} ${selCar.model}` : 'Custom Vehicle',
      bank,
      interestRate,
      vehiclePrice,
      downPayment,
      financeAmount: calculation.financeAmount,
      tenureMonths,
      monthlyEmi: calculation.monthlyEmi,
      status: 'ACTIVE',
      createdDate: new Date().toISOString().split('T')[0],
    };
    setEstimates([newEst, ...estimates]);
    setToastSaved(true);
    setTimeout(() => {
      setToastSaved(false);
      setActiveSubTab('estimates');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>FINANCE & TREASURY</span>
            <span>/</span>
            <span className="text-slate-200">EMI CALCULATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Auto Finance & EMI Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Prepare instant, bank-compliant automotive finance estimates and loan amortizations.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'calculator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Finance Calculator
          </button>
          <button
            onClick={() => setActiveSubTab('estimates')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'estimates'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved Estimates ({estimates.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'calculator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Customer, Vehicle, Financing, Charges */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-5">
            <form onSubmit={handleSaveEstimate} className="space-y-5">
              {/* Customer section */}
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  1. Customer Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Customer Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Customer Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={customerMobile}
                      onChange={(e) => setCustomerMobile(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle section */}
              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  2. Select Inventory Vehicle
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1 font-semibold">Stock Vehicle</label>
                    <select
                      value={selectedVehicleId}
                      onChange={(e) => handleVehicleChange(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.stockId} · {v.year} {v.make} {v.model} (AED {v.price.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Vehicle Price (AED)</label>
                    <input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-emerald-400 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Financing parameters */}
              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  3. Financing Structure & Bank
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Down Payment</label>
                    <input
                      type="number"
                      step="5000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Loan Tenure</label>
                    <select
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value={12}>12 Months (1 Yr)</option>
                      <option value={24}>24 Months (2 Yrs)</option>
                      <option value={36}>36 Months (3 Yrs)</option>
                      <option value={48}>48 Months (4 Yrs)</option>
                      <option value={60}>60 Months (5 Yrs)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Partner Bank</label>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="Dubai Islamic Bank">Dubai Islamic Bank</option>
                      <option value="Emirates NBD">Emirates NBD</option>
                      <option value="Abu Dhabi Commercial Bank">ADCB</option>
                      <option value="First Abu Dhabi Bank">FAB</option>
                      <option value="Mashreq Bank">Mashreq</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Annual Interest %</label>
                    <input
                      type="number"
                      step="0.05"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-cyan-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Main Finance Charges toggles (From Video 01:13) */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  4. Add-on Finance Charges
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="rounded bg-slate-800 text-cyan-500"
                    />
                    <div>
                      <div className="font-semibold text-slate-200">Include Insurance</div>
                      <div className="text-[10px] text-slate-400 font-mono">+AED {insuranceCost.toLocaleString()}</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBankProcessing}
                      onChange={(e) => setIncludeBankProcessing(e.target.checked)}
                      className="rounded bg-slate-800 text-cyan-500"
                    />
                    <div>
                      <div className="font-semibold text-slate-200">Bank Processing Fee</div>
                      <div className="text-[10px] text-slate-400 font-mono">+AED {bankProcessingFee.toLocaleString()}</div>
                    </div>
                  </label>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Service Package</label>
                    <select
                      value={servicePackage}
                      onChange={(e) => setServicePackage(e.target.value as any)}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded text-slate-200"
                    >
                      <option value="None">No Service Package</option>
                      <option value="3-Year">3-Year Service (+9.5k)</option>
                      <option value="5-Year Premium">5-Year Premium (+16k)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 cursor-pointer transition-all"
                >
                  Save & Print Estimate
                </button>
              </div>
            </form>
          </div>

          {/* Right Card: Real-time Live Calculation Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0E17] border border-cyan-500/30 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
                  LIVE LOAN AMORTIZATION
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold font-mono">
                  {bank}
                </span>
              </div>

              {/* Monthly EMI Highlight */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-medium">Estimated Monthly Payment</div>
                <div className="text-4xl font-extrabold font-mono text-emerald-400 mt-2 tabular-nums">
                  AED {calculation.monthlyEmi.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  over {tenureMonths} monthly installments
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-3 mt-6 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Financed Principal</span>
                  <span className="text-white font-bold tabular-nums">
                    AED {calculation.financeAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Down Payment ({( (downPayment / (vehiclePrice || 1)) * 100 ).toFixed(0)}%)</span>
                  <span className="text-cyan-300 tabular-nums">
                    AED {downPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Total Calculated Interest</span>
                  <span className="text-slate-300 tabular-nums">
                    AED {calculation.totalInterest.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Total Loan Payback</span>
                  <span className="text-white font-bold tabular-nums">
                    AED {calculation.totalPayable.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <span>Standard UAE Central Bank APR</span>
              <span className="text-cyan-400">{interestRate}% Fixed</span>
            </div>
          </div>
        </div>
      ) : (
        /* Saved Estimates Table (From Video 01:07 - 01:10) */
        <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">EMI No.</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Bank</th>
                <th className="py-3 px-4">Interest %</th>
                <th className="py-3 px-4">Finance Amount</th>
                <th className="py-3 px-4">Monthly EMI</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {estimates.map((est) => (
                <tr key={est.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{est.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{est.customerName}</td>
                  <td className="py-3.5 px-4 text-slate-300">{est.vehicle}</td>
                  <td className="py-3.5 px-4 text-slate-400">{est.bank}</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">{est.interestRate}%</td>
                  <td className="py-3.5 px-4 font-mono text-white tabular-nums">
                    AED {est.financeAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 tabular-nums">
                    AED {est.monthlyEmi.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {est.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-400">{est.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
