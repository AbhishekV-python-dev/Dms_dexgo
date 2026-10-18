import React, { useState } from 'react';
import {
  Car,
  Search,
  Plus,
  Gauge,
  Tag,
  DollarSign,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Vehicle, Branch } from '../utils/dealerData.ts';

interface FleetInventoryViewProps {
  vehicles: Vehicle[];
  branches: Branch[];
  onOpenAddVehicle: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const FleetInventoryView: React.FC<FleetInventoryViewProps> = ({
  vehicles,
  branches,
  onOpenAddVehicle,
  searchQuery,
  setSearchQuery,
}) => {
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      !searchQuery ||
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch =
      branchFilter === 'ALL' || v.branchId === branchFilter;

    const matchesStatus =
      statusFilter === 'ALL' || v.status === statusFilter;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>FLEET OPERATIONS</span>
            <span>/</span>
            <span className="text-slate-200">ACTIVE INVENTORY</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Fleet & Vehicle Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-showroom vehicle asset tracking, specs, and status.
          </p>
        </div>

        <button
          onClick={onOpenAddVehicle}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Intake New Vehicle</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Showroom Locations</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="RESERVED">Reserved</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Showing <span className="text-cyan-400 font-bold">{filteredVehicles.length}</span> fleet units
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle) => {
          const branch = branches.find((b) => b.id === vehicle.branchId);
          return (
            <div
              key={vehicle.id}
              className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {vehicle.year} {vehicle.make}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {vehicle.model}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      vehicle.status === 'AVAILABLE'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-slate-500">VIN:</span>
                    <span className="text-slate-300">{vehicle.vin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Mileage:</span>
                    <span className="font-mono tabular-nums text-slate-300">
                      {vehicle.mileageKm.toLocaleString()} KM
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Showroom:</span>
                    <span className="truncate max-w-[150px] text-slate-300">
                      {branch ? branch.name : 'Central Depot'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500">Retail Asking</div>
                  <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                    {vehicle.price.toLocaleString()} AED
                  </div>
                </div>
                <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors">
                  View Deal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
