import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Search,
  Plus,
  Copy,
  Check,
  Edit2,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Car,
  Filter,
  Download,
  Phone,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Company, Branch } from '../utils/dealerData.ts';

interface CompanyManagementViewProps {
  companies: Company[];
  branches: Branch[];
  onOpenAddCompany: () => void;
  onOpenAddBranch: () => void;
  onEditCompany: (company: Company) => void;
  onEditBranch: (branch: Branch) => void;
  onDeleteCompany: (id: string) => void;
  onDeleteBranch: (id: string) => void;
  selectedCompanyFilter: string;
  setSelectedCompanyFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CompanyManagementView: React.FC<CompanyManagementViewProps> = ({
  companies,
  branches,
  onOpenAddCompany,
  onOpenAddBranch,
  onEditCompany,
  onEditBranch,
  onDeleteCompany,
  onDeleteBranch,
  selectedCompanyFilter,
  setSelectedCompanyFilter,
  searchQuery,
  setSearchQuery,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [companyStatusFilter, setCompanyStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING'>('ALL');
  const [branchStatusFilter, setBranchStatusFilter] = useState<'ALL' | 'ACTIVE' | 'MAINTENANCE'>('ALL');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter companies
  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.taxRegistration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact.includes(searchQuery);

    const matchesStatus =
      companyStatusFilter === 'ALL' || c.status === companyStatusFilter;

    const matchesSelected =
      selectedCompanyFilter === 'ALL' || c.id === selectedCompanyFilter;

    return matchesSearch && matchesStatus && matchesSelected;
  });

  // Filter branches
  const filteredBranches = branches.filter((b) => {
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.contact.includes(searchQuery);

    const matchesParent =
      selectedCompanyFilter === 'ALL' || b.companyId === selectedCompanyFilter;

    const matchesStatus =
      branchStatusFilter === 'ALL' || b.status === branchStatusFilter;

    return matchesSearch && matchesParent && matchesStatus;
  });

  const totalInventory = branches.reduce((acc, b) => acc + b.inventoryCount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Header & Breadcrumb Trail */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          {/* Typographic breadcrumb without pills */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>ENTERPRISE MANAGEMENT</span>
            <span>/</span>
            <span className="text-slate-200">COMPANY & BRANCHES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Company & Branches
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Configure registered corporate entities, legal tax IDs, regional GCC
            specifications, and operating showroom facilities.
          </p>
        </div>

        {/* Action Button Suite */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAddCompany}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400/60 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>+ Register Entity</span>
          </button>
          <button
            onClick={onOpenAddBranch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>+ Add Showroom</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0D1424] border border-slate-800/90 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Registered Entities</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white mt-2">
            {companies.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>100% Tax Compliant</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1424] border border-slate-800/90 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Showrooms & Depots</span>
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white mt-2">
            {branches.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
            <span>Dubai · Abu Dhabi · Sharjah</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1424] border border-slate-800/90 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Allocated Inventory</span>
            <Car className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white mt-2">
            {totalInventory}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 mt-1">
            <span>Live showroom stock</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1424] border border-slate-800/90 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Regional GCC Spec</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white mt-2">
            GCC / EU
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1">
            <span>Authorized Importer</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: REGISTERED COMPANIES */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Companies</h2>
              <span className="text-xs font-mono text-cyan-400">({filteredCompanies.length})</span>
            </div>
            <p className="text-xs text-slate-400">
              Manage registered company information, regional tax registration numbers and active status.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setCompanyStatusFilter('ALL')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  companyStatusFilter === 'ALL'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCompanyStatusFilter('ACTIVE')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  companyStatusFilter === 'ACTIVE'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setCompanyStatusFilter('PENDING')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  companyStatusFilter === 'PENDING'
                    ? 'bg-amber-500/20 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Company Data Grid */}
        <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Tax Registration</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Currency</th>
                  <th className="py-3 px-4">Regional Spec</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredCompanies.map((comp) => {
                  return (
                    <tr
                      key={comp.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Company Name & Established */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xs">
                            {comp.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-slate-100 group-hover:text-cyan-300 transition-colors">
                              {comp.name}
                            </span>
                            <div className="text-[10px] text-slate-500">
                              Est. {comp.establishedYear || 2021} · {comp.branchCount || 1} Branches
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tax Registration with Copy */}
                      <td className="py-3.5 px-4 font-mono text-cyan-300 tabular-nums">
                        <div className="flex items-center gap-2">
                          <span>{comp.taxRegistration}</span>
                          <button
                            onClick={() => handleCopy(comp.taxRegistration, comp.id)}
                            className="text-slate-500 hover:text-cyan-400 p-1 rounded transition-colors"
                            title="Copy Tax Registration Number"
                          >
                            {copiedId === comp.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Contact Phone */}
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {comp.contact}
                      </td>

                      {/* Currency */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-200 px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 text-[11px]">
                          {comp.currency}
                        </span>
                      </td>

                      {/* Regional Spec */}
                      <td className="py-3.5 px-4 text-slate-300">
                        {comp.regionalSpec}
                      </td>

                      {/* Status: Clean, elegant badge with emerald indicator */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            comp.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : comp.status === 'PENDING'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              comp.status === 'ACTIVE'
                                ? 'bg-emerald-400'
                                : comp.status === 'PENDING'
                                ? 'bg-amber-400'
                                : 'bg-rose-400'
                            }`}
                          />
                          {comp.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditCompany(comp)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Edit Company Entity"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteCompany(comp.id)}
                            className="p-1.5 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                            title="Remove Entity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredCompanies.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                      No registered companies found matching the filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: SHOWROOMS & BRANCHES */}
      <div className="space-y-3.5 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Branches & Showrooms</h2>
              <span className="text-xs font-mono text-emerald-400">({filteredBranches.length})</span>
            </div>
            <p className="text-xs text-slate-400">
              Manage physical branch dealerships belonging to registered corporate entities.
            </p>
          </div>

          {/* Branch filter controls */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCompanyFilter}
              onChange={(e) => setSelectedCompanyFilter(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Parent Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setBranchStatusFilter('ALL')}
                className={`px-2 py-0.5 text-xs font-medium rounded-md transition-colors ${
                  branchStatusFilter === 'ALL'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setBranchStatusFilter('ACTIVE')}
                className={`px-2 py-0.5 text-xs font-medium rounded-md transition-colors ${
                  branchStatusFilter === 'ACTIVE'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Active
              </button>
            </div>
          </div>
        </div>

        {/* Branch Data Grid */}
        <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Branch Showroom</th>
                  <th className="py-3 px-4">Parent Entity</th>
                  <th className="py-3 px-4">Physical Location</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Showroom Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredBranches.map((br) => {
                  return (
                    <tr
                      key={br.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Branch Name & Lead */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-slate-100 group-hover:text-emerald-300 transition-colors">
                              {br.name}
                            </span>
                            <div className="text-[10px] text-slate-500">
                              Manager: {br.manager}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Parent Company */}
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {br.companyName}
                      </td>

                      {/* Address */}
                      <td className="py-3.5 px-4 text-slate-300 max-w-[220px] truncate" title={br.address}>
                        {br.address}
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {br.contact}
                      </td>

                      {/* Inventory Count (Tabular numerals) */}
                      <td className="py-3.5 px-4 font-mono tabular-nums">
                        <span className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-semibold text-xs">
                          {br.inventoryCount} units
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            br.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              br.status === 'ACTIVE'
                                ? 'bg-emerald-400'
                                : 'bg-amber-400'
                            }`}
                          />
                          {br.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditBranch(br)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Edit Branch Location"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteBranch(br.id)}
                            className="p-1.5 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                            title="Remove Branch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredBranches.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                      No branches found matching the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
