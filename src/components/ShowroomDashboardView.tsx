import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Car,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  BarChart3,
  Calendar,
  Sparkles,
  Layers,
  ArrowUpRight,
  Eye,
  Plus,
} from 'lucide-react';
import { Vehicle, DealProgression } from '../utils/dealerData.ts';

interface ShowroomDashboardViewProps {
  vehicles: Vehicle[];
  progressions: DealProgression[];
  onNavigateTab: (tab: string) => void;
  onOpenAddVehicle: () => void;
  onSelectVehicle: (v: Vehicle) => void;
}

export const ShowroomDashboardView: React.FC<ShowroomDashboardViewProps> = ({
  vehicles,
  progressions,
  onNavigateTab,
  onOpenAddVehicle,
  onSelectVehicle,
}) => {
  const [selectedPeriod] = useState('October 2026');

  // Compute live KPI values from inventory
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.status === 'AVAILABLE').length;
  const bookedVehicles = vehicles.filter((v) => v.status === 'BOOKED').length;
  const reservedVehicles = vehicles.filter((v) => v.status === 'RESERVED').length;
  const soldVehicles = vehicles.filter((v) => v.status === 'SOLD').length;
  const totalValuation = vehicles.reduce((sum, v) => sum + v.price, 0);

  // Delivery stages from video
  const stages = [
    { label: 'Evaluation', count: 2 },
    { label: 'Passing', count: 1 },
    { label: 'Dubai Passing', count: 0 },
    { label: 'Registration Passing', count: 0 },
    { label: 'Insurance', count: 6, active: true },
    { label: 'Registration', count: 1 },
    { label: 'Delivery Video', count: 1 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Period Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <span className="text-cyan-400 font-semibold">DEXGO OS</span>
            <span>/</span>
            <span>SHOWROOM OPERATIONS</span>
            <span>/</span>
            <span className="text-slate-200">COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your dealership at a glance — inventory, sales, finance, and vehicle operations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{selectedPeriod}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAddVehicle}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Add Vehicle</span>
          </motion.button>
        </div>
      </div>

      {/* TOP INVENTORY COMMAND STRIP WITH STAGGER & HOVER ANIMATION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.18 } }}
          className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-lg shadow-black/20"
        >
          <div className="text-[11px] font-medium text-slate-400">Total Vehicles</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white mt-1.5">
            {totalVehicles}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Complete inventory</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.18 } }}
          className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-emerald-500/40 transition-colors shadow-lg shadow-black/20"
        >
          <div className="text-[11px] font-medium text-emerald-400 flex items-center justify-between">
            <span>Available</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-300 mt-1.5">
            {availableVehicles}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Ready for sale</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.18 } }}
          className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-amber-500/40 transition-colors shadow-lg shadow-black/20"
        >
          <div className="text-[11px] font-medium text-amber-400">Reserved</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-300 mt-1.5">
            {reservedVehicles}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Deposit received</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.18 } }}
          className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-blue-500/40 transition-colors shadow-lg shadow-black/20"
        >
          <div className="text-[11px] font-medium text-blue-400">Booked</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-blue-300 mt-1.5">
            {bookedVehicles}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Finance pending</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.18 } }}
          className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-purple-500/40 transition-colors shadow-lg shadow-black/20"
        >
          <div className="text-[11px] font-medium text-purple-400">Sold (Mth)</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-purple-300 mt-1.5">
            {soldVehicles}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Completed deliveries</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.18 } }}
          className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30 shadow-lg shadow-cyan-950/30"
        >
          <div className="text-[11px] font-medium text-cyan-400">Inventory Value</div>
          <div className="text-lg font-bold font-mono tabular-nums text-white mt-1.5 truncate">
            AED {(totalValuation / 1000000).toFixed(2)}M
          </div>
          <div className="text-[10px] text-cyan-300/70 mt-1">Live showroom stock</div>
        </motion.div>
      </motion.div>

      {/* OPERATIONS / VEHICLE PROGRESSION PIPELINE */}
      <div className="p-5 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                OPERATIONS WORKFLOW
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                8 Active
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">Vehicle Progression</h2>
            <p className="text-xs text-slate-400">
              Live view of vehicles moving through the delivery & registration pipeline.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('progression')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto group"
          >
            <span>View Full Progression Workflow</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Pipeline Stepper Horizontal Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          {stages.map((st, idx) => (
            <motion.div
              key={st.label}
              whileHover={{ scale: 1.03 }}
              onClick={() => onNavigateTab('progression')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                st.active
                  ? 'bg-cyan-950/40 border-cyan-400/50 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] text-slate-400 truncate" title={st.label}>
                {idx + 1}. {st.label}
              </div>
              <div
                className={`text-lg font-bold font-mono mt-1 ${
                  st.active ? 'text-cyan-300' : st.count > 0 ? 'text-white' : 'text-slate-500'
                }`}
              >
                {st.count}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Vehicles Cards in Delivery Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {progressions.slice(0, 4).map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              onClick={() => onNavigateTab('progression')}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group shadow-sm hover:shadow-cyan-950/40"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-semibold">{p.stockId}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  {p.currentStage}
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors truncate">
                {p.vehicle}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 truncate">
                Client: {p.customer}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-3 pt-2 border-t border-slate-800/80">
                <span>{p.bank}</span>
                <span className="text-emerald-400 tabular-nums">
                  {p.sellingPrice.toLocaleString()} AED
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SHOWROOM LATEST AVAILABLE VEHICLES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Latest Available Vehicles</h2>
            <p className="text-xs text-slate-400">
              The newest verified stock ready for immediate showroom delivery.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer group"
          >
            <span>View Full Inventory ({vehicles.length})</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.slice(0, 4).map((car) => (
            <motion.div
              key={car.id}
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
              className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
            >
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-cyan-400 uppercase font-semibold">
                    {car.year} {car.make}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {car.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {car.model}
                </h3>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  {car.mileageKm.toLocaleString()} KM · {car.spec} Spec
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500">Asking Price</div>
                  <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                    AED {car.price.toLocaleString()}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectVehicle(car)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span>Inspect</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MONTHLY BUSINESS PERFORMANCE & FINANCIAL OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Business Performance Animated Bars */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Business Performance</h3>
              <p className="text-xs text-slate-400">Current commercial activity for October 2026</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              AED 1,999,501 Total Volume
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3 pt-4">
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold font-mono text-cyan-400">AED 216K</div>
              <div className="w-full bg-slate-900 rounded-lg h-36 relative mt-2 overflow-hidden flex items-end p-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '40%' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                  className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-md"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-2 font-medium">Sales</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs font-bold font-mono text-blue-400">AED 478K</div>
              <div className="w-full bg-slate-900 rounded-lg h-36 relative mt-2 overflow-hidden flex items-end p-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '65%' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-md"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-2 font-medium">Open Deals</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs font-bold font-mono text-emerald-400">AED 506K</div>
              <div className="w-full bg-slate-900 rounded-lg h-36 relative mt-2 overflow-hidden flex items-end p-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '80%' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-md"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-2 font-medium">Receipts</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs font-bold font-mono text-purple-400">AED 60K</div>
              <div className="w-full bg-slate-900 rounded-lg h-36 relative mt-2 overflow-hidden flex items-end p-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '25%' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-md"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-2 font-medium">Monthly EMI</span>
            </div>
          </div>
        </div>

        {/* Financial Overview Gauge with Pulse Glow */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B101D] border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Financial Activity Overview</h3>
            <p className="text-xs text-slate-400">Overall dealer financial activity from available records</p>
          </div>

          <div className="py-6 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-44 h-44 rounded-full border-8 border-slate-800 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(0,229,255,0.1)]"
            >
              <div className="absolute inset-0 rounded-full border-8 border-cyan-400 border-t-transparent border-l-transparent -rotate-45" />
              <div className="text-xl font-extrabold font-mono text-white tabular-nums">
                AED 728,736
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-semibold">
                Financial Activity
              </div>
            </motion.div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Vehicle Sales</span>
              </span>
              <span className="font-mono text-white tabular-nums">AED 216,488 (30%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Customer Receipts</span>
              </span>
              <span className="font-mono text-white tabular-nums">AED 506,250 (69%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>EMI Collections</span>
              </span>
              <span className="font-mono text-white tabular-nums">AED 5,999 (1%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
