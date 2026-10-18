import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Car,
  ShieldCheck,
  FileCheck,
  Video,
  ArrowRight,
  ChevronRight,
  Save,
  Check,
} from 'lucide-react';
import { DealProgression, ProgressionStage, initialProgressions } from '../utils/dealerData.ts';

export const DealProgressionView: React.FC = () => {
  const [progressions, setProgressions] = useState<DealProgression[]>(initialProgressions);
  const [selectedProgression, setSelectedProgression] = useState<DealProgression>(initialProgressions[0]);
  const [saveToast, setSaveToast] = useState(false);

  const stagesList: ProgressionStage[] = [
    'Evaluation',
    'Passing',
    'Insurance',
    'Registration',
    'Delivery Video',
    'Completed',
  ];

  const handleToggleChecklist = (stageName: string) => {
    const updatedChecklist = {
      ...selectedProgression.checklist,
      [stageName]: !selectedProgression.checklist[stageName],
    };
    const updated = {
      ...selectedProgression,
      checklist: updatedChecklist,
    };
    setSelectedProgression(updated);
    setProgressions((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleSaveDetails = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>OPERATIONAL DELIVERY</span>
            <span>/</span>
            <span className="text-slate-200">PROGRESSION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Deal Progression Workflow
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end vehicle delivery, RTA passing, insurance issuance, and registration state machine.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Progression Records Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Deal Pipelines ({progressions.length})
          </div>

          <div className="space-y-2.5">
            {progressions.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProgression(p)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedProgression.id === p.id
                    ? 'bg-cyan-950/40 border-cyan-400/50 shadow-md shadow-cyan-950/50'
                    : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 font-bold">{p.id} · {p.stockId}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {p.currentStage}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1.5">{p.vehicle}</h4>
                <div className="text-xs text-slate-400 mt-1">Customer: {p.customer}</div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                  <span>{p.bank}</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    AED {p.sellingPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Progression Inspector (From Video 00:58 - 01:00) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                ACTIVE WORKFLOW INSPECTOR
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Progression #{selectedProgression.id}
              </h2>
              <div className="text-xs font-mono text-slate-400">
                Quote Ledger: {selectedProgression.quoteId}
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-500">Agreed Selling Price</div>
              <div className="text-lg font-bold text-emerald-400 tabular-nums">
                AED {selectedProgression.sellingPrice.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Meta details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500">Customer</div>
              <div className="font-semibold text-white mt-1 truncate">{selectedProgression.customer}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500">Operating Seller</div>
              <div className="font-semibold text-slate-300 mt-1 truncate">{selectedProgression.seller}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500">Financing Bank</div>
              <div className="font-semibold text-slate-300 mt-1 truncate">{selectedProgression.bank}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500">Current Stage</div>
              <div className="font-semibold text-cyan-400 mt-1">{selectedProgression.currentStage}</div>
            </div>
          </div>

          {/* Interactive State Machine Progression Checklist */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Progression Checklist & Verification Milestones
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {stagesList.map((st) => {
                const isChecked = selectedProgression.checklist[st] || false;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleToggleChecklist(st)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold">{st}</span>
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                        isChecked
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'border border-slate-700'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Emirate & Remarks form from Video 00:59 */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registration Emirate
                </label>
                <select
                  value={selectedProgression.emirate}
                  onChange={(e) =>
                    setSelectedProgression({ ...selectedProgression, emirate: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Dubai">Dubai (RTA)</option>
                  <option value="Abu Dhabi">Abu Dhabi (Police Licensing)</option>
                  <option value="Sharjah">Sharjah (SD)</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Workflow Status
                </label>
                <select
                  value={selectedProgression.status}
                  onChange={(e) =>
                    setSelectedProgression({
                      ...selectedProgression,
                      status: e.target.value as DealProgression['status'],
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Active">Active Delivery</option>
                  <option value="Pending">Pending Customer Docs</option>
                  <option value="Completed">Completed & Handed Over</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Progression Remarks & Handoff Notes
              </label>
              <textarea
                rows={2}
                value={selectedProgression.remarks}
                onChange={(e) =>
                  setSelectedProgression({ ...selectedProgression, remarks: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {saveToast ? (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Progression saved & synchronized</span>
                </span>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleSaveDetails}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs hover:from-cyan-300 hover:to-blue-400 cursor-pointer shadow-md shadow-cyan-500/20"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
