import React, { useState } from 'react';
import { Search, Plus, CheckCircle2, ShieldAlert, FileSearch, X } from 'lucide-react';
import { ProcurementCheck, initialProcurements } from '../utils/dealerData.ts';

export const ProcurementChecksView: React.FC = () => {
  const [checks, setChecks] = useState<ProcurementCheck[]>(initialProcurements);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [stockId, setStockId] = useState('PR-L0055');
  const [chassis, setChassis] = useState('W1NYX7JJ3MA918299');
  const [vehicle, setVehicle] = useState('Mercedes-Benz S500');
  const [year, setYear] = useState(2024);
  const [mileageKm, setMileageKm] = useState(6200);
  const [accidents, setAccidents] = useState<ProcurementCheck['accidents']>('No Accidents');
  const [conditionNotes, setConditionNotes] = useState('Full agency service history, zero repaints, immaculate undercarriage.');

  const handleAddCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const newCheck: ProcurementCheck = {
      id: `CHK-${Date.now()}`,
      stockId,
      chassis,
      vehicle,
      year: Number(year),
      mileageKm: Number(mileageKm),
      accidents,
      conditionNotes,
      checkedDate: new Date().toISOString().split('T')[0],
      inspector: 'Tariq Al-Mansoor',
    };
    setChecks([newCheck, ...checks]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>QUALITY & COMPLIANCE</span>
            <span>/</span>
            <span className="text-slate-200">PROCUREMENT CHECKS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Procurement Checks
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review vehicle procurement inspection records, paint micron depths, and chassis integrity.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ New Procurement Check</span>
        </button>
      </div>

      {/* Procurement Records Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Stock ID</th>
              <th className="py-3 px-4">Chassis / VIN</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4">Mileage</th>
              <th className="py-3 px-4">Accidents</th>
              <th className="py-3 px-4">Condition Report</th>
              <th className="py-3 px-4">Checked Date</th>
              <th className="py-3 px-4 text-right">Inspector</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {checks.map((chk) => (
              <tr key={chk.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{chk.stockId}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{chk.chassis}</td>
                <td className="py-3.5 px-4 font-semibold text-white">
                  {chk.year} {chk.vehicle}
                </td>
                <td className="py-3.5 px-4 font-mono tabular-nums text-slate-300">
                  {chk.mileageKm.toLocaleString()} km
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      chk.accidents === 'No Accidents'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {chk.accidents}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-300 max-w-[260px] truncate" title={chk.conditionNotes}>
                  {chk.conditionNotes}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">{chk.checkedDate}</td>
                <td className="py-3.5 px-4 text-right font-medium text-slate-300">{chk.inspector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Procurement Modal */}
      {isModalOpen && (
        <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-cyan-500/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Log Vehicle Procurement Inspection</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCheck} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stock ID</label>
                  <input
                    type="text"
                    required
                    value={stockId}
                    onChange={(e) => setStockId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Chassis / VIN</label>
                  <input
                    type="text"
                    required
                    value={chassis}
                    onChange={(e) => setChassis(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Vehicle Description</label>
                  <input
                    type="text"
                    required
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Odometer Mileage (KM)</label>
                  <input
                    type="number"
                    value={mileageKm}
                    onChange={(e) => setMileageKm(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Accident Assessment</label>
                  <select
                    value={accidents}
                    onChange={(e) => setAccidents(e.target.value as ProcurementCheck['accidents'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="No Accidents">No Accidents (Clean Title)</option>
                    <option value="Minor Scratches">Minor Scratches</option>
                    <option value="Repainted Panel">Repainted Panel</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Physical Condition Inspection Notes</label>
                <textarea
                  rows={2}
                  value={conditionNotes}
                  onChange={(e) => setConditionNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold">
                  Save Inspection Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
