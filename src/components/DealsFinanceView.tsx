import React from 'react';
import { FileSpreadsheet, Layers, ShieldCheck, Download, Plus, ArrowUpRight } from 'lucide-react';

interface DealsFinanceViewProps {
  type: 'deals' | 'finance' | 'access';
}

export const DealsFinanceView: React.FC<DealsFinanceViewProps> = ({ type }) => {
  if (type === 'deals') {
    const deals = [
      { id: 'PRF-8821', client: 'Al Habtoor Motors Fleet', vehicle: '2024 Porsche 911 GT3 RS', amount: '1,150,000 AED', status: 'PROFORMA ISSUED', date: '2026-10-14' },
      { id: 'PRF-8820', client: 'Emirates Luxury Rentals', vehicle: '2025 Mercedes-AMG G63', amount: '980,000 AED', status: 'DELIVERY NOTE READY', date: '2026-10-13' },
      { id: 'PRF-8819', client: 'Private Client (Abu Dhabi)', vehicle: '2024 Ferrari 296 GTB', amount: '1,320,000 AED', status: 'INSPECTION PENDING', date: '2026-10-12' },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              <span className="text-cyan-400 font-semibold">DEXGO OS</span>
              <span>/</span>
              <span>COMMERCIAL OPERATIONS</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Deals & Proformas</h1>
            <p className="text-xs text-slate-400 mt-1">
              Proforma invoices, automated delivery notes, and vehicle sales contracts.
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Generate Proforma</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Proforma ID</th>
                <th className="py-3 px-4">Client / Organization</th>
                <th className="py-3 px-4">Allocated Asset</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {deals.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-cyan-400">{d.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{d.client}</td>
                  <td className="py-3.5 px-4 text-slate-300">{d.vehicle}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold tabular-nums">{d.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">Download PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'finance') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              <span className="text-cyan-400 font-semibold">DEXGO OS</span>
              <span>/</span>
              <span>TREASURY & LEDGERS</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Finance & Ledger Accounts</h1>
            <p className="text-xs text-slate-400 mt-1">
              Dealership escrow balances, VAT declarations, and bank integrations.
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center gap-2 cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>Export FTA Tax Return</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#0D1424] border border-slate-800">
            <div className="text-xs text-slate-400">Total Settled Escrow</div>
            <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">42,850,000 AED</div>
            <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+18.4% month-over-month</span>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-[#0D1424] border border-slate-800">
            <div className="text-xs text-slate-400">VAT Payable (5% FTA Standard)</div>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">2,142,500 AED</div>
            <div className="text-[11px] text-slate-400 mt-2">Next filing deadline: Nov 28</div>
          </div>
          <div className="p-5 rounded-xl bg-[#0D1424] border border-slate-800">
            <div className="text-xs text-slate-400">Active Trade Facilities</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">4 Partner Banks</div>
            <div className="text-[11px] text-slate-400 mt-2">ENBD, ADCB, FAB, Mashreq</div>
          </div>
        </div>
      </div>
    );
  }

  // Access & Staff
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>IDENTITY & ACCESS</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Staff & Access Control</h1>
          <p className="text-xs text-slate-400 mt-1">
            Role-based permissions (RBAC) across dealerships, showrooms, and audit staff.
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Invite Team Member</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Staff Member</th>
              <th className="py-3 px-4">Role Permission</th>
              <th className="py-3 px-4">Assigned Branch</th>
              <th className="py-3 px-4">Security Status</th>
              <th className="py-3 px-4 text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr className="hover:bg-slate-800/40">
              <td className="py-3.5 px-4 font-semibold text-white">MasterTest Admin</td>
              <td className="py-3.5 px-4 font-mono text-cyan-400">SUPER_ADMIN</td>
              <td className="py-3.5 px-4 text-slate-300">All Showrooms (Group-wide)</td>
              <td className="py-3.5 px-4"><span className="text-emerald-400 font-semibold">MFA Enabled</span></td>
              <td className="py-3.5 px-4 text-right"><span className="text-slate-400">Owner</span></td>
            </tr>
            <tr className="hover:bg-slate-800/40">
              <td className="py-3.5 px-4 font-semibold text-white">Tariq Al-Mansoor</td>
              <td className="py-3.5 px-4 font-mono text-emerald-400">SHOWROOM_DIRECTOR</td>
              <td className="py-3.5 px-4 text-slate-300">Dubai Main Showroom</td>
              <td className="py-3.5 px-4"><span className="text-emerald-400 font-semibold">Active</span></td>
              <td className="py-3.5 px-4 text-right"><button className="text-cyan-400 hover:underline">Edit</button></td>
            </tr>
            <tr className="hover:bg-slate-800/40">
              <td className="py-3.5 px-4 font-semibold text-white">Elena Vance</td>
              <td className="py-3.5 px-4 font-mono text-emerald-400">OPERATIONS_MANAGER</td>
              <td className="py-3.5 px-4 text-slate-300">Yas Marina Hub</td>
              <td className="py-3.5 px-4"><span className="text-emerald-400 font-semibold">Active</span></td>
              <td className="py-3.5 px-4 text-right"><button className="text-cyan-400 hover:underline">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
