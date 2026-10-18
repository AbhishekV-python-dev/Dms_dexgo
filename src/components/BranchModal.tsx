import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, MapPin, Building, Phone, UserCheck } from 'lucide-react';
import { Branch, Company } from '../utils/dealerData.ts';

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (branch: Omit<Branch, 'id'>) => void;
  companies: Company[];
  initialData?: Branch | null;
}

export const BranchModal: React.FC<BranchModalProps> = ({
  isOpen,
  onClose,
  onSave,
  companies,
  initialData,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialData?.name || '');
  const [companyId, setCompanyId] = useState(
    initialData?.companyId || companies[0]?.id || ''
  );
  const [address, setAddress] = useState(
    initialData?.address || 'Sheikh Zayed Road, Dubai, UAE'
  );
  const [contact, setContact] = useState(initialData?.contact || '+971 4 ');
  const [status, setStatus] = useState<Branch['status']>(
    initialData?.status || 'ACTIVE'
  );
  const [inventoryCount, setInventoryCount] = useState(
    initialData?.inventoryCount || 25
  );
  const [manager, setManager] = useState(
    initialData?.manager || 'Showroom Lead'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const parentCompany = companies.find((c) => c.id === companyId);
    onSave({
      name,
      companyId,
      companyName: parentCompany ? parentCompany.name : 'Primary Entity',
      address,
      contact,
      status,
      inventoryCount,
      manager,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="branch-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="relative w-full max-w-lg bg-[#0F172A] border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-950/50 overflow-hidden"
      >
        {/* Header accent strip */}
        <div className="h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 id="branch-modal-title" className="text-base font-semibold text-white">
                {initialData ? 'Edit Showroom Branch' : 'Add New Showroom Branch'}
              </h2>
              <p className="text-xs text-slate-400">
                Facility allocation & regional inventory hub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Branch / Showroom Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dubai Marina Flagship, Yas Island Hub"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Parent Corporate Entity *
            </label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Physical Showroom Address *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Building, street, district, Emirate"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Showroom Direct Line
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+971 4 399 2200"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Branch Manager
              </label>
              <input
                type="text"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                placeholder="Manager in Charge"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Floor Capacity (Units)
              </label>
              <input
                type="number"
                min="1"
                value={inventoryCount}
                onChange={(e) => setInventoryCount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Operational Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Branch['status'])}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="PENDING">UNDER RENOVATION</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-lg shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {initialData ? 'Update Branch' : 'Add Branch Location'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
