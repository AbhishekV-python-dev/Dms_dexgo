import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Building2, ShieldCheck, Phone, DollarSign, Globe2 } from 'lucide-react';
import { Company } from '../utils/dealerData.ts';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Omit<Company, 'id'>) => void;
  initialData?: Company | null;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialData?.name || '');
  const [taxRegistration, setTaxRegistration] = useState(
    initialData?.taxRegistration || '100' + Math.floor(100000000000 + Math.random() * 900000000000)
  );
  const [contact, setContact] = useState(initialData?.contact || '+971 50 ');
  const [currency, setCurrency] = useState(initialData?.currency || 'AED');
  const [regionalSpec, setRegionalSpec] = useState(
    initialData?.regionalSpec || 'GCC Specs (Standard)'
  );
  const [status, setStatus] = useState<Company['status']>(
    initialData?.status || 'ACTIVE'
  );
  const [establishedYear, setEstablishedYear] = useState(
    initialData?.establishedYear || 2024
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name,
      taxRegistration,
      contact,
      currency,
      regionalSpec,
      status,
      establishedYear,
      branchCount: initialData?.branchCount || 0,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="company-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="relative w-full max-w-lg bg-[#0F172A] border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-950/50 overflow-hidden"
      >
        {/* Header with electric cyan accent line */}
        <div className="h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 id="company-modal-title" className="text-base font-semibold text-white">
                {initialData ? 'Edit Company Entity' : 'Register New Company Entity'}
              </h2>
              <p className="text-xs text-slate-400">
                Corporate identification & regional tax compliance
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
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Legal Company Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Prestige Motors LLC"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Tax Registration / TRN
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={taxRegistration}
                  onChange={(e) => setTaxRegistration(e.target.value)}
                  placeholder="100XXXXXXXXX001"
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono tabular-nums text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Contact Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                />
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Operating Currency
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="SAR">SAR - Saudi Riyal</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="QAR">QAR - Qatari Riyal</option>
                </select>
                <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Regional Specification
              </label>
              <div className="relative">
                <select
                  value={regionalSpec}
                  onChange={(e) => setRegionalSpec(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="GCC Specs (Standard)">GCC Specs (Standard)</option>
                  <option value="GCC & European Specs">GCC & European Specs</option>
                  <option value="North American Specs">North American Specs</option>
                  <option value="Japanese Import Specs">Japanese Import Specs</option>
                </select>
                <Globe2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Operating Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Company['status'])}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="ACTIVE">ACTIVE (Operational)</option>
                <option value="PENDING">PENDING AUDIT</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Established Year
              </label>
              <input
                type="number"
                min="1980"
                max="2030"
                value={establishedYear}
                onChange={(e) => setEstablishedYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
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
              {initialData ? 'Update Entity' : 'Save Company Entity'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
