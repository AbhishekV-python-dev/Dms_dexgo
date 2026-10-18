import React, { useState } from 'react';
import { Tag, Check, X, ShieldAlert, ArrowDownRight, User, Calendar, CheckCircle2 } from 'lucide-react';
import { SpecialPriceRequest, initialSpecialPrices } from '../utils/dealerData.ts';

export const SpecialPriceView: React.FC = () => {
  const [requests, setRequests] = useState<SpecialPriceRequest[]>(initialSpecialPrices);

  const handleDecision = (id: string, decision: 'APPROVED' | 'REJECTED') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: decision } : r))
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>COMMERCIAL MARGINS</span>
            <span>/</span>
            <span className="text-slate-200">SPECIAL PRICE REQUESTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Special Price Requests
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage transaction-specific price adjustments: Review, approve, or decline sales quotes.
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {requests.map((req) => {
          const discountAmount = req.originalPrice - req.requestedPrice;
          const grossProfit = req.requestedPrice - req.purchaseCost - req.expenses;

          return (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-cyan-400 font-bold">{req.stockId}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 font-mono">{req.requestDate}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      req.status === 'APPROVED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : req.status === 'PENDING'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{req.vehicle}</h3>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate-400 font-mono">
                  <div>
                    <span>Asking Price: </span>
                    <span className="text-slate-200 tabular-nums">AED {req.originalPrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <span>Purchase Cost: </span>
                    <span className="text-slate-400 tabular-nums">AED {req.purchaseCost.toLocaleString()}</span>
                  </div>
                  <div>
                    <span>Expenses: </span>
                    <span className="text-slate-400 tabular-nums">AED {req.expenses.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Requested by <span className="text-cyan-300 font-medium">{req.requestedBy}</span>
                </div>
              </div>

              {/* Price comparison & Action buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 self-end md:self-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Requested Price</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                    AED {req.requestedPrice.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono">
                    Gross Margin: +AED {grossProfit.toLocaleString()}
                  </div>
                </div>

                {req.status === 'PENDING' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecision(req.id, 'APPROVED')}
                      className="px-3.5 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleDecision(req.id, 'REJECTED')}
                      className="px-3.5 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Decline</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 font-mono italic">
                    Decision recorded
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
