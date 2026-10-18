import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Search, CheckCircle2, DollarSign, Download, Eye, X } from 'lucide-react';
import { DealQuote, initialQuotes, Vehicle } from '../utils/dealerData.ts';

interface QuotesDealsViewProps {
  vehicles: Vehicle[];
}

export const QuotesDealsView: React.FC<QuotesDealsViewProps> = ({ vehicles }) => {
  const [quotes, setQuotes] = useState<DealQuote[]>(initialQuotes);
  const [activeStatusTab, setActiveStatusTab] = useState<'All' | 'Open' | 'Booked' | 'Sold' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New quote form
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('+971 50 ');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]?.make + ' ' + vehicles[0]?.model);
  const [price, setPrice] = useState(vehicles[0]?.price || 1120000);
  const [paymentType, setPaymentType] = useState<DealQuote['paymentType']>('Finance');

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const newQ: DealQuote = {
      id: `LEDGER-0${quotes.length + 19}`,
      customer,
      phone,
      vehicle: selectedVehicle,
      price: Number(price),
      paymentType,
      status: 'Open',
      createdDate: new Date().toISOString().split('T')[0],
    };
    setQuotes([newQ, ...quotes]);
    setIsModalOpen(false);
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      !searchQuery ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.vehicle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeStatusTab === 'All' || q.status === activeStatusTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>SALES & CUSTOMERS</span>
            <span>/</span>
            <span className="text-slate-200">QUOTES & DEALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Commercial Quotes & Deals
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage quotations, ledger entries, booking deposits, and customer contracts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ New Quote</span>
        </button>
      </div>

      {/* Tabs & Search (From Video 01:23 - 01:25) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        {/* Status filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-900 rounded-lg border border-slate-800">
          {(['All', 'Open', 'Booked', 'Sold', 'Cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStatusTab(tab)}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeStatusTab === tab
                  ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quote, vehicle, client..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Table (From Video 01:25 - 01:32) */}
      <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Ledger ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4">Deal Price</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredQuotes.map((q) => (
              <tr key={q.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{q.id}</td>
                <td className="py-3.5 px-4 font-semibold text-white">
                  <div>
                    <span>{q.customer}</span>
                    <div className="text-[10px] text-slate-400 font-mono">{q.phone}</div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-200">{q.vehicle}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 tabular-nums">
                  AED {q.price.toLocaleString()}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">
                    {q.paymentType}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      q.status === 'Sold'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : q.status === 'Booked'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">{q.createdDate}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => alert(`Downloading Proforma PDF for ${q.id}...`)}
                    className="p-1 rounded text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                    title="Export Proforma PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Quote Modal */}
      {isModalOpen && (
        <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-cyan-500/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Create Commercial Quote</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateQuote} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer / Organization *</label>
                <input
                  type="text"
                  required
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="e.g. Al Futtaim Group"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Vehicle</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => {
                    setSelectedVehicle(e.target.value);
                    const found = vehicles.find((v) => `${v.make} ${v.model}` === e.target.value);
                    if (found) setPrice(found.price);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={`${v.make} ${v.model}`}>
                      {v.year} {v.make} {v.model} (AED {v.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quote Price (AED)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-emerald-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Type</label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Finance">Bank Finance</option>
                    <option value="Cash">Cash / Wire</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold">
                  Generate Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
