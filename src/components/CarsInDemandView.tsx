import React, { useState } from 'react';
import { Target, Search, Plus, CheckCircle2, User, Phone, DollarSign, Calendar, X } from 'lucide-react';
import { CarDemand, initialDemands } from '../utils/dealerData.ts';

export const CarsInDemandView: React.FC = () => {
  const [demands, setDemands] = useState<CarDemand[]>(initialDemands);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New demand form
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+971 50 ');
  const [vehicleRequested, setVehicleRequested] = useState('');
  const [yearRange, setYearRange] = useState('2023 - 2025');
  const [budgetAed, setBudgetAed] = useState(750000);
  const [agent, setAgent] = useState('Kareem Nour');

  const handleAddDemand = (e: React.FormEvent) => {
    e.preventDefault();
    const newDem: CarDemand = {
      id: `dem-${Date.now()}`,
      customerName,
      phone,
      vehicleRequested,
      yearRange,
      budgetAed: Number(budgetAed),
      agent,
      matchesCount: 1,
      status: 'ACTIVE',
      createdDate: new Date().toISOString().split('T')[0],
    };
    setDemands([newDem, ...demands]);
    setIsModalOpen(false);
    setCustomerName('');
    setVehicleRequested('');
  };

  const filteredDemands = demands.filter((d) => {
    const matchesSearch =
      !searchQuery ||
      d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.vehicleRequested.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>SALES INTELLIGENCE</span>
            <span>/</span>
            <span className="text-slate-200">CARS IN DEMAND</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cars in Demand
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer vehicle requirements and automatically match incoming inventory.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ New Demand</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, phone, make or model..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Requirements</option>
            <option value="FULFILLED">Fulfilled</option>
          </select>
        </div>
      </div>

      {/* Demands Table (From Video 00:48 - 00:50) */}
      <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Vehicle Requested</th>
              <th className="py-3 px-4">Model Year</th>
              <th className="py-3 px-4">Budget (AED)</th>
              <th className="py-3 px-4">Agent</th>
              <th className="py-3 px-4">Matches</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredDemands.map((dem) => (
              <tr key={dem.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">
                  <div>
                    <span className="text-slate-100">{dem.customerName}</span>
                    <div className="text-[10px] text-slate-400 font-mono">{dem.phone}</div>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-medium text-cyan-300">
                  {dem.vehicleRequested}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-300">{dem.yearRange}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 tabular-nums">
                  AED {dem.budgetAed.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-slate-300">{dem.agent}</td>
                <td className="py-3.5 px-4 font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-bold">
                    {dem.matchesCount} match
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {dem.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                  {dem.createdDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Demand Modal */}
      {isModalOpen && (
        <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-cyan-500/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Log Customer Car Demand</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddDemand} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sultan Al Qasimi"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Vehicle Specification Desired *</label>
                <input
                  type="text"
                  required
                  value={vehicleRequested}
                  onChange={(e) => setVehicleRequested(e.target.value)}
                  placeholder="e.g. 2024 Porsche 911 Turbo S"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Year Preference</label>
                  <input
                    type="text"
                    value={yearRange}
                    onChange={(e) => setYearRange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Budget (AED)</label>
                  <input
                    type="number"
                    value={budgetAed}
                    onChange={(e) => setBudgetAed(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-emerald-400 font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold">
                  Save Demand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
