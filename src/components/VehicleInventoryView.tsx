import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  Search,
  Plus,
  Printer,
  Upload,
  DollarSign,
  FileText,
  Share2,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Tag,
  Receipt,
  FileSpreadsheet,
} from 'lucide-react';
import { Vehicle, Branch, VehicleExpense } from '../utils/dealerData.ts';

interface VehicleInventoryViewProps {
  vehicles: Vehicle[];
  branches: Branch[];
  onOpenAddVehicle: () => void;
  onEditVehicle?: (v: Vehicle) => void;
  onDeleteVehicle?: (id: string) => void;
  selectedVehicleForDetail: Vehicle | null;
  setSelectedVehicleForDetail: (v: Vehicle | null) => void;
}

export const VehicleInventoryView: React.FC<VehicleInventoryViewProps> = ({
  vehicles,
  branches,
  onOpenAddVehicle,
  onEditVehicle,
  onDeleteVehicle,
  selectedVehicleForDetail,
  setSelectedVehicleForDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'AVAILABLE' | 'BOOKED' | 'RESERVED' | 'SOLD'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Expense form state for the vehicle details drawer
  const [expenses, setExpenses] = useState<VehicleExpense[]>([
    { id: 'exp-1', vehicleId: 'veh-1', description: 'RTA Comprehensive Test & Inspection', amount: 450, date: '2026-10-14' },
    { id: 'exp-2', vehicleId: 'veh-1', description: 'Ceramic Coating & Detail Polish', amount: 2800, date: '2026-10-13' },
  ]);
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicleForDetail || !expenseDesc || !expenseAmount) return;
    const newExp: VehicleExpense = {
      id: `exp-${Date.now()}`,
      vehicleId: selectedVehicleForDetail.id,
      description: expenseDesc,
      amount: Number(expenseAmount),
      date: new Date().toISOString().split('T')[0],
    };
    setExpenses((prev) => [newExp, ...prev]);
    setExpenseDesc('');
    setExpenseAmount('');
  };

  // KPIs
  const totalVehicles = vehicles.length;
  const availableCount = vehicles.filter((v) => v.status === 'AVAILABLE').length;
  const bookedCount = vehicles.filter((v) => v.status === 'BOOKED').length;
  const reservedCount = vehicles.filter((v) => v.status === 'RESERVED').length;
  const soldCount = vehicles.filter((v) => v.status === 'SOLD').length;

  // Filtering
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      !searchQuery ||
      v.stockId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Action Suite */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>CORE OPERATIONS</span>
            <span>/</span>
            <span className="text-slate-200">VEHICLE INVENTORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Vehicle Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage the complete multi-showroom vehicle inventory and technical records.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => alert('Printing inventory catalogue...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Stock</span>
          </button>
          <button
            onClick={onOpenAddVehicle}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* KPI Status Strip (From Video 00:13 - 00:16) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => setStatusFilter('ALL')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'ALL'
              ? 'bg-slate-800/80 border-cyan-400/50'
              : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-slate-400 font-medium">Total Vehicles</div>
          <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
            {totalVehicles}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Complete inventory</div>
        </div>

        <div
          onClick={() => setStatusFilter('AVAILABLE')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'AVAILABLE'
              ? 'bg-emerald-950/40 border-emerald-400/50'
              : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-emerald-400 font-medium">Available</div>
          <div className="text-xl font-bold font-mono text-emerald-300 mt-1 tabular-nums">
            {availableCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Ready for sale</div>
        </div>

        <div
          onClick={() => setStatusFilter('BOOKED')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'BOOKED'
              ? 'bg-blue-950/40 border-blue-400/50'
              : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-blue-400 font-medium">Booked</div>
          <div className="text-xl font-bold font-mono text-blue-300 mt-1 tabular-nums">
            {bookedCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Under contract</div>
        </div>

        <div
          onClick={() => setStatusFilter('RESERVED')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'RESERVED'
              ? 'bg-amber-950/40 border-amber-400/50'
              : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-amber-400 font-medium">Reserved</div>
          <div className="text-xl font-bold font-mono text-amber-300 mt-1 tabular-nums">
            {reservedCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Deposit placed</div>
        </div>

        <div
          onClick={() => setStatusFilter('SOLD')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'SOLD'
              ? 'bg-purple-950/40 border-purple-400/50'
              : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] text-purple-400 font-medium">Sold</div>
          <div className="text-xl font-bold font-mono text-purple-300 mt-1 tabular-nums">
            {soldCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Delivered units</div>
        </div>
      </div>

      {/* Filter and Search Bar (From Video 00:15) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stock ID, make, model, chassis..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-slate-500 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
          <span className="font-mono">
            Showing <span className="text-cyan-400 font-bold">{filteredVehicles.length}</span> of {vehicles.length}
          </span>
        </div>
      </div>

      {/* High-Precision Inventory Data Grid (From Video 00:16 - 00:30) */}
      <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0C1220] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Stock ID</th>
                <th className="py-3 px-4">Mileage</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Asking Price</th>
                <th className="py-3 px-4">Documents</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredVehicles.map((car) => {
                return (
                  <tr
                    key={car.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedVehicleForDetail(car)}
                  >
                    {/* Vehicle */}
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                            <span>{car.year} {car.make}</span>
                            <span className="text-slate-400 font-normal">{car.model}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {car.variant || 'Standard'} · {car.color}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Stock ID & Spec */}
                    <td className="py-3.5 px-4 font-mono text-cyan-300">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{car.stockId}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {car.spec}
                        </span>
                      </div>
                    </td>

                    {/* Mileage */}
                    <td className="py-3.5 px-4 font-mono tabular-nums text-slate-300">
                      {car.mileageKm.toLocaleString()} km
                    </td>

                    {/* Age */}
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {car.daysInStock}d
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          car.status === 'AVAILABLE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : car.status === 'BOOKED'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : car.status === 'RESERVED'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            car.status === 'AVAILABLE'
                              ? 'bg-emerald-400'
                              : car.status === 'BOOKED'
                              ? 'bg-blue-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        {car.status}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 tabular-nums">
                      AED {car.price.toLocaleString()}
                    </td>

                    {/* Documents */}
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <span className="text-emerald-400 font-semibold">
                        {car.documentsUploaded}/{car.documentsTotal}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-1">uploaded</span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedVehicleForDetail(car)}
                          className="p-1.5 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                          title="Inspect Vehicle & Log Expenses"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditVehicle && onEditVehicle(car)}
                          className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit Vehicle"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* VEHICLE DETAILS & EXPENSE DRAWER WITH SMOOTH MOTION */}
      <AnimatePresence>
        {selectedVehicleForDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 380, damping: 25 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0F172A] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-400 text-xs font-bold">
                        {selectedVehicleForDetail.stockId}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {selectedVehicleForDetail.status}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-0.5">
                      {selectedVehicleForDetail.year} {selectedVehicleForDetail.make} {selectedVehicleForDetail.model}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVehicleForDetail(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Spec breakdown from video */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-500">Purchase Cost</div>
                  <div className="font-mono font-bold text-white mt-1 tabular-nums">
                    AED {selectedVehicleForDetail.purchaseCost?.toLocaleString() || '1,100,000'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-500">Asking Price</div>
                  <div className="font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                    AED {selectedVehicleForDetail.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-500">Least Selling Price</div>
                  <div className="font-mono font-bold text-cyan-300 mt-1 tabular-nums">
                    AED {selectedVehicleForDetail.leastSellingPrice?.toLocaleString() || '1,250,000'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-500">Chassis / VIN</div>
                  <div className="font-mono text-[11px] text-slate-300 mt-1 truncate">
                    {selectedVehicleForDetail.vin}
                  </div>
                </div>
              </div>

              {/* Record Inventory-Related Expense */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Log Inventory-Related Expense</span>
                </div>
                <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <input
                    type="text"
                    required
                    value={expenseDesc}
                    onChange={(e) => setExpenseDesc(e.target.value)}
                    placeholder="Expense description (e.g. RTA Inspection, Detailing)"
                    className="sm:col-span-7 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder="Amount (AED)"
                    className="sm:col-span-3 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="sm:col-span-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs hover:from-cyan-300 hover:to-blue-400 cursor-pointer transition-all active:scale-95"
                  >
                    Add
                  </button>
                </form>

                {/* Expense History List */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Recorded Expenses</div>
                  {expenses.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between text-xs p-2 rounded bg-slate-950/60 border border-slate-800/80 font-mono">
                      <span className="text-slate-300">{exp.description}</span>
                      <span className="text-emerald-400 font-bold tabular-nums">AED {exp.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedVehicleForDetail(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-white hover:bg-slate-700 font-semibold cursor-pointer transition-colors"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
