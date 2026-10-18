import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Car, Hash, Gauge, DollarSign, MapPin } from 'lucide-react';
import { Branch, Vehicle } from '../utils/dealerData.ts';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (
    vehicle: Omit<
      Vehicle,
      'id' | 'stockId' | 'spec' | 'documentsUploaded' | 'documentsTotal' | 'daysInStock'
    >
  ) => void;
  branches: Branch[];
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle,
  branches,
}) => {
  if (!isOpen) return null;

  const [make, setMake] = useState('Porsche');
  const [model, setModel] = useState('911 GT3 RS');
  const [year, setYear] = useState(2024);
  const [vin, setVin] = useState(
    'WP0AF2A' + Math.floor(1000000000 + Math.random() * 9000000000)
  );
  const [price, setPrice] = useState(1150000);
  const [mileageKm, setMileageKm] = useState(1200);
  const [color, setColor] = useState('Solid White');
  const [branchId, setBranchId] = useState(branches[0]?.id || '');
  const [status, setStatus] = useState<Vehicle['status']>('AVAILABLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVehicle({
      vin,
      make,
      model,
      year,
      color,
      price,
      currency: 'AED',
      mileageKm,
      branchId,
      status,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="relative w-full max-w-lg bg-[#0F172A] border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-950/50 overflow-hidden"
      >
        <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h2 id="vehicle-modal-title" className="text-base font-semibold text-white">
                Intake New Vehicle to Fleet
              </h2>
              <p className="text-xs text-slate-400">
                Register vehicle VIN, pricing, and branch allocation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Make / Manufacturer *
              </label>
              <input
                type="text"
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Mercedes-Benz"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Model & Trim *
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. G63 AMG Magno"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                VIN / Chassis Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono tabular-nums text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
                <Hash className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Model Year
              </label>
              <input
                type="number"
                min="2015"
                max="2026"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono tabular-nums text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Retail Listing Price (AED)
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  step="5000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono tabular-nums text-emerald-400 focus:outline-none focus:border-cyan-400"
                />
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Odometer (KM)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={mileageKm}
                  onChange={(e) => setMileageKm(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono tabular-nums text-white focus:outline-none focus:border-cyan-400"
                />
                <Gauge className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Assigned Showroom / Branch
            </label>
            <div className="relative">
              <select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.companyName})
                  </option>
                ))}
              </select>
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-lg shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Add Vehicle to Fleet
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
